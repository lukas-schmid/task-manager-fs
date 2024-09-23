import { SocketError } from "./types/socket.interface";

export const getErrorMessage = (
  userId: string,
  message: string,
  err: unknown,
): SocketError => {
  const cause = err instanceof Error ? err : String(err);

  return {
    message,
    userId,
    cause,
  };
};
