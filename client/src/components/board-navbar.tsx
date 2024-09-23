"use client";

import { ArrowLeft } from "lucide-react";
import { BoardHeaderTitle } from "@/components/board-header-title";
import { LogoutButton } from "@/components/logout-button";
import useBreakpoint from "@/hooks/use-breakpoint";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const BoardNavbar = () => {
  const breakpoint = useBreakpoint();
  const router = useRouter();

  const handleClick = () => {
    router.push("/boards");
    router.refresh();
  };

  return (
    <nav className="h-16 w-full gap-3 bg-muted z-50 fixed">
      <div className="flex items-center justify-between h-full px-4 gap-3">
        <div className="w-full flex items-center gap-5 overflow-hidden">
          <Button
            className="flex items-center gap-3 text-sm bg-transparent hover:bg-transparent p-0"
            onClick={handleClick}
          >
            <ArrowLeft />
            {breakpoint !== "default" && "Overview"}
          </Button>
          <BoardHeaderTitle />
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};
