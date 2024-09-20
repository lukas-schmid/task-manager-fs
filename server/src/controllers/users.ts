import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { ErrorCodes } from "../types/errorCodes.enum";

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secret);
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token: `Bearer ${token}`,
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
      return res.status(409).json({
        message: "User registration failed",
        code: ErrorCodes.userAlreadyExists,
        errors: ["Email already in use"],
      });
    }

    const newUser = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(422).json({
        message: "Validation failed",
        code: ErrorCodes.validationError,
        errors: messages,
      });
    }
    next(err);
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

    const invalidCredentialsErrorResponse = {
      message: "Login failed",
      code: ErrorCodes.incorrectCredentials,
      errors: ["Incorrect email or password"],
    };

    if (!user) {
      return res.status(422).json(invalidCredentialsErrorResponse);
    }

    const isSamePassword = await user.validatePassword(req.body.password);

    if (!isSamePassword) {
      res.status(422).json(invalidCredentialsErrorResponse);
    }

    res.send(normalizeUser(user));
  } catch (err) {
    next(err);
  }
};

export const currentUser = (req: ExpressRequestInterface, res: Response) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(normalizeUser(req.user));
};
