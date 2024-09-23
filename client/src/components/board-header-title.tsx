"use client";

import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { useBoard } from "@/context/BoardProvider";
import { useSocket } from "@/context/SocketProvider";
import Dialog from "@/components/dialog";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { InlineFormInput } from "@/components/inline-form-input";

export const BoardHeaderTitle = () => {
  const { board } = useBoard();
  const { updateBoard, deleteBoard } = useSocket();
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleConfirm = () => {
    deleteBoard();
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const openDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

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
      {!isEditing && (
        <Button
          onClick={openDialog}
          className="flex justify-center items-center p-0 h-5 w-5 bg-red-600 hover:bg-red-500"
        >
          <Trash2 size={15} />
        </Button>
      )}
      <Dialog
        title="Delete this board?"
        message="Are you sure you want to delete this board including all its content?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isDialogOpen}
      />
    </>
  );
};
