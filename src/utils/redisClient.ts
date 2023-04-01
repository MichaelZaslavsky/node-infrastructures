import Redis from "ioredis";
import redisConfig from "../redisConfig.json";

const redisClient = new Redis(redisConfig);

export default redisClient;
