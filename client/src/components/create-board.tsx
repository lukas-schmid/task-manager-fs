"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/card";
import { InlineForm } from "@/components/inline-form";
import { useFormState } from "react-dom";
import { createBoard } from "@/actions/boards";
import { CirclePlus } from "lucide-react";

export const CreateBoard = () => {
  const [state, action] = useFormState(createBoard, undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (state?.status === "success") {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <Card
      onClick={handleClick}
      className="min-h-52 cursor-pointer h-full flex justify-center items-center border"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <InlineForm
          isEditing={isEditing}
          name="title"
          setIsEditing={setIsEditing}
          action={action}
          text="Create new board"
        />

        {!isEditing && <CirclePlus size={20} />}
      </div>
    </Card>
  );
};
