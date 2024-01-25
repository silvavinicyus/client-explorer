import { IError } from "@shared/IError";

export class ClientErrors extends IError {
  static creationError(): IError {
    return new ClientErrors({
      statusCode: 500,
      body: {
        code: 'CT-001',
        message: 'Server failed to create an client',
        shortMessage: 'creationError',
      },
    })
  }
}