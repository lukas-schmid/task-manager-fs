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
import { LogoutButton } from "./logout-button";

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
            <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
              <div className="flex items-center justify-between h-full px-4 gap-3">
                <div className="flex items-center gap-5">
                  <Link
                    className="flex items-center gap-3 text-sm"
                    href="/boards"
                  >
                    <ArrowLeft /> Overview
                  </Link>
                  <BoardHeaderTitle />
                </div>
                <LogoutButton />
              </div>
            </nav>
            <BoardContent taskIdSearchParam={taskIdSearchParam} />
          </SocketProvider>
        </TasksProvider>
      </ColumnsProvider>
    </BoardProvider>
  );
};
