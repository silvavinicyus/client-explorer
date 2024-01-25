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

  static loadError(): IError {
    return new ClientErrors({
      statusCode: 500,
      body: {
        code: 'CT-002',
        message: 'Server failed to perform the search',
        shortMessage: 'loadError',
      },
    })
  }

  static notFound(): IError {
    return new ClientErrors({
      statusCode: 404,
      body: {
        code: 'CT-003',
        message: 'This client does not exists',
        shortMessage: 'notFound',
      },
    })
  }

  static updateError(): IError {
    return new ClientErrors({
      statusCode: 500,
      body: {
        code: 'CT-001',
        message: 'Server failed to update this client',
        shortMessage: 'updateError',
      },
    })
  }

  static deleteError(): IError {
    return new ClientErrors({
      statusCode: 500,
      body: {
        code: 'CT-001',
        message: 'Server failed to delete this client',
        shortMessage: 'deleteError',
      },
    })
  }
}