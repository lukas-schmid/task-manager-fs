"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import { BoardHeaderTitle } from "@/components/board/BoardHeaderTitle";
import { LogoutButton } from "@/components/common/LogoutButton";
import useBreakpoint from "@/hooks/use-breakpoint";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketProvider";
import { useState } from "react";
import Dialog from "@/components/common/Dialog";

export const BoardNavbar = () => {
  const breakpoint = useBreakpoint();
  const router = useRouter();
  const { deleteBoard } = useSocket();
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

  const handleClick = () => {
    router.push("/boards");
    router.refresh();
  };

  return (
    <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
      <div className="flex items-center justify-between h-full px-4 gap-3">
        <div className="w-full flex items-center gap-5 overflow-hidden">
          <Button
            className="flex items-center gap-3 text-sm bg-transparent hover:bg-transparent p-0"
            onClick={handleClick}
          >
            <ArrowLeft />
            {breakpoint !== "default" && "Overview"}
          </Button>
          <Button
            onClick={openDialog}
            className="flex justify-center items-center p-0 h-5 w-5 bg-red-600 hover:bg-red-500"
          >
            <Trash2 size={15} />
          </Button>{" "}
          <BoardHeaderTitle />
        </div>
        <LogoutButton />
      </div>
      <Dialog
        title="Delete this board?"
        message="Are you sure you want to delete this board including all its content?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isDialogOpen}
      />
    </nav>
  );
};
