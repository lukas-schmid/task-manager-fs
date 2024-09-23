import { logout } from "@/actions/auth";

export async function GET() {
  return await logout();
}
