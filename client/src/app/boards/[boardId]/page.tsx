import { getBoard } from "@/app/actions/boards";
import { getColumns } from "@/app/actions/columns";
import { getTasks } from "@/app/actions/tasks";
import { Column } from "@/app/components/column";
import { CreateColumn } from "@/app/components/create-column";
import { Task } from "@/app/types/task.interface";
import Link from "next/link";

interface BoardProps {
  params: {
    boardId: string;
  };
}

export default async function Board({ params }: BoardProps) {
  const boardId = params.boardId;
  const board = await getBoard(boardId);
  const columns = await getColumns(boardId);
  const tasks = await getTasks(boardId);
  return (
    <div>
      <nav className="flex items-center justify-between h-16 px-4 gap-3 bg-muted">
        <h2 className="text-xl">{board?.title}</h2>
        <Link href="/logout">Logout</Link>
      </nav>
      <main className="min-h-screen p-3 bg-primary">
        <div className="flex flex-row gap-3 overflow-x-auto">
          {columns &&
            columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id, tasks)}
              />
            ))}
          <CreateColumn />
        </div>
      </main>
    </div>
  );
}

const getTasksByColumn = (columnId: string, tasks: Task[] | null) => {
  if (!tasks) return [];
  return tasks.filter((task) => task.columnId === columnId);
};
