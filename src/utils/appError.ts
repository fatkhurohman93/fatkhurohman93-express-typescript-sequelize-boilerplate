enum HTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  VALIDATION_ERROR = 403,
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error?: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, error?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = true;
    if (error) {
      this.error = error;
    }

    Error.captureStackTrace(this);
  }
}

export class ServerError extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.INTERNAL_SERVER_ERROR, error);
  }
}

export class HTTPNotFound extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.NOT_FOUND, error);
  }
}

export class BadRequest extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.BAD_REQUEST, error);
  }
}

export class HTTPUnauthorized extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.UNAUTHORIZED, error);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, error?: any) {
    super(message, HTTPStatusCode.VALIDATION_ERROR, error);
  }
}
