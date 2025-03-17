const nodemailer = require("nodemailer");

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;

// Function to send email with meeting invite
const sendEmailInvite = async (recipientEmail, meetingLink, meetingDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL,
    to: recipientEmail,
    subject: `Meeting Invite: ${meetingDetails.topic}`,
    html: `
      <h3>Your meeting is scheduled!</h3>
      <p><strong>Topic:</strong> ${meetingDetails.topic}</p>
      <p><strong>Agenda:</strong> ${meetingDetails.agenda}</p>
      <p><strong>Start Time:</strong> ${new Date(meetingDetails.start_time).toLocaleString()}</p>
      <p><strong>Duration:</strong> ${meetingDetails.duration} minutes</p>
      <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
      <p><strong>Meeting Password:</strong> ${meetingDetails.password}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email.");
  }
};

module.exports = { sendEmailInvite };
