import { Task as TaskInterface } from "../types/task.interface";
import { Card } from "./card";

interface TaskProps {
  task: TaskInterface;
}

export const Task = ({ task }: TaskProps) => {
  return <Card className="cursor-pointer">{task.title}</Card>;
};
