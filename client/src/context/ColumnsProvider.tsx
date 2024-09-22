"use client";

import { Column } from "@/types/column.interface";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

interface ColumnsContextType {
  columns: Column[] | null;
  createColumn(column: Column): void;
  updateColumn(column: Column): void;
  deleteColumn(columnId: string): void;
}

const ColumnsContext = createContext<ColumnsContextType | undefined>(undefined);

interface ColumnsProviderProps {
  initialColumns: Column[] | null;
  children: React.ReactNode;
}

export const ColumnsProvider: React.FC<ColumnsProviderProps> = ({
  initialColumns,
  children,
}) => {
  const [columns, setColumns] = useState<Column[] | null>(initialColumns);

  const createColumn = useCallback((column: Column) => {
    setColumns((state) => {
      const columnExists = state?.some(
        (existingColumn) => existingColumn.id === column.id,
      );

      if (!columnExists) {
        return [...(state || []), column];
      }

      return state;
    });
  }, []);

  const updateColumn = useCallback((column: Column) => {
    setColumns(
      (state) =>
        state &&
        state.map((stateColumn) =>
          stateColumn.id === column.id ? column : stateColumn,
        ),
    );
  }, []);

  const deleteColumn = useCallback((columnId: string) => {
    setColumns(
      (state) => state && state.filter((column) => column.id !== columnId),
    );
  }, []);

  const value = useMemo(
    () => ({
      columns,
      createColumn,
      updateColumn,
      deleteColumn,
    }),
    [columns, createColumn, updateColumn, deleteColumn],
  );

  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
};

export const useColumns = (): ColumnsContextType => {
  const context = useContext(ColumnsContext);
  if (context === undefined) {
    throw new Error("useColumns must be used within a ColumnsProvider");
  }
  return context;
};
