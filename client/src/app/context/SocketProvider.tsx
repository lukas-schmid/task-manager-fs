"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SocketEventsEnum } from "../types/socketEvents.enum";

interface SocketContextType {
  socket: Socket | null;
  joinBoard: (boardId: string) => void;
  leaveBoard: (boardId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  token: string | undefined;
  boardId: string | undefined;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  token,
  boardId,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket && boardId) {
      joinBoard(boardId);
      return () => {
        leaveBoard(boardId);
      };
    }
  }, [socket, boardId]);

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:4001", {
        auth: { token },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  const joinBoard = (boardId: string) => {
    if (socket) {
      socket.emit(SocketEventsEnum.boardsJoin, { boardId });
    }
  };

  const leaveBoard = (boardId: string) => {
    if (socket) {
      socket.emit(SocketEventsEnum.boardsLeave, { boardId });
    }
  };

  const value = useMemo(
    () => ({
      socket,
      joinBoard,
      leaveBoard,
    }),
    [socket, joinBoard, leaveBoard],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
