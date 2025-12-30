const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_PORT == 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000, // stops after 10s
      tls: { rejectUnauthorized: false },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion OTP" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Verification OTP",
      text: `Your OTP is: ${otp}`,
    });

    console.log("OTP email sent:", info.messageId);
    return true;
  } catch (err) {
    console.log("Error sending OTP mail:", err.message);
    return false;  // IMPORTANT: must return false on fail
  }
};
