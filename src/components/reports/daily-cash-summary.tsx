import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  HandCoins,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { cn, formatCompactCurrency } from "@/lib/utils";

const cells: {
  label: string;
  value: number;
  meta: string;
  icon: LucideIcon;
  tone: string;
  trend: "up" | "down" | "neutral";
}[] = [
  {
    label: "Collected today",
    value: 86400,
    meta: "142 transactions · all counters",
    icon: HandCoins,
    tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    trend: "up",
  },
  {
    label: "Expenses today",
    value: 15600,
    meta: "Supplies ৳12.4K · Utilities ৳3.2K",
    icon: Wallet,
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    trend: "down",
  },
  {
    label: "Net cash",
    value: 70800,
    meta: "81.9% of collections retained",
    icon: HandCoins,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    trend: "up",
  },
  {
    label: "Awaiting collection",
    value: 24300,
    meta: "9 invoices · 3 overdue",
    icon: Clock3,
    tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    trend: "neutral",
  },
];

export function DailyCashSummary() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-2 border-b border-border/60 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold tracking-tight">Daily cash summary</p>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            Tue, Oct 20
          </span>
        </div>
        <p className="text-[10.5px] text-muted-foreground">
          Shift closes at 09:00 PM · auto-reconciled
        </p>
      </div>

      <div className="grid divide-y divide-border/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {cells.map((cell) => {
          const Icon = cell.icon;

          return (
            <div key={cell.label} className="flex items-start gap-3 px-5 py-4">
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", cell.tone)}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground">{cell.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="tabular text-[18px] font-semibold leading-tight tracking-tight">
                    {formatCompactCurrency(cell.value)}
                  </p>
                  {cell.trend === "up" && (
                    <ArrowUpRight className="size-3.5 text-emerald-500" />
                  )}
                  {cell.trend === "down" && (
                    <ArrowDownRight className="size-3.5 text-amber-500" />
                  )}
                </div>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{cell.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
