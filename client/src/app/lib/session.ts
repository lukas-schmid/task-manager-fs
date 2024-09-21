import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(sessionPayload: SessionPayload) {
  return new SignJWT(sessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decryptSession(cookieName: string) {
  const cookieStore = cookies();
  const session = cookieStore.get(cookieName)?.value;

  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return {
      token: payload.token as string,
      userId: payload.userId as string,
    };
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function createSession(sessionPayload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(sessionPayload);

  cookies().set("accessToken", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  return decryptSession("accessToken");
}

export function deleteSession() {
  cookies().delete("accessToken");
}
