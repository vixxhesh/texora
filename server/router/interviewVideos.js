const express = require("express");
const multer = require("multer");
const {
  uploadVideo,
  listVideos,
  downloadVideo,
  deleteVideo,
} = require("../controllers/interviewVideoController");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 1800 }, // Limit to ~30 minutes (1.8GB approx for MP4)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "video/mp4") {
      return cb(new Error("Only MP4 files are allowed"), false);
    }
    cb(null, true);
  },
});

// Routes
router.post("/upload", upload.single("video"), uploadVideo);
router.get("/", listVideos);
router.get("/download", downloadVideo);
router.delete("/delete", deleteVideo);

module.exports = router;
