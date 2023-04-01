import { Email } from "../models/emailModel";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(email: Email) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email.from,
    to: email.to,
    subject: email.subject,
    text: email.message,
  };

  await transporter.sendMail(mailOptions);
}
