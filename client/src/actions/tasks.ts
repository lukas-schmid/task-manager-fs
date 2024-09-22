"use server";

import { getSession } from "@/lib/session";
import { Task } from "@/types/task.interface";

export async function getTasks(boardId: string): Promise<Task[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
}
