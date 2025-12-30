const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,              // 587 is correct for Gmail STARTTLS
      secure: false,          // MUST be false for port 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail App Password
      },
      connectionTimeout: 10000,
      tls: { rejectUnauthorized: false },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion OTP" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      html: `<h2>Your OTP Code is: <b>${otp}</b></h2><p>This code is valid for 5 minutes.</p>`,
    });

    console.log("OTP email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Error sending OTP mail:", err.message);
    return false;
  }
};

module.exports = sendVerificationEmail;
