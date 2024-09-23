import { SocketProvider } from "@/context/SocketProvider";
import { Column as ColumnInterface } from "@/types/column.interface";
import { Task } from "@/types/task.interface";
import { Board } from "@/types/board.interface";
import { BoardContent } from "@/components/board-content";
import { BoardProvider } from "@/context/BoardProvider";
import { ColumnsProvider } from "@/context/ColumnsProvider";
import { TasksProvider } from "@/context/tasksProvider";
import { BoardNavbar } from "@/components/board-navbar";

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
            <BoardNavbar />
            <BoardContent taskIdSearchParam={taskIdSearchParam} />
          </SocketProvider>
        </TasksProvider>
      </ColumnsProvider>
    </BoardProvider>
  );
};
