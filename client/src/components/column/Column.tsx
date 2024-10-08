import { Column as ColumnInterface } from "@/types/column.interface";
import { Task as TaskInterface } from "@/types/task.interface";
import { Task } from "@/components/task/Task";
import { useCallback, useState } from "react";
import { CircleX, Pencil } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import { Button } from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import { CreateTask } from "@/components/task/CreateTask";
import { InlineFormInput } from "@/components/form/InlineFormInput";

interface ColumnProps {
  column: ColumnInterface;
  tasks: TaskInterface[];
}

export const Column = ({ column, tasks }: ColumnProps) => {
  const { updateColumn, deleteColumn } = useSocket();
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = () => {
    deleteColumn(column.id);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const openDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  const updateColumnTitle = useCallback(
    (payload: FormData) => {
      const title = payload.get("title") as string;
      updateColumn(column.id, title);
      setIsEditing(false);
    },
    [updateColumn, column],
  );

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="flex justify-start items-center relative flex-col h-full min-w-60 max-w-60 bg-secondary/80 rounded">
      <Button
        className="h-5 w-5 p-0 absolute right-0 top-0 bg-transparent hover:bg-transparent"
        onClick={openDialog}
      >
        <CircleX size={15} />
      </Button>
      <div className="max-w-full p-3">
        <div onClick={handleClick} className="flex items-center gap-2">
          <InlineFormInput
            isEditing={isEditing}
            name="title"
            setIsEditing={setIsEditing}
            action={updateColumnTitle}
            text={column.title}
            defaultValue={column.title}
          />

          {!isEditing && <Pencil size={10} />}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full p-2 overflow-y-auto h-full">
        <CreateTask columnId={column.id} />
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <Dialog
        title="Delete this column?"
        message="Are you sure you want to delete this column including all its content?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isDialogOpen}
      />
    </div>
  );
};
