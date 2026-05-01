import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  ApprovalStatus,
  InvoiceStatus,
  LeadStage,
  ProjectStatus,
  TaskStatus,
} from "@/lib/types";

const projectStyles: Record<ProjectStatus, string> = {
  discovery: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-transparent",
  design:
    "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-transparent",
  build:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-transparent",
  uat: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-transparent",
  launched:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent",
  paused:
    "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-transparent",
};

const projectLabels: Record<ProjectStatus, string> = {
  discovery: "Discovery",
  design: "Design",
  build: "Build",
  uat: "UAT",
  launched: "Launched",
  paused: "Paused",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", projectStyles[status])}>
      {projectLabels[status]}
    </Badge>
  );
}

const stageStyles: Record<LeadStage, string> = {
  new: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-transparent",
  qualified:
    "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-transparent",
  proposal:
    "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-transparent",
  negotiation:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-transparent",
  won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent",
  lost: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-transparent",
};

const stageLabels: Record<LeadStage, string> = {
  new: "New",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export function LeadStageBadge({ stage }: { stage: LeadStage }) {
  return (
    <Badge variant="outline" className={cn("font-medium", stageStyles[stage])}>
      {stageLabels[stage]}
    </Badge>
  );
}

const invoiceStyles: Record<InvoiceStatus, string> = {
  draft: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-transparent",
  sent: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-transparent",
  paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent",
  overdue:
    "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-transparent",
};

const invoiceLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", invoiceStyles[status])}>
      {invoiceLabels[status]}
    </Badge>
  );
}

const approvalStyles: Record<ApprovalStatus, string> = {
  pending:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-transparent",
  approved:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent",
  changes_requested:
    "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-transparent",
};

const approvalLabels: Record<ApprovalStatus, string> = {
  pending: "Awaiting review",
  approved: "Approved",
  changes_requested: "Changes requested",
};

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", approvalStyles[status])}>
      {approvalLabels[status]}
    </Badge>
  );
}

const taskStyles: Record<TaskStatus, string> = {
  backlog:
    "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-transparent",
  in_progress:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-transparent",
  in_review:
    "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-transparent",
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-transparent",
};

const taskLabels: Record<TaskStatus, string> = {
  backlog: "Backlog",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", taskStyles[status])}>
      {taskLabels[status]}
    </Badge>
  );
}
