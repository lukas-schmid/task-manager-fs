"use server";

import { getSession } from "@/lib/session";

export async function getUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  // Use the token to fetch user details from your backend
  const response = await fetch("http://localhost:4001/api/user", {
    method: "GET",
    headers: {
      Authorization: session.token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data.");
  }

  const user = await response.json();
  return user;
}
