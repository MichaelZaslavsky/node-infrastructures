import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";
import winstonLogger from "../utils/winstonLogger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  winstonLogger.error(`Error: ${err.message}\n${err.stack}`);

  const status = err instanceof HttpError ? err.statusCode : 500;
  const message =
    err.message || "Internal server error. Please retry again later.";

  res.status(status).json({ error: message });
}
