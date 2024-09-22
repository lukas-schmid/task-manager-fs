import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

interface ErrorResponse {
  message: string;
  code: string;
  details?: string[];
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  const errorResponse: ErrorResponse = {
    message: err.message,
    code: err.code,
  };

  if (err.details && err.details.length > 0) {
    errorResponse.details = err.details;
  }

  res.status(statusCode).json(errorResponse);
};
