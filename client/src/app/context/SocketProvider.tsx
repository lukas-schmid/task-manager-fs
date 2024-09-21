"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SocketEventsEnum } from "../types/socketEvents.enum";
import { useBoard } from "./BoardProvider";

interface SocketContextType {
  socket: Socket | null;
  joinBoard(boardId: string): void;
  leaveBoard(boardId: string): void;
  updateBoard(title: string): void;
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
  const { updateBoard: updateBoardContext } = useBoard();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (boardId) {
      const newSocket = io("http://localhost:4001", {
        auth: { token },
      });

      newSocket.on("connect", () => {
        socket.current = newSocket;
        joinBoard(boardId);
      });

      newSocket.on("error", (msg: string) => {
        console.error("SocketIO: Error", msg);
      });

      newSocket.on(SocketEventsEnum.boardsUpdateSuccess, (updatedBoardData) => {
        console.log("Received updated board data:", updatedBoardData);
        updateBoardContext(updatedBoardData); // Update state with the new board data
      });

      return () => {
        if (socket.current) {
          leaveBoard(boardId);
          socket.current.removeAllListeners();
          socket.current.close();
        }
      };
    }
  }, []);

  const updateBoard = (title: string) => {
    if (socket.current !== null) {
      socket.current.emit(SocketEventsEnum.boardsUpdate, {
        boardId,
        fields: { title },
      });
    }
  };

  const joinBoard = (boardId: string) => {
    if (socket.current) {
      socket.current.emit(SocketEventsEnum.boardsJoin, { boardId });
    }
  };

  const leaveBoard = (boardId: string) => {
    if (socket.current) {
      socket.current.emit(SocketEventsEnum.boardsLeave, { boardId });
    }
  };

  const value = useMemo(
    () => ({
      socket: socket.current,
      joinBoard,
      leaveBoard,
      updateBoard,
    }),
    [socket, joinBoard, leaveBoard, updateBoard],
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
