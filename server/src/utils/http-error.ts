export class HttpError extends Error {
  statusCode: number;
  // Optional field to carry extra error context (e.g. validation details)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
