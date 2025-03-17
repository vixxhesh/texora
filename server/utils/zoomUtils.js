const axios = require("axios");

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_API_BASE_URL = "https://api.zoom.us/v2";

// Function to get Zoom access token
const getZoomAccessToken = async () => {
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;
  const authString = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(tokenUrl, {}, {
      headers: {
        "Authorization": `Basic ${authString}`, 
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Zoom access token:", error.response?.data || error.message);
    throw new Error("Failed to get Zoom access token.");
  }
};

// Function to schedule a Zoom meeting
const scheduleZoomMeeting = async (accessToken, meetingData) => {
  try {
    const response = await axios.post(
      `${ZOOM_API_BASE_URL}/users/me/meetings`,
      {
        topic: meetingData.topic,
        agenda: meetingData.agenda,
        start_time: meetingData.start_time,
        duration: meetingData.duration,
        timezone: meetingData.timezone,
        password: meetingData.password,
        settings: {
          waiting_room: meetingData.waiting_room,
          join_before_host: meetingData.join_before_host,
          audio: meetingData.audio,
          auto_recording: meetingData.auto_recording,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error scheduling Zoom meeting:", error.response?.data || error.message);
    throw new Error("Failed to schedule Zoom meeting.");
  }
};

module.exports = { getZoomAccessToken, scheduleZoomMeeting };
