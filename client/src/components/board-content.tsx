"use client";

import { Task } from "@/types/task.interface";
import { Column } from "@/components/column";
import { CreateColumn } from "@/components/create-column";
import { useColumns } from "@/context/ColumnsProvider";

interface BoardContentProps {
  tasks: Task[] | null;
}

export const BoardContent = ({ tasks }: BoardContentProps) => {
  const { columns } = useColumns();
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
