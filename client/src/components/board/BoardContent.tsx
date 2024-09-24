"use client";

import { Task } from "@/types/task.interface";
import { Column } from "@/components/column/Column";
import { CreateColumn } from "@/components/column/CreateColumn";
import { useColumns } from "@/context/ColumnsProvider";
import { useTasks } from "@/context/tasksProvider";
import { TaskModal } from "@/components/task/TaskModal";
import { usePathname, useRouter } from "next/navigation";

interface BoardContentProps {
  taskIdSearchParam: string | undefined;
}

export const BoardContent = ({ taskIdSearchParam }: BoardContentProps) => {
  const { columns } = useColumns();
  const { tasks } = useTasks();
  const pathname = usePathname();
  const router = useRouter();

  const isTaskModalOpen = tasks
    ? tasks.some((task) => task.id === taskIdSearchParam)
    : false;

  const handleTaskModalClose = () => {
    router.replace(pathname);
  };

  return (
    <main className="h-full pt-20 p-3 bg-gradient-blue overflow-x-auto">
      <div className="h-full flex flex-row gap-3 overflow-x-auto">
        {columns &&
          columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={getTasksByColumn(column.id, tasks)}
            />
          ))}
        <CreateColumn />
        {taskIdSearchParam &&
          tasks &&
          tasks.some((task) => task.id === taskIdSearchParam) && (
            <TaskModal
              isOpen={isTaskModalOpen}
              onClose={handleTaskModalClose}
              taskId={taskIdSearchParam}
            />
          )}
      </div>
    </main>
  );
};

const getTasksByColumn = (columnId: string, tasks: Task[] | null) => {
  if (!tasks) return [];
  return tasks.filter((task) => task.columnId === columnId);
};
