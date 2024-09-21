import Link from "next/link";
import { getBoards } from "../actions/boards";
import { Board } from "../components/board";
import { CreateBoard } from "../components/create-board";

export default async function Boards() {
  const boards = await getBoards();
  return (
    <div>
      <nav className="flex items-center justify-end h-16 px-4 gap-3 bg-muted">
        <Link href="/logout">Logout</Link>
      </nav>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
        <CreateBoard />
        {boards &&
          boards.map((board) => <Board key={board.id} board={board} />)}
      </main>
    </div>
  );
}
