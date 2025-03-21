const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { Readable } = require("stream");
const s3Client = require("../utils/awsConfig");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");
const os = require("os");

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "texora";
const VIDEO_FOLDER = "interview-videos";
const AUDIO_FOLDER = "mp3Audio";
const allowedAudioMimeTypes = ["audio/mpeg", "audio/mp3"];

// Helper function to validate the key
const isValidKey = (key) => /^[a-zA-Z0-9._/-]+$/.test(key);

// Helper function to normalize key
const normalizeKey = (key, folder) => {
  return key.startsWith(folder) ? key : `${folder}/${key}`;
};

// Helper function to ensure temp directory exists
const ensureTempDir = () => {
  const tempDir = path.join(os.tmpdir(), "texora-conversions");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return tempDir;
};

// Convert video to MP3
exports.convertVideoToMp3 = async (req, res) => {
  const { videoKey } = req.body;

  if (!videoKey) {
    return res.status(400).json({ message: "Video key is required." });
  }

  const normalizedVideoKey = normalizeKey(
    videoKey.endsWith(".mp4") ? videoKey : `${videoKey}.mp4`,
    VIDEO_FOLDER
  );

  if (!isValidKey(normalizedVideoKey)) {
    return res.status(400).json({ message: "Invalid video key format." });
  }

  try {
    const tempDir = ensureTempDir();
    const tempVideoPath = path.join(tempDir, `${uuidv4()}.mp4`);
    const tempAudioPath = path.join(tempDir, `${uuidv4()}.mp3`);

    // Download video from S3
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: normalizedVideoKey,
    });

    const { Body } = await s3Client.send(getCommand);
    const videoWriteStream = fs.createWriteStream(tempVideoPath);

    // Using pipeline to properly handle the stream
    await new Promise((resolve, reject) => {
      if (Body instanceof Readable) {
        Body.pipe(videoWriteStream).on("finish", resolve).on("error", reject);
      } else {
        // If Body is not already a stream (e.g., if it's a buffer)
        Readable.from(Body)
          .pipe(videoWriteStream)
          .on("finish", resolve)
          .on("error", reject);
      }
    });

    // Convert video to MP3
    await new Promise((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .output(tempAudioPath)
        .audioCodec("libmp3lame")
        .audioBitrate(128)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    // Generate the MP3 filename based on the original video name
    const videoName = normalizedVideoKey.split("/").pop().replace(".mp4", "");
    const mp3Key = `${AUDIO_FOLDER}/${videoName}.mp3`;

    // Upload MP3 to S3
    const fileBuffer = fs.readFileSync(tempAudioPath);
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: mp3Key,
      Body: fileBuffer,
      ContentType: "audio/mpeg",
    });

    await s3Client.send(putCommand);

    // Clean up temporary files
    fs.unlinkSync(tempVideoPath);
    fs.unlinkSync(tempAudioPath);

    res.status(200).json({
      message: "Video converted to MP3 successfully.",
      audioKey: mp3Key,
    });
  } catch (error) {
    console.error("Conversion Error:", error);
    res.status(500).json({
      message: "Failed to convert video to MP3.",
      error: error.message,
    });
  }
};

// List all MP3 files in S3
exports.listAudioFiles = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${AUDIO_FOLDER}/`,
    });

    const data = await s3Client.send(command);

    // Check if Contents exists before mapping
    const audioFiles = data.Contents
      ? data.Contents.map((item) => ({
          key: item.Key,
          name: item.Key.replace(`${AUDIO_FOLDER}/`, ""),
          lastModified: item.LastModified,
          size: item.Size,
        }))
      : [];

    res.status(200).json(audioFiles);
  } catch (error) {
    console.error("S3 List Audio Error:", error);
    res.status(500).json({ message: "Failed to fetch audio file list." });
  }
};

// Download MP3 audio
exports.downloadAudio = async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ message: "Audio key is required." });
  }

  const normalizedKey = normalizeKey(
    key.endsWith(".mp3") ? key : `${key}.mp3`,
    AUDIO_FOLDER
  );

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid audio key format." });
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
  });

  try {
    const { Body, ContentType } = await s3Client.send(command);

    res.setHeader("Content-Type", ContentType || "audio/mpeg");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${normalizedKey.split("/").pop()}"`
    );

    // AWS SDK v3 returns a readable stream
    if (Body instanceof Readable) {
      Body.pipe(res);
    } else {
      // If Body is not already a stream (e.g., if it's a buffer)
      Readable.from(Body).pipe(res);
    }
  } catch (error) {
    console.error("S3 Download Audio Error:", error);
    if (error.name === "NoSuchKey") {
      return res
        .status(404)
        .json({ message: "Audio file not found in storage." });
    }
    res
      .status(500)
      .json({ message: "Failed to download audio. Please try again later." });
  }
};

// Delete MP3 audio
exports.deleteAudio = async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ message: "Audio key is required." });
  }

  const normalizedKey = normalizeKey(
    key.endsWith(".mp3") ? key : `${key}.mp3`,
    AUDIO_FOLDER
  );

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid audio key format." });
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
  });

  try {
    await s3Client.send(command);
    res.status(200).json({ message: "Audio file deleted successfully." });
  } catch (error) {
    console.error("S3 Delete Audio Error:", error);
    if (error.name === "NoSuchKey") {
      return res
        .status(404)
        .json({ message: "Audio file not found in storage." });
    }
    res
      .status(500)
      .json({
        message: "Failed to delete audio file. Please try again later.",
      });
  }
};

// Transcribe audio - This is a placeholder for the transcription functionality
exports.transcribeAudio = async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ message: "Audio key is required." });
  }

  const normalizedKey = normalizeKey(
    key.endsWith(".mp3") ? key : `${key}.mp3`,
    AUDIO_FOLDER
  );

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid audio key format." });
  }

  // This is where you would implement the transcription logic
  // For now, we'll just return a placeholder response
  try {
    // Placeholder for transcription logic
    // In a real implementation, you would:
    // 1. Download the audio file from S3
    // 2. Use a transcription service (e.g., AWS Transcribe)
    // 3. Store the transcription result
    // 4. Return the transcription or a link to it

    res.status(200).json({
      message: "Transcription initiated. This is a placeholder response.",
      audioKey: normalizedKey,
    });
  } catch (error) {
    console.error("Transcription Error:", error);
    res.status(500).json({
      message: "Failed to transcribe audio file.",
      error: error.message,
    });
  }
};
