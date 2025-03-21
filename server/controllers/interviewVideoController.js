const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Readable } = require("stream");
const s3Client = require("../utils/awsConfig"); // Make sure this points to your v3 S3Client

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "texora";
const FOLDER_NAME = "interview-videos";
const allowedMimeTypes = ["video/mp4"];

// Helper function to validate the key
const isValidKey = (key) => /^[a-zA-Z0-9._/-]+$/.test(key);

// Upload video to S3
exports.uploadVideo = async (req, res) => {
  const { name } = req.body;

  if (!req.file || !name) {
    return res
      .status(400)
      .json({ message: "Video file and name are required." });
  }

  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res
      .status(400)
      .json({ message: "Invalid file type. Only MP4 is allowed." });
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `${FOLDER_NAME}/${name}.mp4`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });

  try {
    console.log("Attempting to upload video to S3:", {
      Bucket: BUCKET_NAME,
      Key: `${FOLDER_NAME}/${name}.mp4`,
      ContentType: req.file.mimetype,
      FileSize: req.file.size,
    });

    const result = await s3Client.send(command);
    console.log("Video upload successful:", result);

    res.status(200).json({
      message: "Video uploaded successfully.",
      key: `${FOLDER_NAME}/${name}.mp4`,
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({
      message: "Failed to upload video.",
      error: error.message,
    });
  }
};

// List all videos in S3
exports.listVideos = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${FOLDER_NAME}/`,
    });

    const data = await s3Client.send(command);

    // Check if Contents exists before mapping
    const videos = data.Contents
      ? data.Contents.map((item) => ({
          key: item.Key,
          name: item.Key.replace(`${FOLDER_NAME}/`, ""),
          lastModified: item.LastModified,
          size: item.Size,
        }))
      : [];

    res.status(200).json(videos);
  } catch (error) {
    console.error("S3 List Error:", error);
    res.status(500).json({ message: "Failed to fetch video list." });
  }
};

// Normalize key helper function
const normalizeKey = (key) => {
  return key.startsWith(FOLDER_NAME) ? key : `${FOLDER_NAME}/${key}`;
};

// Download video
exports.downloadVideo = async (req, res) => {
  const { key } = req.query; // Changed from req.params to req.query based on your route

  if (!key) {
    return res.status(400).json({ message: "Video key is required." });
  }

  const normalizedKey = normalizeKey(key.endsWith(".mp4") ? key : `${key}.mp4`);

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid video key format." });
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
  });

  try {
    const { Body, ContentType } = await s3Client.send(command);

    res.setHeader("Content-Type", ContentType || "video/mp4");
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
    console.error("S3 Download Error:", error);
    if (error.name === "NoSuchKey") {
      return res.status(404).json({ message: "Video not found in storage." });
    }
    res
      .status(500)
      .json({ message: "Failed to download video. Please try again later." });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  const { key } = req.query; // Changed from req.params to req.query based on your route

  if (!key) {
    return res.status(400).json({ message: "Video key is required." });
  }

  const normalizedKey = normalizeKey(key.endsWith(".mp4") ? key : `${key}.mp4`);

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid video key format." });
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: normalizedKey,
  });

  try {
    await s3Client.send(command);
    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    console.error("S3 Delete Error:", error);
    if (error.name === "NoSuchKey") {
      return res.status(404).json({ message: "Video not found in storage." });
    }
    res
      .status(500)
      .json({ message: "Failed to delete video. Please try again later." });
  }
};

exports.convertToMp3 = async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ message: "Video key is required." });
  }

  try {
    // Make an internal call to the audio controller's convertVideoToMp3 function
    const audioController = require("./audioController");
    req.body.videoKey = key;
    await audioController.convertVideoToMp3(req, res);
  } catch (error) {
    console.error("MP3 Conversion Error:", error);
    res.status(500).json({
      message: "Failed to convert video to MP3.",
      error: error.message,
    });
  }
};
