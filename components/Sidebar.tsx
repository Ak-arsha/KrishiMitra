"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, TrendingUp, Users, Newspaper,
  Brain, Mic, Warehouse, Sprout,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sell-advisor", label: "Sell Advisor", icon: TrendingUp },
  { href: "/buyer-recommendations", label: "Buyer Matches", icon: Users },
  { href: "/market-intelligence", label: "Market Intelligence", icon: Newspaper },
  { href: "/explainable-ai", label: "Explainable AI", icon: Brain },
  { href: "/voice-assistant", label: "Voice Assistant", icon: Mic },
  { href: "/storage-advisor", label: "Storage Advisor", icon: Warehouse },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <Sprout className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight">KrishiMitra</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-border text-xs text-muted-foreground">
        Built for the hackathon — AI-powered farm advisory
      </div>
    </aside>
  );
}
