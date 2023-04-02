import { Request, Response } from "express";
import { sendEmail } from "../services/email-service";
import { IEmail } from "../interfaces/email.interface";

export async function submitContactForm(req: Request, res: Response) {
  const { name, email, subject, message } = req.body;
  const model: IEmail = {
    name,
    from: email,
    to: "MichaelZaslavsky2@gmail.com",
    subject,
    message,
  };

  await sendEmail(model);
  res.status(200).json({ message: "Message sent successfully" });
}
