import Redis from "ioredis";
import redisConfig from "../redis-config.json";

const redisClient = new Redis(redisConfig);

export default redisClient;
