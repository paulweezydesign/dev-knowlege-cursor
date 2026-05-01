import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ProjectStatusBadge } from "@/components/status-badge";
import { TeamAvatars } from "@/components/team-avatars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { clientById, projects } from "@/lib/data";
import {
  formatCompactCurrency,
  formatDate,
  initials,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Delivery"
        title="Projects"
        description="Sprints, budgets, and milestones across the studio."
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            New project
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const client = clientById(project.clientId);
          const burnPct = Math.round((project.spent / project.budget) * 100);
          const overBudget = burnPct >= 100;
          const warning = burnPct >= 80;

          return (
            <Card key={project.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback
                      className={cn(
                        "bg-gradient-to-br text-xs text-white",
                        client?.logoColor ?? "from-zinc-400 to-zinc-600"
                      )}
                    >
                      {initials(project.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-sm font-semibold leading-tight hover:underline"
                      >
                        {project.name}
                      </Link>
                      <ProjectStatusBadge status={project.status} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {client?.name} · {client?.industry}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {project.progress}% complete
                    </span>
                    <span className="text-muted-foreground">
                      Targets {formatDate(project.targetDate)}
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex flex-col rounded-md bg-muted/40 px-2.5 py-2">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Budget
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCompactCurrency(project.budget)}
                    </span>
                  </div>
                  <div className="flex flex-col rounded-md bg-muted/40 px-2.5 py-2">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Spent
                    </span>
                    <span
                      className={cn(
                        "font-medium tabular-nums",
                        overBudget && "text-rose-600 dark:text-rose-400",
                        !overBudget &&
                          warning &&
                          "text-amber-600 dark:text-amber-400"
                      )}
                    >
                      {formatCompactCurrency(project.spent)}
                    </span>
                  </div>
                  <div className="flex flex-col rounded-md bg-muted/40 px-2.5 py-2">
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Margin
                    </span>
                    <span className="font-medium tabular-nums">
                      {project.margin}%
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                  <TeamAvatars ids={project.team} />
                  <Link
                    href={`/projects/${project.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" })
                    )}
                  >
                    Open <ArrowRight className="size-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
