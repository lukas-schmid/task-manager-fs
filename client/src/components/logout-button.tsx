import { LogOut } from "lucide-react";
import Link from "next/link";

export const LogoutButton = () => {
  return (
    <Link href="/logout">
      <div className="flex gap-2">
        <LogOut />
        <span>Logout</span>
      </div>
    </Link>
  );
};
