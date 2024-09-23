import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { ErrorCodes } from "../types/errorCodes.enum";
import { CustomError } from "../utils/CustomError";

const normalizeUser = (user: UserDocument, includeToken: boolean = false) => {
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret);
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    ...(includeToken && { token: `Bearer ${token}` }),
  };
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      throw new CustomError(
        "User registration failed",
        ErrorCodes.userAlreadyExists,
        409,
        ["Email is not available"],
      );
    }

    const newUser = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    return res.send(normalizeUser(savedUser, true));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);

      next(
        new CustomError(
          "Validation failed",
          ErrorCodes.validationError,
          422,
          messages,
        ),
      );
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password",
    );

    const invalidCredentialsErrorResponse = new CustomError(
      "Login failed",
      ErrorCodes.incorrectCredentials,
      422,
      ["Incorrect email or password"],
    );

    if (!user) {
      throw invalidCredentialsErrorResponse;
    }

    const isSamePassword = await user.validatePassword(req.body.password);

    if (!isSamePassword) {
      throw invalidCredentialsErrorResponse;
    }

    res.send(normalizeUser(user, true));
  } catch (err) {
    next(err);
  }
};

export const currentUser = (req: ExpressRequestInterface, res: Response) => {
  if (!req.user) {
    throw new CustomError("Unauthorized", ErrorCodes.unauthorized, 401, [
      "User is not authenticated",
    ]);
  }
  res.send(normalizeUser(req.user));
};
