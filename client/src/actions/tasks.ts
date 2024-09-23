"use server";

import { apiUrl } from "@/config";
import { getSession } from "@/lib/session";
import { Task } from "@/types/task.interface";

export async function getTasks(boardId: string): Promise<Task[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/boards/${boardId}/tasks`, {
      method: "GET",
      headers: {
        Authorization: session.token,
      },
    });

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
