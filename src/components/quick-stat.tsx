import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { accents, cn, type Accent } from "@/lib/utils";

export function QuickStat({
  label,
  value,
  hint,
  icon: Icon,
  accent = "teal",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: Accent;
  className?: string;
}) {
  const tone = accents[accent];

  return (
    <div
      className={cn(
        "flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card p-4 shadow-[0_1px_2px_rgba(16,24,40,0.03)]",
        className,
      )}
    >
      <div
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
          tone.soft,
          tone.text,
          tone.ring,
        )}
      >
        <Icon className="size-[18px]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-medium text-muted-foreground">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p className="tabular text-xl font-semibold leading-tight tracking-tight">
            {value}
          </p>
          {hint && (
            <span className="truncate text-[10.5px] text-muted-foreground">{hint}</span>
          )}
        </div>
      </div>
    </div>
  );
}
