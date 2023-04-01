import { sendEmail } from "../../src/services/emailService";
import { authenticatedAgent } from "../infrastructures/basicAuthentication";

jest.mock("../../src/services/emailService", () => ({
  sendEmail: jest.fn(),
}));

describe("ContactController", () => {
  it("should send an email and return a success message", async () => {
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    const response = await authenticatedAgent().post("/contact").send({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Message sent successfully" });
    expect(sendEmail).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "Hello there!"
    );
  });

  it("should return a 500 error if the email service fails", async () => {
    (sendEmail as jest.Mock).mockRejectedValue(
      new Error("Email service error")
    );

    const response = await authenticatedAgent().post("/contact").send({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Email service error" });
    expect(sendEmail).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "Hello there!"
    );
  });
});
