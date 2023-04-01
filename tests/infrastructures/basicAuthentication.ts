import * as dotenv from "dotenv";
dotenv.config();

import supertest, { SuperTest, Test } from "supertest";
import app from "../../src/app";

const authenticatedAgent = (): SuperTest<Test> => {
  const agent = supertest.agent(app);
  const auth = Buffer.from(
    process.env.AUTH_USER + ":" + process.env.AUTH_PASSWORD
  ).toString("base64");
  agent.set("Authorization", `Basic ${auth}`);
  return agent;
};

export { authenticatedAgent };
