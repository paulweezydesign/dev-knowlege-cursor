"use client"

import { useState } from "react"
import { Plus, Search, Calendar, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { projects, formatCurrency } from "@/lib/mock-data"

const statusStyles = {
  planning: "bg-slate-500/10 text-slate-700",
  "in-progress": "bg-blue-500/10 text-blue-700",
  review: "bg-amber-500/10 text-amber-700",
  completed: "bg-emerald-500/10 text-emerald-700",
  "on-hold": "bg-red-500/10 text-red-700",
} as const

const priorityStyles = {
  low: "bg-slate-500/10 text-slate-600",
  medium: "bg-blue-500/10 text-blue-600",
  high: "bg-amber-500/10 text-amber-600",
  critical: "bg-red-500/10 text-red-600",
} as const

function budgetHealth(spent: number, budget: number) {
  const ratio = spent / budget
  if (ratio >= 1.0) return { label: "Over budget", color: "text-red-600" }
  if (ratio >= 0.8) return { label: "At risk", color: "text-amber-600" }
  return { label: "On track", color: "text-emerald-600" }
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const health = budgetHealth(project.spent, project.budget)
  const budgetPercent = Math.min((project.spent / project.budget) * 100, 100)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold leading-tight truncate">
              {project.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {project.client}
            </p>
          </div>
          <Badge variant="secondary" className={statusStyles[project.status]}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Budget</span>
            <span className={`font-medium ${health.color}`}>
              {health.label}
            </span>
          </div>
          <Progress
            value={budgetPercent}
            className="h-1.5"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(project.spent)} spent</span>
            <span>{formatCurrency(project.budget)} total</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {project.team.map((member) => (
                <Avatar key={member} className="size-6 border-2 border-background">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {member}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Badge variant="secondary" className={priorityStyles[project.priority]}>
              {project.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="size-3" />
            <span>{project.dueDate}</span>
          </div>
        </div>

        {budgetPercent >= 80 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 rounded-md p-2">
            <AlertTriangle className="size-3 shrink-0" />
            Budget threshold alert ({Math.round(budgetPercent)}%)
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("")

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase())
  )

  const byStatus = (status: string) =>
    filtered.filter((p) => p.status === status)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Track project progress, budgets, and team allocation.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          New Project
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(["planning", "in-progress", "review", "on-hold", "completed"] as const).map(
          (status) => (
            <Card key={status}>
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground capitalize">
                    {status.replace("-", " ")}
                  </p>
                  <span className="text-2xl font-bold">
                    {projects.filter((p) => p.status === status).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All ({filtered.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({byStatus("in-progress").length})
          </TabsTrigger>
          <TabsTrigger value="review">
            Review ({byStatus("review").length})
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planning ({byStatus("planning").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </TabsContent>

        {(["in-progress", "review", "planning"] as const).map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byStatus(status).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
              {byStatus(status).length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  No projects in this stage.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
