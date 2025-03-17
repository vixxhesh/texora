const s3 = require("../utils/s3");

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

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${FOLDER_NAME}/${name}.mp4`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    await s3.upload(params).promise();
    res.status(200).json({ message: "Video uploaded successfully." });
  } catch (error) {
    winston.error("S3 Upload Error:", { error, params });
    res.status(500).json({ message: "Failed to upload video." });
  }
};

// List all videos in S3
exports.listVideos = async (req, res) => {
  try {
    const params = { Bucket: BUCKET_NAME, Prefix: `${FOLDER_NAME}/` };
    const data = await s3.listObjectsV2(params).promise();

    const videos = data.Contents.map((item) => ({
      key: item.Key,
      name: item.Key.replace(`${FOLDER_NAME}/`, ""),
      lastModified: item.LastModified,
      size: item.Size,
    }));

    res.status(200).json(videos);
  } catch (error) {
    winston.error("S3 List Error:", { error });
    res.status(500).json({ message: "Failed to fetch video list." });
  }
};

// Stream video for download

const normalizeKey = (key) => {
  key.startsWith(FOLDER_NAME) ? key : `${FOLDER_NAME}/${key}`;
};

// Utility to validate video key
// const isValidKey = (key) => {
//   const regex = /^[a-zA-Z0-9_\-\/]+\.mp4$/; // Allow alphanumeric, hyphen, underscore, and folder structure with `.mp4`
//   return regex.test(key);
// };

// Download video
exports.downloadVideo = async (req, res) => {
  const { key } = req.params;
  const normalizedKey = normalizeKey(key.endsWith(".mp4") ? key : `${key}.mp4`);

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid video key format." });
  }

  const params = { Bucket: BUCKET_NAME, Key: normalizedKey };

  try {
    const stream = s3.getObject(params).createReadStream();
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${key.replace(FOLDER_NAME + "/", "")}"`
    );
    stream.pipe(res);
  } catch (error) {
    winston.error("S3 Download Error:", { error, key: normalizedKey });
    if (error.code === "NoSuchKey") {
      return res.status(404).json({ message: "Video not found in storage." });
    }
    res
      .status(500)
      .json({ message: "Failed to download video. Please try again later." });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  const { key } = req.params;
  const normalizedKey = normalizeKey(key.endsWith(".mp4") ? key : `${key}.mp4`);

  if (!isValidKey(normalizedKey)) {
    return res.status(400).json({ message: "Invalid video key format." });
  }

  const params = { Bucket: BUCKET_NAME, Key: normalizedKey };

  try {
    await s3.deleteObject(params).promise();
    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    winston.error("S3 Delete Error:", { error, key: normalizedKey });
    if (error.code === "NoSuchKey") {
      return res.status(404).json({ message: "Video not found in storage." });
    }
    res
      .status(500)
      .json({ message: "Failed to delete video. Please try again later." });
  }
};
