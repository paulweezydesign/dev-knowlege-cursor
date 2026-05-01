import { Plus } from "lucide-react";

import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { InvoiceStatusBadge } from "@/components/status-badge";
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
import { clientById, invoices, projectById } from "@/lib/data";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  initials,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export default function InvoicesPage() {
  const totals = invoices.reduce(
    (acc, inv) => {
      acc[inv.status] = (acc[inv.status] ?? 0) + inv.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalCollected = totals.paid ?? 0;
  const outstanding = (totals.sent ?? 0) + (totals.overdue ?? 0);
  const overdue = totals.overdue ?? 0;
  const draft = totals.draft ?? 0;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="Finance"
        title="Invoices"
        description="Milestone-based billing synced with Stripe and your accounting system."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New invoice
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Collected (YTD)"
          value={formatCompactCurrency(totalCollected)}
          delta="+12%"
          trend="up"
        />
        <KpiCard
          label="Outstanding A/R"
          value={formatCompactCurrency(outstanding)}
          hint={`${invoices.filter((i) => i.status === "sent" || i.status === "overdue").length} open invoices`}
        />
        <KpiCard
          label="Overdue"
          value={formatCompactCurrency(overdue)}
          delta="-$8K"
          trend="down"
          positiveIs="down"
          hint="Auto-dunning at 3/7/14 days"
        />
        <KpiCard
          label="In draft"
          value={formatCompactCurrency(draft)}
          hint="Pending milestone completion"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All invoices</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const client = clientById(invoice.clientId);
                const project = projectById(invoice.projectId);
                const isOverdue = invoice.status === "overdue";
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs">
                      {invoice.number}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarFallback
                            className={cn(
                              "bg-gradient-to-br text-[10px] text-white",
                              client?.logoColor
                            )}
                          >
                            {initials(client?.name ?? "")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {client?.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {project?.name}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(invoice.issuedDate)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-xs",
                        isOverdue
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatDate(invoice.dueDate)}
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
    </div>
  );
}
