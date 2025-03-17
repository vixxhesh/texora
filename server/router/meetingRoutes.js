const express = require("express");
const { createMeeting } = require("../controllers/meetingController");

const router = express.Router();

// Route for scheduling a meeting
router.post("/create-meeting", createMeeting);

module.exports = router;
