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
      subject: "Help me please",
      message: "Hello there!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Message sent successfully" });
    expect(sendEmail).toHaveBeenCalledWith({
      from: "john@example.com",
      message: "Hello there!",
      name: "John Doe",
      subject: "Help me please",
      to: "MichaelZaslavsky2@gmail.com",
    });
  });

  it("should return a 500 error if the email service fails", async () => {
    (sendEmail as jest.Mock).mockRejectedValue(
      new Error("Email service error")
    );

    const response = await authenticatedAgent().post("/contact").send({
      name: "John Doe",
      email: "john@example.com",
      subject: "Help me please",
      message: "Hello there!",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      errors: [{ message: "Internal server error. Please retry again later." }],
    });
    expect(sendEmail).toHaveBeenCalledWith({
      from: "john@example.com",
      message: "Hello there!",
      name: "John Doe",
      subject: "Help me please",
      to: "MichaelZaslavsky2@gmail.com",
    });
  });
});
