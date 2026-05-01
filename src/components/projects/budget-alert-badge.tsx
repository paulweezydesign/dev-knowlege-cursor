import { Badge } from "@/components/ui/badge";
import type { BudgetAlertLevel } from "@/lib/projects/budget";
import { budgetAlertLabel } from "@/lib/projects/budget";

export function BudgetAlertBadge({ level }: { level: BudgetAlertLevel }) {
  if (level === "ok") {
    return (
      <Badge variant="secondary" className="shrink-0">
        {budgetAlertLabel(level)}
      </Badge>
    );
  }
  if (level === "warn_80") {
    return (
      <Badge
        variant="outline"
        className="shrink-0 border-amber-600/50 bg-amber-500/10 text-amber-900 dark:border-amber-500/40 dark:text-amber-100"
      >
        {budgetAlertLabel(level)}
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="shrink-0">
      {budgetAlertLabel(level)}
    </Badge>
  );
}
