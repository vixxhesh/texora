const express = require("express");
const multer = require("multer");
const {
  uploadVideo,
  listVideos,
  downloadVideo,
  deleteVideo,
} = require("../controllers/interviewVideoController");
const router = express.Router();

// Configure multer for video uploads
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

// Routes with better error handling for multer
router.post(
  "/upload",
  (req, res, next) => {
    upload.single("video")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(413)
            .json({ message: "File too large. Maximum size is 1.8GB." });
        }
        return res
          .status(400)
          .json({ message: err.message || "Error processing video file." });
      }
      next();
    });
  },
  uploadVideo
);

router.get("/", listVideos);
router.get("/download", downloadVideo); // Using query parameters
router.delete("/delete", deleteVideo); // Using query parameters

module.exports = router;
