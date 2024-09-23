import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import UserModel from "../models/user";
import { ErrorCodes } from "../types/errorCodes.enum";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { CustomError } from "../utils/CustomError";

export default async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError(
        "Unauthorized access",
        ErrorCodes.unauthorized,
        401,
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const data = jwt.verify(token, jwtSecret) as {
        id: string;
        email: string;
      };
      const user = await UserModel.findById(data.id);

      if (!user) {
        throw new CustomError("User not found", ErrorCodes.notFound, 404);
      }

      req.user = user;
      next();
    } catch (err) {
      throw new CustomError(
        "Unauthorized access",
        ErrorCodes.unauthorized,
        401,
      );
    }
  } catch (err) {
    next(err);
  }
};
