"use server";

import { getSession } from "@/lib/session";
import { Board } from "@/types/board.interface";
import { FormBoardState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { apiUrl } from "@/config";

export async function getBoards(): Promise<Board[] | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/boards`, {
      method: "GET",
      headers: {
        Authorization: session.token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch boards");
    }

    const boards = await response.json();
    return boards;
  } catch (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
}

export async function getBoard(boardId: string): Promise<Board | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/boards/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: session.token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch board");
    }

    const board = await response.json();
    return board;
  } catch (error) {
    console.error("Error fetching board:", error);
    return null;
  }
}

export async function createBoard(
  state: FormBoardState,
  formData: FormData,
): Promise<FormBoardState> {
  const session = await getSession();

  if (!session) {
    return {
      status: "error",
      message: "You are not authorized to perform this action",
    };
  }
  const title = formData.get("title");

  try {
    const response = await fetch(`${apiUrl}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.token,
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to create board",
      };
    }

    revalidatePath("/boards");
    return { status: "success", message: "New board has been created" };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "An unknown error occured. Couldn't sign up",
    };
  }
}
