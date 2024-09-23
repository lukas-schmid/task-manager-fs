import { Task as TaskInterface } from "@/types/task.interface";
import { Card } from "@/components/card";
import Link from "next/link";

interface TaskProps {
  task: TaskInterface;
}

export const Task = ({ task }: TaskProps) => {
  return (
    <Link href={`/boards/${task.boardId}?taskid=${task.id}`}>
      <Card className="max-h-60 flex flex-col gap-1 cursor-pointer">
        <span className="min-h-6 truncate">{task.title}</span>
        <span className="whitespace-pre text-ellipsis overflow-hidden text-sm text-gray-500">
          {task.description}
        </span>
      </Card>
    </Link>
  );
};
