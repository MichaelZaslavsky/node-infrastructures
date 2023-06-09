import { Request, Response, NextFunction } from "express";
import winstonLogger from "../utils/winston-logger";

export function logger(req: Request, _: Response, next: NextFunction) {
  winstonLogger.info(`${req.method} ${req.originalUrl}`);
  next();
}
