import { getBoards } from "@/actions/boards";
import { BoardCard } from "@/components/board-card";
import { CreateBoard } from "@/components/create-board";
import { LogoutButton } from "@/components/logout-button";

export default async function Boards() {
  const boards = await getBoards();
  return (
    <>
      <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
        <div className="flex items-center justify-between h-full px-4">
          <h2 className="font-bold text-xl text-gradient-blue">My Boards</h2>
          <LogoutButton />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto pt-20 pb-10 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <CreateBoard />
        {boards &&
          boards.map((board) => <BoardCard key={board.id} board={board} />)}
      </main>
    </>
  );
}
