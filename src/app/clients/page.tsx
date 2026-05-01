import { Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { LeadStageBadge } from "@/components/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clients, projects } from "@/lib/data";
import { formatCompactCurrency, initials } from "@/lib/format";
import type { LeadStage } from "@/lib/types";
import { cn } from "@/lib/utils";

const PIPELINE_STAGES: LeadStage[] = [
  "new",
  "qualified",
  "proposal",
  "negotiation",
  "won",
];

const stageLabels: Record<LeadStage, string> = {
  new: "New",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const healthLabel: Record<"green" | "yellow" | "red", string> = {
  green: "Healthy",
  yellow: "Watch",
  red: "At risk",
};

const healthClasses: Record<"green" | "yellow" | "red", string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-rose-500",
};

export default function ClientsPage() {
  const totalArr = clients.reduce((s, c) => s + c.arr, 0);
  const stageCounts = PIPELINE_STAGES.map((stage) => ({
    stage,
    clients: clients.filter((c) => c.stage === stage),
  }));

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="CRM"
        title="Clients"
        description="Lead capture, qualification, and active accounts in one place."
        actions={
          <>
            <Button variant="outline" size="sm">
              Import CSV
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New lead
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pipeline</CardTitle>
          <p className="text-xs text-muted-foreground">
            {clients.length} accounts · {formatCompactCurrency(totalArr)} ARR
            won this year
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {stageCounts.map(({ stage, clients: stageClients }) => (
              <div
                key={stage}
                className="flex flex-col gap-2 rounded-lg border border-border/70 bg-card p-3"
              >
                <div className="flex items-center justify-between">
                  <LeadStageBadge stage={stage} />
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {stageClients.length}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {stageClients.length === 0 && (
                    <p className="text-xs text-muted-foreground">No clients.</p>
                  )}
                  {stageClients.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 rounded-md bg-muted/40 px-2 py-1.5"
                    >
                      <Avatar className="size-6">
                        <AvatarFallback
                          className={cn(
                            "bg-gradient-to-br text-[10px] text-white",
                            c.logoColor
                          )}
                        >
                          {initials(c.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs font-medium">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All accounts</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Primary contact</TableHead>
                <TableHead>Active projects</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right">ARR</TableHead>
                <TableHead className="text-right">Last touch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => {
                const activeCount = projects.filter(
                  (p) =>
                    p.clientId === client.id && p.status !== "launched"
                ).length;
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback
                            className={cn(
                              "bg-gradient-to-br text-xs text-white",
                              client.logoColor
                            )}
                          >
                            {initials(client.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-medium">
                            {client.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {client.industry}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <LeadStageBadge stage={client.stage} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm">{client.primaryContact}</span>
                        <span className="text-xs text-muted-foreground">
                          {client.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">
                      {activeCount}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            healthClasses[client.health]
                          )}
                        />
                        <span className="text-xs text-muted-foreground">
                          {healthLabel[client.health]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      {client.arr > 0
                        ? formatCompactCurrency(client.arr)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {client.lastTouch}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <p className="px-6 py-3 text-xs text-muted-foreground">
            Stages from spec: new → qualified → proposal → negotiation → won/lost.
            <span className="ml-1 hidden md:inline">
              {stageLabels[stageCounts[0].stage]} accounts auto-promote on form
              submission with score ≥ 70.
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
