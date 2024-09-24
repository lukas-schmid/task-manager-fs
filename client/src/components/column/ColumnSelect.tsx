"use client";

import { useColumns } from "@/context/ColumnsProvider";
import { useSocket } from "@/context/SocketProvider";
import { Task } from "@/types/task.interface";
import { useCallback } from "react";

interface ColumnSelectProps {
  currentTask: Task;
}

export const ColumnSelect = ({ currentTask }: ColumnSelectProps) => {
  const { columns } = useColumns();
  const { updateTask } = useSocket();

  const handleUpdateColumn = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedColumnId = e.target.value;

      if (currentTask) {
        updateTask({
          taskId: currentTask.id,
          fields: {
            columnId: selectedColumnId,
          },
        });
      }
    },
    [updateTask, currentTask],
  );

  if (!columns) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <select
        name="columnId"
        id="columns"
        className="bg-background rounded-full border p-1 text-xs"
        value={currentTask.columnId}
        onChange={handleUpdateColumn}
      >
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </select>
    </div>
  );
};
