"use client";

import { Sprout } from "lucide-react";

export function Topbar() {
  return (
    <header className="md:hidden sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-card px-4 py-3">
      <Sprout className="h-5 w-5 text-primary" />
      <span className="font-bold">KrishiMitra</span>
    </header>
  );
}
