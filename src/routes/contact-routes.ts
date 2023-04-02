import { Router } from "express";
import { check } from "express-validator";
import { validationMiddleware } from "../middleware/validation-middleware";
import { submitContactForm } from "../controllers/contact-controller";

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
