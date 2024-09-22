import { ErrorCodes } from "@/types/errorCodes.enum";

export interface AuthError {
  message: string;
  code: ErrorCodes;
  details: string[];
}

export interface AuthSuccess {
  email: string;
  username: string;
  id: string;
  token: string;
}
