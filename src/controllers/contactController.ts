import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export async function submitContactForm(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body;

    await sendEmail(name, email, message);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";

    res.status(500).json({ error: errorMessage });
  }
}
