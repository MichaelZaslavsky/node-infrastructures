import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(name: string, email: string, message: string) {
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
    from: email,
    to: "MichaelZaslavsky2@gmail.com",
    subject: `Contact Us - ${name}`,
    text: message,
  };

  await transporter.sendMail(mailOptions);
}
