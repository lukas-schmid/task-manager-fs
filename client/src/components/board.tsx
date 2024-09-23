"use client";

import Link from "next/link";
import { Board as BoardInterface } from "@/types/board.interface";
import { Card } from "@/components/card";

interface BoardProps {
  board: BoardInterface;
}

export const Board = ({ board }: BoardProps) => {
  return (
    <>
      <div className="relative min-h-52">
        <Link href={`/boards/${board.id}`}>
          <Card className="h-full flex justify-center items-center">
            <p className="text-center">{board.title}</p>
          </Card>
        </Link>
      </div>
    </>
  );
};
