const {
  scheduleZoomMeeting,
  getZoomAccessToken,
} = require("../utils/zoomUtils");
const { sendEmailInvite } = require("../utils/emailUtils");

const createMeeting = async(req,res) => {
  const meetingData = req.body;
  if(!Array.isArray(meetingData.emails) || meetingData.emails.length === 0){
    return res.status(400).json({
      message: "Emails field is required and should be an array of email addresses.",
    });
  }

  try {
    const accessToken = await getZoomAccessToken();
    const meetingResponse = await scheduleZoomMeeting(accessToken, meetingData)
    const emailPromises = meetingData.emails.map((email) => 
      sendEmailInvite(email, meetingResponse.join_url, meetingData)
    )
    await Promise.all(emailPromises);

    res.status(200).json({
      message: "Meeting scheduled and invites sent successfully.",
      meetingLink: meetingResponse.join_url,
    })
  } catch (error) {
    console.error("Error creating meeting:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMeeting };
