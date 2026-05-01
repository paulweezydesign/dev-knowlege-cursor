import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/tasks", label: "Tasks" },
] as const;

export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
          <Link
            href="/projects"
            className="font-heading text-sm font-semibold tracking-tight text-foreground"
          >
            AgencyOS
          </Link>
          <nav className="flex items-center gap-1" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main
        className={cn(
          "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
