const nodemailer = require("nodemailer");


const dotenv = require("dotenv");


  dotenv.config();


const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,        // STARTTLS
      secure: false,    // must be false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // App Password
      },
    });

    // Optional but helpful (debug)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Nodemailer error:", error.message);
    return null;
  }
};

module.exports = mailSender;
