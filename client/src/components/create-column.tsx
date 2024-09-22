"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/card";
import { CirclePlus } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import { InlineFormInput } from "@/components/inline-form-input";

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
      className="min-h-20 max-h-20 min-w-60 max-w-60 cursor-pointer flex justify-center items-center border"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <InlineFormInput
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
