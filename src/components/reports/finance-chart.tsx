"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { financeTrend } from "@/lib/data";
import { formatCompactCurrency, formatCurrency } from "@/lib/utils";

type TooltipEntry = {
  name?: string;
  value?: number | string;
  dataKey?: string | number;
  color?: string;
};

function FinanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[170px] rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label} 2026
      </p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={String(entry.dataKey)} className="flex items-center gap-2 text-[12px]">
            <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="tabular ml-auto font-semibold">
              {formatCurrency(Number(entry.value ?? 0))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinanceChart() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Income vs expense
          </CardTitle>
          <CardDescription className="text-[12px]">Last six months · all departments</CardDescription>
        </div>
        <span className="rounded-md bg-emerald-500/10 px-1.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
          +11.5%
        </span>
      </CardHeader>

      <CardContent className="px-3 pb-4 pt-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financeTrend} margin={{ top: 4, right: 8, left: -8, bottom: 0 }} barGap={4}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10.5 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={42}
                tickFormatter={(value: number) => formatCompactCurrency(value)}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10.5 }}
              />
              <Tooltip content={<FinanceTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar
                dataKey="income"
                name="Income"
                fill="var(--chart-1)"
                radius={[5, 5, 0, 0]}
                barSize={14}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="var(--muted-foreground)"
                fillOpacity={0.25}
                radius={[5, 5, 0, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-[var(--chart-1)]" />
            Income
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            Expense
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
