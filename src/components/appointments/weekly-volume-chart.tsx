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
import { weeklyAppointments } from "@/lib/data";

type TooltipEntry = {
  name?: string;
  value?: number | string;
  dataKey?: string | number;
  color?: string;
};

function VolumeTooltip({
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
    <div className="min-w-[150px] rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={String(entry.dataKey)} className="flex items-center gap-2 text-[12px]">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="tabular ml-auto font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeeklyVolumeChart() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Weekly volume
          </CardTitle>
          <CardDescription className="text-[12px]">
            Completed vs. scheduled visits
          </CardDescription>
        </div>
        <span className="rounded-md bg-emerald-500/10 px-1.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
          +6.2%
        </span>
      </CardHeader>

      <CardContent className="px-3 pb-3 pt-4">
        <div className="h-[206px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyAppointments}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              barGap={3}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10.5 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={30}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10.5 }}
              />
              <Tooltip content={<VolumeTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar
                dataKey="scheduled"
                name="Scheduled"
                fill="var(--chart-2)"
                fillOpacity={0.35}
                radius={[4, 4, 0, 0]}
                barSize={9}
              />
              <Bar
                dataKey="completed"
                name="Completed"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
                barSize={9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-[var(--chart-1)]" />
            Completed
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-[var(--chart-2)] opacity-40" />
            Scheduled
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
