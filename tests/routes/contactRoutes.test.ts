import request from "supertest";
import app from "../../src/app";

describe("ContactRoutes", () => {
  it("should return a 400 error if the request body is missing", async () => {
    const response = await request(app).post("/contact").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Name is required, Valid email is required, Message is required",
    });
  });

  it("should return a 400 error if the request body is incomplete", async () => {
    const response = await request(app).post("/contact").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Message is required",
    });
  });

  it("should return a 400 error if the email is not valid", async () => {
    const response = await request(app).post("/contact").send({
      name: "John Doe",
      email: "johnexample.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Valid email is required",
    });
  });
});
