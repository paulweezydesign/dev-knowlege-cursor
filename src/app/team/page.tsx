import { UserPlus } from "lucide-react";

import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { projects, team } from "@/lib/data";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const roleLabels = {
  owner: "Owner",
  pm: "Project Manager",
  designer: "Designer",
  engineer: "Engineer",
  qa: "QA",
  finance: "Finance",
  client: "Client",
} as const;

export default function TeamPage() {
  const avgUtilization = Math.round(
    team.reduce((s, p) => s + (p.utilization ?? 0), 0) / team.length
  );
  const overallocated = team.filter((p) => (p.utilization ?? 0) >= 90).length;
  const underutilized = team.filter((p) => (p.utilization ?? 0) < 60).length;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Resourcing"
        title="Team"
        description="Capacity, utilization, and active project assignments."
        actions={
          <Button size="sm">
            <UserPlus className="size-4" />
            Invite member
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label="Average utilization"
          value={`${avgUtilization}%`}
          hint="Optimal range: 75–85%"
        />
        <KpiCard
          label="Overallocated"
          value={String(overallocated)}
          hint=">90% utilization"
        />
        <KpiCard
          label="Underutilized"
          value={String(underutilized)}
          hint="<60% utilization"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team capacity</CardTitle>
          <p className="text-xs text-muted-foreground">
            Current week. Drag tasks in the sprint board to rebalance.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {team.map((person) => {
            const utilization = person.utilization ?? 0;
            const projectsOn = projects
              .filter((p) => p.team.includes(person.id))
              .map((p) => p.name);
            const tone =
              utilization >= 90
                ? "text-rose-600 dark:text-rose-400"
                : utilization >= 75
                  ? "text-emerald-600 dark:text-emerald-400"
                  : utilization >= 60
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground";

            return (
              <div
                key={person.id}
                className="grid grid-cols-1 items-center gap-4 rounded-lg border border-border/70 p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,2fr)]"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
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
                    <span className="text-sm font-medium">{person.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {roleLabels[person.role as keyof typeof roleLabels]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className={cn("font-semibold tabular-nums", tone)}>
                      {utilization}%
                    </span>
                  </div>
                  <Progress value={utilization} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {projectsOn.length === 0 ? (
                    <span className="text-xs text-muted-foreground">
                      No active assignments
                    </span>
                  ) : (
                    projectsOn.map((name) => (
                      <Badge
                        key={name}
                        variant="outline"
                        className="border-transparent bg-muted/60"
                      >
                        {name}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
