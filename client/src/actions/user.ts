"use server";

import { getSession } from "@/lib/session";

export async function getUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const response = await fetch("http://localhost:4001/api/user", {
      method: "GET",
      headers: {
        Authorization: session.token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user data.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
