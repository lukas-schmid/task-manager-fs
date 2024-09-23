import { getBoards } from "@/actions/boards";
import { Board } from "@/components/board";
import { CreateBoard } from "@/components/create-board";
import { LogoutButton } from "@/components/logout-button";

export default async function Boards() {
  const boards = await getBoards();
  return (
    <>
      <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
        <div className="flex items-center justify-end h-full px-4">
          <LogoutButton />
        </div>
      </nav>
      <main className="pt-20 pb-10 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <CreateBoard />
        {boards &&
          boards.map((board) => <Board key={board.id} board={board} />)}
      </main>
    </>
  );
}
