import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/badRequestError";

export function validationMiddleware(validators: any[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validator of validators) {
      await validator.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new BadRequestError(
          errors
            .array()
            .map((error) => error.msg)
            .join(", ")
        )
      );
    }

    next();
  };
}
