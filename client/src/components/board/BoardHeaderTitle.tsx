"use client";

import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { useBoard } from "@/context/BoardProvider";
import { useSocket } from "@/context/SocketProvider";
import { InlineFormInput } from "@/components/form/InlineFormInput";

export const BoardHeaderTitle = () => {
  const { board } = useBoard();
  const { updateBoard } = useSocket();
  const [isEditing, setIsEditing] = useState(false);

  const updateBoardTitle = useCallback(
    (payload: FormData) => {
      const title = payload.get("title") as string;
      updateBoard(title);
      setIsEditing(false);
    },
    [updateBoard],
  );

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  if (!board) {
    return null;
  }

  return (
    <>
      <div onClick={handleClick} className="w-full flex items-center gap-2">
        {!isEditing && <Pencil size={10} />}
        <InlineFormInput
          isEditing={isEditing}
          name="title"
          setIsEditing={setIsEditing}
          action={updateBoardTitle}
          text={board.title}
          defaultValue={board.title}
        />
      </div>
    </>
  );
};
