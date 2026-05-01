import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BudgetAlertBadge } from "@/components/projects/budget-alert-badge";
import { BudgetBar } from "@/components/projects/budget-bar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  budgetAlertCopy,
  budgetAlertLevel,
  budgetUsedPercent,
  formatUsdFromCents,
} from "@/lib/projects/budget";
import { cn } from "@/lib/utils";
import { getProjectById } from "@/lib/projects/mock-data";
import type { ProjectStatus } from "@/lib/projects/types";

function statusBadge(status: ProjectStatus) {
  switch (status) {
    case "active":
      return <Badge variant="secondary">Active</Badge>;
    case "on_hold":
      return <Badge variant="outline">On hold</Badge>;
    case "completed":
      return <Badge variant="ghost">Completed</Badge>;
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const level = budgetAlertLevel(project);
  const pct = budgetUsedPercent(project);
  const remaining = project.budgetCents - project.actualSpendCents;
  const alertTone =
    level === "ok"
      ? "border-border bg-muted/40"
      : level === "warn_80"
        ? "border-amber-600/40 bg-amber-500/10 dark:border-amber-500/30"
        : "border-destructive/40 bg-destructive/10";

  return (
    <AppShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "-ml-2 mb-1 inline-flex w-fit"
            )}
          >
            ← All projects
          </Link>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">{project.client}</p>
          <div className="mt-2">{statusBadge(project.status)}</div>
        </div>
        <BudgetAlertBadge level={level} />
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-base">Budget vs. actual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div
            className={`rounded-xl border p-4 text-sm ${alertTone}`}
            role="status"
          >
            <p className="font-medium">Alert</p>
            <p className="mt-1 text-muted-foreground">{budgetAlertCopy(level)}</p>
          </div>

          <BudgetBar percent={pct} />

          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                Approved budget
              </dt>
              <dd className="mt-1 font-semibold text-lg tabular-nums tracking-tight">
                {formatUsdFromCents(project.budgetCents)}
              </dd>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                Actual spend
              </dt>
              <dd className="mt-1 font-semibold text-lg tabular-nums tracking-tight">
                {formatUsdFromCents(project.actualSpendCents)}
              </dd>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                Remaining
              </dt>
              <dd
                className={`mt-1 font-semibold text-lg tabular-nums tracking-tight ${remaining < 0 ? "text-destructive" : ""}`}
              >
                {formatUsdFromCents(remaining)}
              </dd>
            </div>
          </dl>

          <p className="text-center text-muted-foreground text-xs">
            Thresholds: 80% warning · 100% over budget · 120% escalation (per
            AgencyOS spec).
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
