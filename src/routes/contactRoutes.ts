import { Router } from "express";
import { check } from "express-validator";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { submitContactForm } from "../controllers/contactController";

const router = Router();

router.post(
  "/contact",
  validationMiddleware([
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("message").notEmpty().withMessage("Message is required"),
  ]),
  submitContactForm
);

export default router;
