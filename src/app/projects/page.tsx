import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { BudgetAlertBadge } from "@/components/projects/budget-alert-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  budgetAlertLevel,
  budgetUsedPercent,
  formatUsdFromCents,
} from "@/lib/projects/budget";
import { MOCK_PROJECTS } from "@/lib/projects/mock-data";
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

export default function ProjectsPage() {
  return (
    <AppShell>
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Mock data — budget alerts at 80%, 100%, and 120% of approved budget.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {MOCK_PROJECTS.map((project) => {
          const level = budgetAlertLevel(project);
          const pct = budgetUsedPercent(project);
          return (
            <li key={project.id}>
              <Card className="h-full transition-shadow hover:ring-foreground/15">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-foreground underline-offset-4 hover:underline"
                      >
                        {project.name}
                      </Link>
                    </CardTitle>
                    <BudgetAlertBadge level={level} />
                  </div>
                  <p className="text-muted-foreground text-sm">{project.client}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {statusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Budget</dt>
                      <dd className="font-medium tabular-nums">
                        {formatUsdFromCents(project.budgetCents)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Actual</dt>
                      <dd className="font-medium tabular-nums">
                        {formatUsdFromCents(project.actualSpendCents)}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted-foreground">Used</dt>
                      <dd className="font-medium tabular-nums">
                        {pct.toFixed(1)}%
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
