"use server";

import { getSession } from "@/lib/session";
import { Column } from "@/types/column.interface";

export async function getColumns(boardId: string): Promise<Column[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:4001/api/boards/${boardId}/columns`,
      {
        method: "GET",
        headers: {
          Authorization: session.token,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch columns");
    }

    const columns = await response.json();
    return columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    return null;
  }
}
