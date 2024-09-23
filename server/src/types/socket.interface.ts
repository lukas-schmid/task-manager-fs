import { Socket as SocketIoSocket } from "socket.io";
import { UserDocument } from "./user.interface";

export interface Socket extends SocketIoSocket {
  user?: UserDocument;
}

export interface SocketError {
  message: string;
  userId: string;
  cause?: Error | string;
}
