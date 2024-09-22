import { getBoard } from "@/actions/boards";
import { getColumns } from "@/actions/columns";
import { getTasks } from "@/actions/tasks";
import { BoardPage } from "@/components/board-page";
import { getSession } from "@/lib/session";

interface BoardProps {
  params: {
    boardId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Board({ params, searchParams }: BoardProps) {
  const boardId = params.boardId;
  const taskIdSearchParam = searchParams?.taskid as string | undefined;
  const session = await getSession();
  const board = await getBoard(boardId);
  const columns = await getColumns(boardId);
  const tasks = await getTasks(boardId);

  return (
    <BoardPage
      board={board}
      taskIdSearchParam={taskIdSearchParam}
      columns={columns}
      tasks={tasks}
      sessionToken={session?.token}
    />
  );
}
