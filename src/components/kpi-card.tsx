import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type KpiTrend = "up" | "down" | "flat";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: KpiTrend;
  positiveIs?: "up" | "down";
  hint?: string;
}

export function KpiCard({
  label,
  value,
  delta,
  trend = "flat",
  positiveIs = "up",
  hint,
}: KpiCardProps) {
  const isPositive =
    trend === "flat"
      ? null
      : (trend === "up" && positiveIs === "up") ||
        (trend === "down" && positiveIs === "down");

  const Icon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-3 p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositive === null
                  ? "bg-muted text-muted-foreground"
                  : isPositive
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
              )}
            >
              <Icon className="size-3" />
              {delta}
            </span>
          )}
        </div>
        {hint && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </CardContent>
    </Card>
  );
}
