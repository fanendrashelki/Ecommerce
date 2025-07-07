import nodemailer from "nodemailer";
import MailTemp from "./MailTemp/MailTemp.js";

const sendMail = async ({ email, name, type, otp, otpExpireTime, ...rest }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email type configuration
    const emailTemplates = {
      verifyEmail: {
        subject: "Your OTP Code",
      },
      welcome: {
        subject: "Welcome to Our Ecommerce App!",
      },
      forgetpassword: {
        subject: "Reset Your Password",
      },
      passwordResetSuccess: {
        subject: "Your Password Has Been Reset",
      },
      accountBlocked: {
        subject: "Your Account Has Been Blocked",
      },

      // Add more cases here
    };

    const template = emailTemplates[type];
    if (!template) throw new Error(`Invalid email type: ${type}`);

    const subject = template.subject;
    const html = MailTemp({ name, otp, otpExpireTime, type, ...rest });

    await transporter.sendMail({
      from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    // console.log(`📧 Email sent to ${email} - Type: ${type}`);
  } catch (error) {
    console.error(
      `❌ Failed to send ${type} email to ${email}:`,
      error.message
    );
    throw error;
  }
};

export default sendMail;
