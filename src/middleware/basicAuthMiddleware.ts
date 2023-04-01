import { NextFunction, Request, Response } from "express";

export const basicAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    const username = auth[0];
    const password = auth[1];

    if (
      username === process.env.AUTH_USER &&
      password === process.env.AUTH_PASSWORD
    ) {
      return next();
    }
  }

  res.setHeader("WWW-Authenticate", "Basic");
  res.status(401).json({ error: "Unauthorized" });
};
