import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleDashed, Clock4 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import {
  ProjectStatusBadge,
  TaskStatusBadge,
} from "@/components/status-badge";
import { TeamAvatars } from "@/components/team-avatars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clientById, personById, projectById } from "@/lib/data";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  initials,
} from "@/lib/format";
import type { Task, TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const TASK_COLUMNS: { status: TaskStatus; label: string; tone: string }[] = [
  { status: "backlog", label: "Backlog", tone: "from-zinc-400 to-zinc-500" },
  {
    status: "in_progress",
    label: "In progress",
    tone: "from-amber-400 to-orange-500",
  },
  {
    status: "in_review",
    label: "In review",
    tone: "from-violet-500 to-fuchsia-500",
  },
  { status: "done", label: "Done", tone: "from-emerald-500 to-teal-500" },
];

const priorityStyles = {
  low: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
  medium: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  high: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
} as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectById(id);
  if (!project) notFound();
  const client = clientById(project.clientId);
  const burnPct = Math.round((project.spent / project.budget) * 100);
  const overBudget = burnPct >= 100;
  const warning = burnPct >= 80;
  const tasksByStatus = TASK_COLUMNS.map((col) => ({
    ...col,
    tasks: project.tasks.filter((t) => t.status === col.status),
  }));
  const completedTasks = project.tasks.filter((t) => t.status === "done");
  const totalLogged = project.tasks.reduce((s, t) => s + t.loggedHours, 0);
  const totalEstimate = project.tasks.reduce(
    (s, t) => s + t.estimateHours,
    0
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <Link
        href="/projects"
        className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        All projects
      </Link>
      <PageHeader
        eyebrow={`${client?.name} · ${client?.industry}`}
        title={project.name}
        description={project.description}
        actions={
          <>
            <Button variant="outline" size="sm">
              Change request
            </Button>
            <Button size="sm">Send status update</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Status
            </span>
            <ProjectStatusBadge status={project.status} />
            <span className="text-xs text-muted-foreground">
              {project.onTime ? "On schedule" : "At risk of slipping"}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Timeline
            </span>
            <span className="text-sm font-medium">
              {formatDate(project.startDate)} → {formatDate(project.targetDate)}
            </span>
            <Progress value={project.progress} className="h-1.5" />
            <span className="text-xs text-muted-foreground">
              {project.progress}% complete
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Budget burn
            </span>
            <span
              className={cn(
                "text-2xl font-semibold tabular-nums",
                overBudget
                  ? "text-rose-600 dark:text-rose-400"
                  : warning
                    ? "text-amber-600 dark:text-amber-400"
                    : ""
              )}
            >
              {burnPct}%
            </span>
            <span className="text-xs text-muted-foreground">
              {formatCompactCurrency(project.spent)} of{" "}
              {formatCompactCurrency(project.budget)} ·{" "}
              {project.margin}% margin
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 p-5">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Scope creep
            </span>
            <span
              className={cn(
                "text-2xl font-semibold tabular-nums",
                project.scopeCreepPct > 5
                  ? "text-rose-600 dark:text-rose-400"
                  : project.scopeCreepPct > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400"
              )}
            >
              {project.scopeCreepPct}%
            </span>
            <span className="text-xs text-muted-foreground">
              Target: &lt;5% of project value
            </span>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Sprint board</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="mt-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock4 className="size-3.5" />
              {totalLogged}h logged · {totalEstimate}h estimated ·{" "}
              {completedTasks.length}/{project.tasks.length} tasks done
            </div>
            <Button variant="outline" size="sm">
              <CircleDashed className="size-4" />
              Add task
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
            {tasksByStatus.map((col) => (
              <div
                key={col.status}
                className="flex flex-col gap-2 rounded-lg border border-border/70 bg-muted/30 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-2.5 rounded-sm bg-gradient-to-br",
                        col.tone
                      )}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {col.label}
                    </span>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {col.tasks.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {col.tasks.length === 0 && (
                    <p className="rounded-md border border-dashed border-border/70 px-3 py-4 text-center text-xs text-muted-foreground">
                      No tasks
                    </p>
                  )}
                  {col.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Milestone billing</CardTitle>
              <p className="text-xs text-muted-foreground">
                Invoices generate automatically when a milestone is marked
                complete.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/70 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-md",
                        milestone.paid
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {milestone.paid ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <CircleDashed className="size-4" />
                      )}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-medium">
                        {milestone.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due {formatDate(milestone.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium tabular-nums">
                      {formatCurrency(milestone.amount)}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        milestone.paid
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-300",
                        "border-transparent"
                      )}
                    >
                      {milestone.paid ? "Paid" : "Awaiting completion"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team & contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.team.map((memberId) => {
                const person = personById(memberId);
                const isPm = memberId === project.pm;
                return (
                  <div
                    key={memberId}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border/70 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback
                          className={cn(
                            "bg-gradient-to-br text-xs text-white",
                            person.avatarColor
                          )}
                        >
                          {initials(person.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium">
                          {person.name}
                        </span>
                        <span className="text-xs capitalize text-muted-foreground">
                          {person.role} {isPm && "· Project lead"}
                        </span>
                      </div>
                    </div>
                    {person.utilization !== undefined && (
                      <div className="flex w-44 flex-col gap-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Utilization
                          </span>
                          <span className="font-medium tabular-nums">
                            {person.utilization}%
                          </span>
                        </div>
                        <Progress
                          value={person.utilization}
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-2">
                <span className="text-xs text-muted-foreground">
                  Showing all assigned members.
                </span>
                <div className="mt-2">
                  <TeamAvatars ids={project.team} max={8} size="default" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const assignee = personById(task.assignee);
  const progressPct = task.estimateHours
    ? Math.min(100, Math.round((task.loggedHours / task.estimateHours) * 100))
    : 0;
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border/70 bg-card p-3 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-snug">{task.title}</span>
        <Badge
          variant="outline"
          className={cn(
            "border-transparent capitalize",
            priorityStyles[task.priority]
          )}
        >
          {task.priority}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Avatar className="size-5">
            <AvatarFallback
              className={cn(
                "bg-gradient-to-br text-[10px] text-white",
                assignee.avatarColor
              )}
            >
              {initials(assignee.name)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{assignee.name}</span>
        </div>
        <span className="tabular-nums">
          {task.loggedHours}/{task.estimateHours}h
        </span>
      </div>
      <Progress value={progressPct} className="h-1" />
      <div className="flex justify-end">
        <TaskStatusBadge status={task.status} />
      </div>
    </div>
  );
}
