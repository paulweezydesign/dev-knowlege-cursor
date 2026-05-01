"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Palette,
  Receipt,
  UsersRound,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/design-review", label: "Design review", icon: Palette },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/team", label: "Team", icon: UsersRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full grid-cols-[260px_1fr] bg-background">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-border/60 bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 pt-5 pb-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-sm">
            <Sparkles className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">AgencyOS</span>
            <span className="text-[11px] text-muted-foreground">
              Northwind Studio
            </span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2">
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          {nav.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 transition-colors",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-lg border border-border/70 bg-card p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs text-white">
                MC
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">Maya Chen</span>
              <span className="truncate text-[11px] text-muted-foreground">
                Owner · Northwind Studio
              </span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur">
          <div className="relative flex max-w-md flex-1 items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Input
              className="h-9 pl-9"
              placeholder="Search clients, projects, designs…"
              aria-label="Search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="hidden gap-1.5 border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 sm:inline-flex"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              All systems healthy
            </Badge>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <Button size="sm">New project</Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
