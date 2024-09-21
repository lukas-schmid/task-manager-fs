"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "./card";
import { InlineForm } from "./inline-form";
import { useFormState } from "react-dom";
import { createBoard } from "../actions/boards";
import { CirclePlus } from "lucide-react";

interface CreateColumnProps {}

export const CreateColumn = ({}: CreateColumnProps) => {
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
      className="min-h-20 cursor-pointer h-full flex justify-center items-center border"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <InlineForm
          isEditing={isEditing}
          name="title"
          setIsEditing={setIsEditing}
          action={action}
          text="Create new column"
        />

        {!isEditing && <CirclePlus size={20} />}
      </div>
    </Card>
  );
};
