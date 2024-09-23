"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BoardHeaderTitle } from "@/components/board-header-title";
import { LogoutButton } from "@/components/logout-button";
import useBreakpoint from "@/hooks/use-breakpoint";

export const BoardNavbar = () => {
  const breakpoint = useBreakpoint();

  console.log(breakpoint);

  return (
    <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
      <div className="flex items-center justify-between h-full px-4 gap-3">
        <div className="flex items-center gap-5">
          <Link className="flex items-center gap-3 text-sm" href="/boards">
            <ArrowLeft />
            {breakpoint !== "default" && "Overview"}
          </Link>
          <BoardHeaderTitle />
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};
