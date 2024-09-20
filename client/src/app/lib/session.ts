import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(token: string) {
  return new SignJWT({ token })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  accessToken: string | undefined = "",
): Promise<string | unknown> {
  try {
    const { payload } = await jwtVerify(accessToken, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload.token;
  } catch (error) {
    console.error("Failed to verify session:", error);
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(token);

  cookies().set("accessToken", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("accessToken");
}
