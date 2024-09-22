import { logout } from "@/actions/auth";

export async function GET() {
  return logout();
}
