import Link from "next/link";
import { ArrowRight, CalendarClock, CircleAlert, FileSignature } from "lucide-react";

import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import {
  ApprovalStatusBadge,
  InvoiceStatusBadge,
  ProjectStatusBadge,
} from "@/components/status-badge";
import { TeamAvatars } from "@/components/team-avatars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  clientById,
  clients,
  designReviews,
  invoices,
  kpis,
  projects,
} from "@/lib/data";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  initials,
} from "@/lib/format";

export default function DashboardPage() {
  const activeProjects = projects.filter((p) => p.status !== "launched").slice(0, 4);
  const pendingReviews = designReviews
    .filter((r) => r.status !== "approved")
    .slice(0, 3);
  const recentInvoices = [...invoices]
    .sort((a, b) => (b.issuedDate > a.issuedDate ? 1 : -1))
    .slice(0, 5);
  const upcomingMilestones = projects
    .flatMap((p) =>
      p.milestones
        .filter((m) => !m.paid)
        .map((m) => ({ project: p, milestone: m }))
    )
    .sort((a, b) =>
      a.milestone.dueDate < b.milestone.dueDate ? -1 : 1
    )
    .slice(0, 4);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Workspace overview"
        title="Good morning, Maya"
        description="Here's how Northwind Studio is delivering this week."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export weekly report
            </Button>
            <Button size="sm">
              <FileSignature className="size-4" />
              Send proposal
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Approval cycle"
          value={`${kpis.approvalCycleDays}d`}
          delta="-0.6d"
          trend="down"
          positiveIs="down"
          hint="Target: <3d (p50)"
        />
        <KpiCard
          label="Scope creep"
          value={`${kpis.scopeCreepPct}%`}
          delta="+0.8%"
          trend="up"
          positiveIs="down"
          hint="Target: <5% of project value"
        />
        <KpiCard
          label="On-time milestones"
          value={`${kpis.onTimeMilestonesPct}%`}
          delta="+3%"
          trend="up"
          hint="Target: >90% delivery rate"
        />
        <KpiCard
          label="Days sales outstanding"
          value={`${kpis.daysSalesOutstanding}d`}
          delta="-2d"
          trend="down"
          positiveIs="down"
          hint="Target: <25 days"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Active projects"
          value={String(kpis.activeProjects)}
          hint={`Across ${clients.filter((c) => c.stage === "won").length} clients`}
        />
        <KpiCard
          label="Utilization"
          value={`${kpis.utilizationPct}%`}
          delta="+4%"
          trend="up"
          hint="Optimal range: 75–85%"
        />
        <KpiCard
          label="Project margin"
          value={`${kpis.marginPct}%`}
          delta="-1.5%"
          trend="down"
          positiveIs="up"
          hint="Blended across portfolio"
        />
        <KpiCard
          label="Outstanding A/R"
          value={formatCompactCurrency(kpis.outstandingAR)}
          hint="Awaiting payment"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">Active projects</CardTitle>
              <p className="text-xs text-muted-foreground">
                Live work pulled from the delivery pipeline.
              </p>
            </div>
            <Link
              href="/projects"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeProjects.map((project) => {
              const client = clientById(project.clientId);
              const burnPct = Math.round((project.spent / project.budget) * 100);
              const overBudget = burnPct >= 100;
              return (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="group flex flex-col gap-3 rounded-lg border border-border/70 bg-card p-4 transition-colors hover:border-border hover:bg-accent/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {project.name}
                        </span>
                        <ProjectStatusBadge status={project.status} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {client?.name} · PM{" "}
                        {project.team.length > 0 ? "team of" : "lead by"}{" "}
                        {project.team.length || 1}
                      </span>
                    </div>
                    <TeamAvatars ids={project.team} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.progress}% complete</span>
                      <span
                        className={
                          overBudget
                            ? "text-rose-600 dark:text-rose-400"
                            : burnPct > 80
                              ? "text-amber-600 dark:text-amber-400"
                              : ""
                        }
                      >
                        {formatCompactCurrency(project.spent)} /{" "}
                        {formatCompactCurrency(project.budget)}
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Pending design reviews</CardTitle>
            <Link
              href="/design-review"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Open <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-3 rounded-lg border border-border/70 p-3"
              >
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-pink-500 text-white"
                  aria-hidden
                >
                  <CircleAlert className="size-4" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-tight">
                      {review.title}
                    </span>
                    <ApprovalStatusBadge status={review.status} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    v{review.version} · due {formatDate(review.dueDate)} ·{" "}
                    {review.comments.filter((c) => !c.resolved).length} open
                    notes
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Recent invoices</CardTitle>
            <Link
              href="/invoices"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice) => {
                  const client = clientById(invoice.clientId);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-xs">
                        {invoice.number}
                      </TableCell>
                      <TableCell className="text-sm">{client?.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatDate(invoice.issuedDate)}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <InvoiceStatusBadge status={invoice.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upcoming milestones</CardTitle>
            <p className="text-xs text-muted-foreground">
              Billing-eligible deliverables in the next 30 days.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMilestones.map(({ project, milestone }) => (
              <div
                key={milestone.id}
                className="flex items-start gap-3 rounded-lg border border-border/70 p-3"
              >
                <Avatar className="size-9">
                  <AvatarFallback className="bg-gradient-to-br from-sky-500 to-cyan-500 text-xs text-white">
                    {initials(project.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium leading-tight">
                    {milestone.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.name}
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <CalendarClock className="size-3" />
                      {formatDate(milestone.dueDate)}
                    </Badge>
                    <span className="text-xs font-medium tabular-nums">
                      {formatCurrency(milestone.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
