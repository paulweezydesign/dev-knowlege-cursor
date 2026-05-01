import {
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CircleAlert,
  Clock3,
  GitBranch,
  Receipt,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metrics = [
  {
    label: "Open approvals",
    value: "14",
    change: "Median turnaround 2.1 days",
  },
  {
    label: "Revenue at risk",
    value: "$48.2k",
    change: "3 change requests awaiting sign-off",
  },
  {
    label: "Active engagements",
    value: "9",
    change: "6 on track, 2 watchlist, 1 blocked",
  },
  {
    label: "Unbilled this week",
    value: "18h",
    change: "Budget guardrail triggered on 2 projects",
  },
] as const;

const priorities = [
  {
    title: "Nexa redesign needs client sign-off",
    detail: "Homepage and pricing flows are in final review with a 5pm stakeholder deadline.",
    owner: "Mina • PM",
    status: "Needs approval",
  },
  {
    title: "Orbit sprint budget crossed 80%",
    detail: "Engineering burn is ahead of plan after three extra QA cycles on the checkout API.",
    owner: "Chris • Finance",
    status: "Budget watch",
  },
  {
    title: "Harbor launch branch is ready for UAT",
    detail: "Preview environment is stable; QA wants client reviewers assigned before handoff.",
    owner: "Luis • QA",
    status: "Ready for handoff",
  },
] as const;

const pipeline = [
  {
    client: "Nexa Health",
    phase: "Design review",
    budget: "$62k fixed fee",
    scope: "2 unresolved comment threads",
  },
  {
    client: "Orbit Capital",
    phase: "Development sprint 4",
    budget: "$118k retainer",
    scope: "Change request pending impact review",
  },
  {
    client: "Harbor Commerce",
    phase: "UAT coordination",
    budget: "$34k milestone",
    scope: "Release checklist 92% complete",
  },
] as const;

const deliveryRadar = [
  {
    label: "Scope creep exposure",
    value: "4.7%",
    note: "Below the <5% target, but Orbit is trending upward.",
  },
  {
    label: "On-time milestones",
    value: "91%",
    note: "Two delivery dates moved this month; both have approved client change orders.",
  },
  {
    label: "Average DSO",
    value: "23 days",
    note: "Automated deposit and milestone reminders are holding collections inside target.",
  },
] as const;

const automations = [
  {
    name: "Figma sync",
    status: "Healthy",
    detail: "12 files mirrored in the last hour",
  },
  {
    name: "GitHub previews",
    status: "Attention",
    detail: "1 failed preview build on harbor-web",
  },
  {
    name: "Invoice automation",
    status: "Healthy",
    detail: "3 milestone invoices issued today",
  },
  {
    name: "Slack alerts",
    status: "Healthy",
    detail: "Budget and approval digests delivered",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 lg:py-10">
        <section className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col gap-8 px-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="flex max-w-3xl flex-col gap-4">
              <Badge variant="outline" className="gap-1">
                <Sparkles />
                Digital agency operations
              </Badge>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  AgencyOS
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  AgencyOS command center
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Keep client delivery, approvals, budget guardrails, and automation health in one operating view built for high-touch agency work.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button>
                <BellRing data-icon="inline-start" />
                Review approvals
              </Button>
              <Button variant="outline">
                Open workspace map
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>

        <section aria-label="Key metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </CardTitle>
                  <CardDescription>{metric.change}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex flex-col gap-2 border-b">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl">Today&apos;s priorities</CardTitle>
                    <CardDescription>
                      Immediate actions linked to scope control, approvals, and handoffs.
                    </CardDescription>
                  </div>
                  <Badge variant="outline">3 actions</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {priorities.map((priority) => (
                  <article
                    key={priority.title}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-medium">{priority.title}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">{priority.detail}</p>
                      </div>
                      <Badge variant="outline">{priority.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {priority.owner}
                      </p>
                      <Button variant="ghost" size="sm">
                        Open item
                        <ArrowRight data-icon="inline-end" />
                      </Button>
                    </div>
                  </article>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-2 border-b">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="text-muted-foreground" />
                  <CardTitle className="text-xl">Pipeline at a glance</CardTitle>
                </div>
                <CardDescription>
                  Active client engagements spanning design review, development, and UAT.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 pt-4 md:grid-cols-3">
                {pipeline.map((project) => (
                  <article
                    key={project.client}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary">{project.phase}</Badge>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-medium">{project.client}</h3>
                        <p className="text-sm text-muted-foreground">{project.budget}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{project.scope}</p>
                    <Button variant="outline" size="sm">
                      Open workspace
                    </Button>
                  </article>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex flex-col gap-2 border-b">
                <div className="flex items-center gap-2">
                  <CircleAlert className="text-muted-foreground" />
                  <CardTitle className="text-xl">Delivery radar</CardTitle>
                </div>
                <CardDescription>
                  KPI snapshots aligned to the spec&apos;s delivery, billing, and scope targets.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {deliveryRadar.map((item) => (
                  <article
                    key={item.label}
                    className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-medium text-muted-foreground">{item.label}</h3>
                      <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
                  </article>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-2 border-b">
                <div className="flex items-center gap-2">
                  <GitBranch className="text-muted-foreground" />
                  <CardTitle className="text-xl">Automation health</CardTitle>
                </div>
                <CardDescription>
                  Cross-tool integrations covering design sync, previews, invoicing, and alerting.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-4">
                {automations.map((automation) => (
                  <article
                    key={automation.name}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
                  >
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                      {automation.name === "Invoice automation" ? (
                        <Receipt className="size-4 text-muted-foreground" />
                      ) : automation.name === "Slack alerts" ? (
                        <BellRing className="size-4 text-muted-foreground" />
                      ) : automation.name === "GitHub previews" ? (
                        <GitBranch className="size-4 text-muted-foreground" />
                      ) : (
                        <Clock3 className="size-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-medium">{automation.name}</h3>
                        <Badge
                          variant={
                            automation.status === "Healthy" ? "secondary" : "outline"
                          }
                        >
                          {automation.status}
                        </Badge>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{automation.detail}</p>
                    </div>
                  </article>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
