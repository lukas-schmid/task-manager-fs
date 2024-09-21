import Link from "next/link";
import { Board as BoardInterface } from "@/types/board.interface";
import { Card } from "@/components/card";

interface BoardProps {
  board: BoardInterface;
}

export const Board = ({ board }: BoardProps) => {
  return (
    <Link className="min-h-52" href={`/boards/${board.id}`}>
      <Card className="h-full flex justify-center items-center">
        <p>{board.title}</p>
      </Card>
    </Link>
  );
};
