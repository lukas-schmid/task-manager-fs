"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

export async function getUser() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const token = await decrypt(accessToken);

  if (!token) {
    return null;
  }

  // Use the token to fetch user details from your backend
  const response = await fetch("http://localhost:4001/api/user", {
    method: "GET",
    headers: {
      Authorization: token as string,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data.");
  }

  const user = await response.json();
  return user;
}
