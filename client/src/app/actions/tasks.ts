"use server";

import { getSession } from "@/app/lib/session";
import { Task } from "../types/task.interface";

export async function getTasks(boardId: string): Promise<Task[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const response = await fetch(
    `http://localhost:4001/api/boards/${boardId}/tasks`,
    {
      method: "GET",

      headers: {
        Authorization: session.token,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = await response.json();
  return tasks;
}
