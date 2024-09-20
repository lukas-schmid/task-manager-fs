import { ErrorCodes } from "./errorCodes.enum";

export interface AuthError {
  message: string;
  code: ErrorCodes;
  errors: string[];
}

export interface AuthSuccess {
  email: string;
  username: string;
  id: string;
  token: string;
}
