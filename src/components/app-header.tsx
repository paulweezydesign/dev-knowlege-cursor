"use client"

import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects",
  "/reviews": "Design Reviews",
  "/invoices": "Invoices",
  "/proposals": "Proposals",
  "/time": "Time Tracking",
  "/integrations": "Integrations",
  "/settings": "Settings",
}

export function AppHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "AgencyOS"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 !h-4" />
      <h1 className="text-sm font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects, clients..."
            className="w-64 pl-8 h-8"
          />
        </div>
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="size-4" />
          <Badge className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px]">
            3
          </Badge>
        </Button>
      </div>
    </header>
  )
}
