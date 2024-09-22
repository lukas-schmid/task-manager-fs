import Link from "next/link";
import { SocketProvider } from "@/context/SocketProvider";
import { Column as ColumnInterface } from "@/types/column.interface";
import { Task } from "@/types/task.interface";
import { Board } from "@/types/board.interface";
import { BoardContent } from "@/components/board-content";
import { ArrowLeft } from "lucide-react";
import { BoardHeaderTitle } from "@/components/board-header-title";
import { BoardProvider } from "@/context/BoardProvider";
import { ColumnsProvider } from "@/context/ColumnsProvider";
import { TasksProvider } from "@/context/tasksProvider";

interface BoardPageProps {
  board: Board | null;
  taskIdSearchParam: string | undefined;
  columns: ColumnInterface[] | null;
  tasks: Task[] | null;
  sessionToken: string | undefined;
}

export const BoardPage = ({
  board,
  taskIdSearchParam,
  columns,
  tasks,
  sessionToken,
}: BoardPageProps) => {
  return (
    <BoardProvider initialBoard={board}>
      <ColumnsProvider initialColumns={columns}>
        <TasksProvider initialTasks={tasks}>
          <SocketProvider token={sessionToken} boardId={board?.id}>
            <div>
              <nav className="flex items-center justify-between h-16 px-4 gap-3 bg-muted">
                <div className="flex items-center gap-5">
                  <Link
                    className="flex items-center gap-3 text-sm"
                    href="/boards"
                  >
                    <ArrowLeft /> Overview
                  </Link>
                  <BoardHeaderTitle />
                </div>
                <Link href="/logout">Logout</Link>
              </nav>
              <BoardContent taskIdSearchParam={taskIdSearchParam} />
            </div>
          </SocketProvider>
        </TasksProvider>
      </ColumnsProvider>
    </BoardProvider>
  );
};
