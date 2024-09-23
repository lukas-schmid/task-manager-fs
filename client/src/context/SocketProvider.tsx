"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { SocketEventsEnum } from "@/types/socketEvents.enum";
import { useBoard } from "@/context/BoardProvider";
import { useRouter } from "next/navigation";
import { useColumns } from "./ColumnsProvider";
import { useTasks } from "./tasksProvider";

interface SocketContextType {
  socket: Socket | null;
  joinBoard(boardId: string): void;
  leaveBoard(boardId: string): void;
  updateBoard(title: string): void;
  deleteBoard(): void;
  createColumn(title: string): void;
  updateColumn(columnId: string, title: string): void;
  deleteColumn(columnId: string): void;
  createTask(taskId: string, title: string): void;
  updateTask(params: {
    taskId: string;
    fields: {
      title?: string;
      description?: string;
      columnId?: string;
    };
  }): void;
  deleteTask(taskId: string): void;
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
  const router = useRouter();
  const { updateBoard: updateBoardContext, deleteBoard: deleteBoardContext } =
    useBoard();
  const {
    createColumn: createColumnContext,
    updateColumn: updateColumnContext,
    deleteColumn: deleteColumnContext,
  } = useColumns();

  const {
    createTask: createTaskContext,
    updateTask: updateTaskContext,
    deleteTask: deleteTaskContext,
  } = useTasks();

  const socket = useRef<Socket | null>(null);

  const joinBoard = useCallback((boardId: string) => {
    if (socket.current) {
      socket.current.emit(SocketEventsEnum.boardsJoin, { boardId });
    }
  }, []);

  const leaveBoard = useCallback((boardId: string) => {
    if (socket.current) {
      socket.current.emit(SocketEventsEnum.boardsLeave, { boardId });
    }
  }, []);

  const updateBoard = useCallback(
    (title: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.boardsUpdate, {
          boardId,
          fields: { title },
        });
      }
    },
    [boardId],
  );

  const deleteBoard = useCallback(() => {
    if (socket.current !== null) {
      socket.current.emit(SocketEventsEnum.boardsDelete, {
        boardId,
      });
    }
  }, [boardId]);

  const createColumn = useCallback(
    (title: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.columnsCreate, {
          boardId,
          title,
        });
      }
    },
    [boardId],
  );

  const updateColumn = useCallback(
    (columnId: string, title: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.columnsUpdate, {
          boardId,
          columnId,
          fields: {
            title,
          },
        });
      }
    },
    [boardId],
  );

  const deleteColumn = useCallback(
    (columnId: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.columnsDelete, {
          boardId,
          columnId,
        });
      }
    },
    [boardId],
  );

  const createTask = useCallback(
    (columnId: string, title: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.tasksCreate, {
          boardId,
          columnId,
          title,
        });
      }
    },
    [boardId],
  );

  const updateTask = useCallback(
    ({
      taskId,
      fields: { title, description, columnId },
    }: {
      taskId: string;
      fields: { title?: string; description?: string; columnId?: string };
    }) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.tasksUpdate, {
          boardId,
          taskId,
          fields: {
            title,
            description,
            columnId,
          },
        });
      }
    },
    [boardId],
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      if (socket.current !== null) {
        socket.current.emit(SocketEventsEnum.tasksDelete, {
          boardId,
          taskId,
        });
      }
    },
    [boardId],
  );

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
        updateBoardContext(updatedBoardData);
      });

      newSocket.on(SocketEventsEnum.boardsDeleteSuccess, () => {
        deleteBoardContext();
        router.push("/boards");
      });

      newSocket.on(
        SocketEventsEnum.columnsCreateSuccess,
        (createdColumnData) => {
          createColumnContext(createdColumnData);
        },
      );

      newSocket.on(
        SocketEventsEnum.columnsUpdateSuccess,
        (updatedColumnData) => {
          updateColumnContext(updatedColumnData);
        },
      );

      newSocket.on(SocketEventsEnum.columnsDeleteSuccess, (columnId) => {
        deleteColumnContext(columnId);
      });

      newSocket.on(SocketEventsEnum.tasksCreateSuccess, (createdTaskData) => {
        createTaskContext(createdTaskData);
      });

      newSocket.on(SocketEventsEnum.tasksUpdateSuccess, (updatedTaskData) => {
        updateTaskContext(updatedTaskData);
      });

      newSocket.on(SocketEventsEnum.tasksDeleteSuccess, (taskId) => {
        deleteTaskContext(taskId);
      });

      return () => {
        if (socket.current) {
          leaveBoard(boardId);
          socket.current.removeAllListeners();
          socket.current.close();
        }
      };
    }
  }, [
    boardId,
    token,
    updateBoardContext,
    joinBoard,
    leaveBoard,
    createColumnContext,
    createTaskContext,
    deleteBoardContext,
    deleteColumnContext,
    deleteTaskContext,
    router,
    updateColumnContext,
    updateTaskContext,
  ]);

  const value = useMemo(
    () => ({
      socket: socket.current,
      joinBoard,
      leaveBoard,
      updateBoard,
      deleteBoard,
      createColumn,
      updateColumn,
      deleteColumn,
      createTask,
      updateTask,
      deleteTask,
    }),
    [
      socket,
      joinBoard,
      leaveBoard,
      updateBoard,
      deleteBoard,
      createColumn,
      updateColumn,
      deleteColumn,
      createTask,
      updateTask,
      deleteTask,
    ],
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
