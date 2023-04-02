import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";
import { IEmail } from "../interfaces/email.interface";

export async function submitContactForm(req: Request, res: Response) {
  try {
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
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";

    res.status(500).json({ error: errorMessage });
  }
}
