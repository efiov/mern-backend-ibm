const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "your_smtp_host",
  port: 587, // Change to your SMTP port if different
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: "your_smtp_username",
    pass: "your_smtp_password",
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: "event_Planer@example.com",
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
