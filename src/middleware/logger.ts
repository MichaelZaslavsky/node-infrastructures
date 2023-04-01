import { Request, Response, NextFunction } from "express";
import winstonLogger from "../utils/winstonLogger";

export function logger(req: Request, res: Response, next: NextFunction) {
  winstonLogger.info(`${req.method} ${req.originalUrl}`);
  next();
}
