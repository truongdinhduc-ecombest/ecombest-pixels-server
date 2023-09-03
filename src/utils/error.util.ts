export class HandlerError extends Error {
  statusCode: number;
  error: any;
  constructor(statusCode: number, message: string, error?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
