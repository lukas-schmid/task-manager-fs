import { Task as TaskInterface } from "@/types/task.interface";
import { Card } from "@/components/card";
import Link from "next/link";

interface TaskProps {
  task: TaskInterface;
}

export const Task = ({ task }: TaskProps) => {
  return (
    <Link href={`/boards/${task.boardId}?taskid=${task.id}`}>
      <Card className="cursor-pointer">{task.title}</Card>
    </Link>
  );
};
