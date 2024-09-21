"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Board } from "@/types/board.interface";

interface BoardContextType {
  board: Board | null;
  updateBoard(board: Board): void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardProviderProps {
  initialBoard: Board | null;
  children: React.ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({
  initialBoard,
  children,
}) => {
  const [board, setBoard] = useState<Board | null>(initialBoard);

  const updateBoard = useCallback((board: Board) => {
    setBoard(board);
  }, []);

  const value = useMemo(
    () => ({
      board,
      updateBoard,
    }),
    [board, updateBoard],
  );

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
