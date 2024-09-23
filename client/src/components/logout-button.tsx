"use client";

import { LogOut } from "lucide-react";
import { Button } from "./button";
import { logout } from "@/actions/auth";

export const LogoutButton = () => {
  return (
    <Button
      className="bg-transparent hover:bg-transparent"
      onClick={() => logout()}
    >
      <div className="flex gap-2">
        <LogOut />
        <span>Logout</span>
      </div>
    </Button>
  );
};
