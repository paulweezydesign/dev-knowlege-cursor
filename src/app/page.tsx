"use client"

import {
  DollarSign,
  Users,
  FolderKanban,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { projects, clients, invoices, formatCurrency } from "@/lib/mock-data"

const activeProjects = projects.filter((p) => p.status === "in-progress")
const activeClients = clients.filter((c) => c.status === "active")
const totalRevenue = invoices
  .filter((i) => i.status === "paid")
  .reduce((sum, i) => sum + i.amount, 0)
const overdueInvoices = invoices.filter((i) => i.status === "overdue")

const kpis = [
  {
    title: "Total Revenue",
    value: formatCurrency(totalRevenue),
    change: "+12.5%",
    icon: DollarSign,
    trend: "up" as const,
  },
  {
    title: "Active Clients",
    value: activeClients.length.toString(),
    change: "+2 this month",
    icon: Users,
    trend: "up" as const,
  },
  {
    title: "Active Projects",
    value: activeProjects.length.toString(),
    change: "3 due soon",
    icon: FolderKanban,
    trend: "neutral" as const,
  },
  {
    title: "Utilization Rate",
    value: "82%",
    change: "Optimal range",
    icon: TrendingUp,
    trend: "up" as const,
  },
]

const recentActivity = [
  { id: 1, action: "Design review approved", project: "NovaCraft Brand Identity", time: "2h ago", type: "success" as const },
  { id: 2, action: "New comment on wireframes", project: "UrbanPulse Dashboard", time: "3h ago", type: "info" as const },
  { id: 3, action: "Invoice overdue", project: "UrbanPulse Dashboard", time: "1d ago", type: "warning" as const },
  { id: 4, action: "Milestone completed", project: "Bloom Health Admin Portal", time: "1d ago", type: "success" as const },
  { id: 5, action: "Budget alert: 80% threshold", project: "NovaCraft Brand Identity", time: "2d ago", type: "warning" as const },
  { id: 6, action: "Client signed SOW", project: "TechVault API Integration", time: "3d ago", type: "success" as const },
]

const statusColor = {
  "in-progress": "bg-blue-500/10 text-blue-700",
  review: "bg-amber-500/10 text-amber-700",
  planning: "bg-slate-500/10 text-slate-700",
  completed: "bg-emerald-500/10 text-emerald-700",
  "on-hold": "bg-red-500/10 text-red-700",
} as const

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Good afternoon, Jane
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening across your agency today.
          </p>
        </div>
        <Button render={<Link href="/projects" />}>
          View All Projects <ArrowUpRight className="ml-1 size-4" />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Active Projects */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Active Projects</CardTitle>
            <Button variant="ghost" size="sm" render={<Link href="/projects" />}>
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects
              .filter((p) => p.status !== "completed")
              .slice(0, 5)
              .map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1">
                        {project.team.slice(0, 3).map((member) => (
                          <Avatar key={member} className="size-6 border-2 border-background">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                              {member}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {project.client}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={statusColor[project.status]}
                    >
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={project.progress} className="flex-1 h-1.5" />
                    <span className="text-xs text-muted-foreground w-8 text-right">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                    </span>
                    <span>Due {project.dueDate}</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Alerts */}
          {overdueInvoices.length > 0 && (
            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="size-4" />
                  Action Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {overdueInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-amber-900">{inv.number} — {inv.client}</span>
                    <span className="font-medium text-amber-800">
                      {formatCurrency(inv.amount)}
                    </span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2" render={<Link href="/invoices" />}>
                  Review Overdue Invoices
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {event.type === "success" && (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    )}
                    {event.type === "warning" && (
                      <AlertTriangle className="size-4 text-amber-500" />
                    )}
                    {event.type === "info" && (
                      <Clock className="size-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-none">{event.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.project} · {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
