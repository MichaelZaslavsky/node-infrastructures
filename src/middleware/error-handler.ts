import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import winstonLogger from "../utils/winston-logger";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  _next: NextFunction
) => {
  winstonLogger.error(`Error: ${err.message}\n${err.stack}`);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(500).send({
    errors: [{ message: "Internal server error. Please retry again later." }],
  });
};
