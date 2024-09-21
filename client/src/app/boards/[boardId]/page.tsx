import { getBoard } from "@/app/actions/boards";
import { getColumns } from "@/app/actions/columns";
import { getTasks } from "@/app/actions/tasks";
import { BoardPage } from "@/app/components/board-page";
import { getSession } from "@/app/lib/session";

interface BoardProps {
  params: {
    boardId: string;
  };
}

export default async function Board({ params }: BoardProps) {
  const boardId = params.boardId;
  const session = await getSession();
  const board = await getBoard(boardId);
  const columns = await getColumns(boardId);
  const tasks = await getTasks(boardId);

  return (
    <BoardPage
      board={board}
      columns={columns}
      tasks={tasks}
      sessionToken={session?.token}
    />
  );
}
