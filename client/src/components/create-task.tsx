"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/card";
import { CirclePlus } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import { InlineFormInput } from "@/components/inline-form-input";

interface CreateTaskProps {
  columnId: string;
}

export const CreateTask = ({ columnId }: CreateTaskProps) => {
  const { createTask } = useSocket();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCreateTask = useCallback(
    (payload: FormData) => {
      console.log(payload);
      const title = payload.get("title") as string;
      createTask(columnId, title);
      setIsEditing(false);
    },
    [createTask, columnId],
  );

  return (
    <Card
      onClick={handleClick}
      className="min-h-10 p-0 cursor-pointer h-full flex justify-center items-center border"
    >
      <div className="flex flex-col justify-center items-center p-1">
        <InlineFormInput
          isEditing={isEditing}
          name="title"
          setIsEditing={setIsEditing}
          action={handleCreateTask}
          text="Create new Task"
        />

        {!isEditing && <CirclePlus size={15} />}
      </div>
    </Card>
  );
};
