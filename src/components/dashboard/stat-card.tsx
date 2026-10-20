import * as React from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { accents, cn, type Accent } from "@/lib/utils";

function Sparkline({
  data,
  id,
  className,
}: {
  data: number[];
  id: string;
  className?: string;
}) {
  const width = 96;
  const height = 36;
  const pad = 3;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - pad - ((value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-8 w-16 overflow-visible", className)}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline
        points={line}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r="2.2"
        fill="currentColor"
        stroke="var(--card)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  accent = "teal",
  trend = "up",
  data,
  sparkId,
}: {
  label: string;
  value: string;
  delta: string;
  hint: string;
  icon: LucideIcon;
  accent?: Accent;
  trend?: "up" | "down";
  data: number[];
  sparkId: string;
}) {
  const tone = accents[accent];
  const positive = trend === "up";

  return (
    <Card className="group relative overflow-hidden gap-0 rounded-2xl border-border/70 bg-card py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.2)]">
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-10 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          tone.soft,
        )}
      />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <p className="truncate text-[12.5px] font-medium text-muted-foreground">
              {label}
            </p>
            <p className="tabular text-[27px] font-semibold leading-none tracking-tight">
              {value}
            </p>
          </div>
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
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
                positive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3" />
              ) : (
                <ArrowDownRight className="size-3" />
              )}
              {delta}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">{hint}</span>
          </div>
          <Sparkline data={data} id={sparkId} className={tone.text} />
        </div>
      </CardContent>
    </Card>
  );
}
