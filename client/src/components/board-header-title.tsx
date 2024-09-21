"use client";

import { Pencil } from "lucide-react";
import { InlineForm } from "@/components/inline-form";
import { useCallback, useState } from "react";
import { useBoard } from "@/context/BoardProvider";
import { useSocket } from "@/context/SocketProvider";

export const BoardHeaderTitle = () => {
  const { board } = useBoard();
  const { updateBoard } = useSocket();
  const [isEditing, setIsEditing] = useState(false);

  console.log("boardTitle", board);
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
    <div onClick={handleClick} className="flex items-center gap-2">
      <InlineForm
        isEditing={isEditing}
        name="title"
        setIsEditing={setIsEditing}
        action={updateBoardTitle}
        text={board.title}
        defaultValue={board.title}
      />

      {!isEditing && <Pencil size={10} />}
    </div>
  );
};
