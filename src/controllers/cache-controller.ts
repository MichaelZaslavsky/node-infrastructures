import { Request, Response } from "express";
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_HOST || "localhost");

export const addKeyValue = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { key, value } = req.body;
  await redisClient.set(key, value);
  res.status(201).json({ message: "Key-value pair added to cache" });
};

export const getValue = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.params;

  const redisClient: Redis = req.app.locals.redisClient;
  const value = await redisClient.get(key);
  res.status(200).json({ value });
};
