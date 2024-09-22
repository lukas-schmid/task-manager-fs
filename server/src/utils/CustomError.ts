export class CustomError extends Error {
  public code: string;
  public statusCode: number;
  public details: string[];

  constructor(
    message: string,
    code: string,
    statusCode: number,
    details: string[] = [],
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
