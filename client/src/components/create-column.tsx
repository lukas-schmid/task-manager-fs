"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/card";
import { InlineForm } from "@/components/inline-form";
import { CirclePlus } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";

export const CreateColumn = () => {
  const { createColumn } = useSocket();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCreateColumn = useCallback(
    (payload: FormData) => {
      const title = payload.get("title") as string;
      createColumn(title);
      setIsEditing(false);
    },
    [createColumn],
  );

  return (
    <Card
      onClick={handleClick}
      className="min-h-20 cursor-pointer h-full flex justify-center items-center border"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <InlineForm
          isEditing={isEditing}
          name="title"
          setIsEditing={setIsEditing}
          action={handleCreateColumn}
          text="Create new column"
        />

        {!isEditing && <CirclePlus size={20} />}
      </div>
    </Card>
  );
};
