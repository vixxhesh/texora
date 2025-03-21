const express = require("express");
const {
  convertVideoToMp3,
  listAudioFiles,
  downloadAudio,
  deleteAudio,
  transcribeAudio,
} = require("../controllers/audioController");
const router = express.Router();

// Routes for audio operations
router.post("/convert", convertVideoToMp3);
router.get("/", listAudioFiles);
router.get("/download", downloadAudio);
router.delete("/delete", deleteAudio);
router.post("/transcribe", transcribeAudio);

module.exports = router;
