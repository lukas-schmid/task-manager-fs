export interface SocketError {
  message: string;
  userId: string;
  cause?: Error | string;
}
