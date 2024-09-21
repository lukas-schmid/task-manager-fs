import { Column as ColumnInterface } from "../types/column.interface";
import { Task as TaskInterface } from "../types/task.interface";
import { Task } from "./task";

interface ColumnProps {
  column: ColumnInterface;
  tasks: TaskInterface[];
}

export const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div className="flex justify-start items-center flex-col min-h-screen min-w-60 max-w-60 bg-secondary rounded">
      <div className="p-3">
        <h3>{column.title}</h3>
      </div>
      <div className="flex flex-col gap-2 w-full p-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
