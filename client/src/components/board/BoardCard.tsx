"use client";

import Link from "next/link";
import { Board } from "@/types/board.interface";
import { Card } from "@/components/common/Card";

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <>
      <div className="relative min-h-52">
        <Link href={`/boards/${board.id}`}>
          <Card className="h-full flex justify-center items-center hover:bg-card/80">
            <p className="p-2 text-center break-words min-w-0">{board.title}</p>
          </Card>
        </Link>
      </div>
    </>
  );
};
