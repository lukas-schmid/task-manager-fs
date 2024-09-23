"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { logout } from "@/actions/auth";
import useBreakpoint from "@/hooks/use-breakpoint";

export const LogoutButton = () => {
  const breakpoint = useBreakpoint();
  return (
    <Button
      className="p-0 bg-transparent hover:bg-transparent"
      onClick={() => logout()}
    >
      <div className="flex gap-2">
        <LogOut />
        {breakpoint !== "default" && <span>Logout</span>}
      </div>
    </Button>
  );
};
