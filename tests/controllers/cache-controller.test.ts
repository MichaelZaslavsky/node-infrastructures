import app from "../../src/app";
import Redis from "ioredis-mock";
import { authenticatedAgent } from "../infrastructures/basic-authentication";

const redisClient = new Redis(process.env.REDIS_HOST || "localhost");
const mockRedisClient = redisClient;

beforeAll(() => {
  app.locals.redisClient = mockRedisClient;
});

afterEach(() => {
  mockRedisClient.flushdb();
});

describe("Cache Controller", () => {
  test("Create a key-value pair in cache", async () => {
    const key = "testKey";
    const value = "testValue";

    const response = await authenticatedAgent()
      .post("/cache")
      .send({ key, value });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Key-value pair added to cache" });
  });

  test("get value by key", async () => {
    await mockRedisClient.set("test-key", "test-value");
    const response = await authenticatedAgent().get("/cache/test-key");
    expect(response.status).toBe(200);
    expect(response.body.value).toBe("test-value");
  });
});
