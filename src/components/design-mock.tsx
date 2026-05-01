import { cn } from "@/lib/utils";

interface DesignMockProps {
  variant: string;
  className?: string;
  showPins?: { x: number; y: number; index: number }[];
}

export function DesignMock({ variant, className, showPins }: DesignMockProps) {
  const variants: Record<string, React.ReactElement> = {
    "northwind-hero": <NorthwindHero />,
    "helio-empty": <HelioEmpty />,
    "civica-upload": <CivicaUpload />,
  };

  const content = variants[variant] ?? variants["northwind-hero"];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/60 bg-white",
        className
      )}
    >
      {content}
      {showPins?.map((pin) => (
        <div
          key={pin.index}
          className="absolute z-10 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fuchsia-600 text-xs font-semibold text-white shadow-lg ring-2 ring-white"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          aria-label={`Comment pin ${pin.index}`}
        >
          {pin.index}
        </div>
      ))}
    </div>
  );
}

function NorthwindHero() {
  return (
    <div className="aspect-[16/10] w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-amber-700 to-orange-800" />
            <span className="text-sm font-semibold text-stone-800">
              Northwind
            </span>
          </div>
          <div className="hidden items-center gap-4 text-xs text-stone-600 sm:flex">
            <span>Roastery</span>
            <span>Beans</span>
            <span>Cafés</span>
            <span>Journal</span>
          </div>
          <div className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-medium text-white">
            Shop
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
            Spring 2026 Single Origin
          </span>
          <h2 className="max-w-md text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
            Beans grown by hand. Roasted with patience.
          </h2>
          <p className="max-w-sm text-sm text-stone-700">
            From the misty hills of Yirgacheffe to your morning ritual — meet the
            farmers behind every cup.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <div className="rounded-md bg-amber-700 px-3 py-2 text-xs font-medium text-white">
              Shop spring lineup
            </div>
            <div className="rounded-md border border-amber-700/40 px-3 py-2 text-xs font-medium text-amber-900">
              Read the journal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelioEmpty() {
  return (
    <div className="aspect-[16/10] w-full bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="flex h-full flex-col gap-4 p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-900">
            Helio Health
          </span>
          <div className="size-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
        </div>
        <div className="my-auto flex flex-col items-center gap-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15">
            <div className="size-9 rounded-full border-2 border-dashed border-emerald-600/60" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-950">
            No upcoming appointments
          </h3>
          <p className="max-w-xs text-sm text-emerald-900/70">
            When you book a visit or your provider schedules one, you&apos;ll see
            it here.
          </p>
          <div className="rounded-md bg-emerald-700 px-3 py-2 text-xs font-medium text-white">
            Schedule a visit
          </div>
        </div>
      </div>
    </div>
  );
}

function CivicaUpload() {
  return (
    <div className="aspect-[16/10] w-full bg-slate-100">
      <div className="flex h-full flex-col gap-4 p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-800">
            Permits portal
          </span>
          <span className="text-xs text-slate-500">Step 3 of 5</span>
        </div>
        <div className="m-auto w-full max-w-md rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-sm font-semibold text-slate-900">
              Upload supporting documents
            </span>
            <div className="size-5 rounded-full bg-slate-200" />
          </div>
          <div className="mt-3 flex h-32 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-center">
            <span className="text-sm font-medium text-slate-700">
              Drop files or browse
            </span>
            <span className="text-xs text-slate-500">PDF, JPG, PNG</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>0 of 3 required</span>
            <span>Auto-saved 2 min ago</span>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <div className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700">
              Back
            </div>
            <div className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
