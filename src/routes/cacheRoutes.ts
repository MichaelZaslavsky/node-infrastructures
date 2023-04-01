import { Router } from "express";
import { check } from "express-validator";
import * as cache from "../controllers/cacheController";
import { validationMiddleware } from "../middleware/validationMiddleware";

const router: Router = Router();

router.post(
  "/cache",
  validationMiddleware([
    check("key").isString().trim().notEmpty().withMessage("Key is required"),
    check("value")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Value is required"),
  ]),
  cache.addKeyValue
);

router.get(
  "/cache/:key",
  validationMiddleware([
    check("key").isString().trim().notEmpty().withMessage("Key is required"),
  ]),
  cache.getValue
);

export default router;
