import { authenticatedAgent } from "../infrastructures/basicAuthentication";

describe("ContactRoutes", () => {
  it("should return a 400 error if the request body is missing", async () => {
    const response = await authenticatedAgent().post("/contact").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        { field: "name", message: "Name is required" },
        { field: "email", message: "Valid email is required" },
        { field: "message", message: "Message is required" },
      ],
    });
  });

  it("should return a 400 error if the request body is incomplete", async () => {
    const response = await authenticatedAgent().post("/contact").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [{ field: "message", message: "Message is required" }],
    });
  });

  it("should return a 400 error if the email is not valid", async () => {
    const response = await authenticatedAgent().post("/contact").send({
      name: "John Doe",
      email: "johnexample.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [{ field: "email", message: "Valid email is required" }],
    });
  });
});
