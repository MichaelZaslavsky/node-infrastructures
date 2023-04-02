import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import "express-async-errors";

export function validationMiddleware(validators: any[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validator of validators) {
      await validator.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    next();
  };
}
