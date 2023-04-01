import { HttpError } from "./httpError";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
