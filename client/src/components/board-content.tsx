"use client";

import { Column as ColumnInterface } from "@/types/column.interface";
import { Task } from "@/types/task.interface";
import { Column } from "@/components/column";
import { CreateColumn } from "@/components/create-column";

interface BoardContentProps {
  columns: ColumnInterface[] | null;
  tasks: Task[] | null;
}

export const BoardContent = ({ columns, tasks }: BoardContentProps) => {
  return (
    <main className="min-h-screen p-3 bg-primary">
      <div className="flex flex-row gap-3 overflow-x-auto">
        {columns &&
          columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={getTasksByColumn(column.id, tasks)}
            />
          ))}
        <CreateColumn />
      </div>
    </main>
  );
};

const getTasksByColumn = (columnId: string, tasks: Task[] | null) => {
  if (!tasks) return [];
  return tasks.filter((task) => task.columnId === columnId);
};
