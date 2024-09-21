"use server";

import { getSession } from "@/app/lib/session";
import { Column } from "../types/column.interface";

export async function getColumns(boardId: string): Promise<Column[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

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
    throw new Error("Failed to fetch columns");
  }

  const columns = await response.json();
  return columns;
}
