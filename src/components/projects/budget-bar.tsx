import { cn } from "@/lib/utils";

const MARKERS = [80, 100, 120] as const;

export function BudgetBar({ percent }: { percent: number }) {
  const cappedVisual = Math.min(percent, 130);
  const widthPct = Math.min(100, (cappedVisual / 130) * 100);

  return (
    <div className="space-y-2">
      <div
        className="relative h-3 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Budget used ${percent.toFixed(1)} percent`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            percent >= 120
              ? "bg-destructive"
              : percent >= 100
                ? "bg-destructive/80"
                : percent >= 80
                  ? "bg-amber-600 dark:bg-amber-500"
                  : "bg-primary"
          )}
          style={{ width: `${widthPct}%` }}
        />
        {MARKERS.map((m) => (
          <span
            key={m}
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-foreground/25"
            style={{ left: `${(m / 130) * 100}%` }}
            aria-hidden
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>0%</span>
        <span className="text-amber-700 dark:text-amber-400">80% threshold</span>
        <span className="text-destructive/90">100% / 120%</span>
      </div>
    </div>
  );
}
