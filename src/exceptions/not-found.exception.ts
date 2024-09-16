import { BaseException } from "./base.exception";

export class NotFoundException extends BaseException {
  constructor(message = `Validation error occured.`) {
    super(message, 400);
  }
}
