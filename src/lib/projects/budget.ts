import type { Project } from "./types";

export type BudgetAlertLevel = "ok" | "warn_80" | "danger_100" | "over_120";

const THRESHOLDS = {
  warn: 80,
  danger: 100,
  over: 120,
} as const;

export function budgetUsedPercent(project: Project): number {
  if (project.budgetCents <= 0) return 0;
  return (project.actualSpendCents / project.budgetCents) * 100;
}

export function budgetAlertLevel(project: Project): BudgetAlertLevel {
  const pct = budgetUsedPercent(project);
  if (pct >= THRESHOLDS.over) return "over_120";
  if (pct >= THRESHOLDS.danger) return "danger_100";
  if (pct >= THRESHOLDS.warn) return "warn_80";
  return "ok";
}

export function formatUsdFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function budgetAlertCopy(level: BudgetAlertLevel): string {
  switch (level) {
    case "ok":
      return "Spend is within expected range.";
    case "warn_80":
      return "Budget at or above 80% — review scope and upcoming work.";
    case "danger_100":
      return "Budget at or above 100% — pause or approve overage before new work.";
    case "over_120":
      return "Budget at or above 120% — escalation required; align with client on change orders.";
    default: {
      const _exhaustive: never = level;
      return _exhaustive;
    }
  }
}

export function budgetAlertLabel(level: BudgetAlertLevel): string {
  switch (level) {
    case "ok":
      return "On track";
    case "warn_80":
      return "≥80%";
    case "danger_100":
      return "≥100%";
    case "over_120":
      return "≥120%";
    default: {
      const _exhaustive: never = level;
      return _exhaustive;
    }
  }
}
