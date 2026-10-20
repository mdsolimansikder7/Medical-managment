"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
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
import { cn } from "@/lib/utils";
import { patientOverview } from "@/lib/data";

type TooltipEntry = {
  name?: string;
  value?: number | string;
  dataKey?: string | number;
  color?: string;
};

function OverviewTooltip({
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
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="tabular ml-auto font-semibold">
              {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ranges = ["7D", "6M", "1Y"];

export function PatientOverviewChart() {
  const [range, setRange] = React.useState("6M");

  const totalPatients = patientOverview.reduce((sum, item) => sum + item.patients, 0);
  const totalAppointments = patientOverview.reduce(
    (sum, item) => sum + item.appointments,
    0,
  );

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-col gap-4 border-b border-border/60 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Patient overview
          </CardTitle>
          <CardDescription className="text-[12px]">
            Admissions vs. appointments across the last six months
          </CardDescription>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
          {ranges.map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] font-semibold transition",
                range === item
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-4 pt-5">
        <div className="mb-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--chart-1)]" />
              <span className="text-[11.5px] font-medium text-muted-foreground">
                Patients
              </span>
            </div>
            <p className="tabular mt-1 text-lg font-semibold leading-none">
              {totalPatients.toLocaleString()}
              <span className="ml-2 align-middle text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                +12.4%
              </span>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--chart-2)]" />
              <span className="text-[11.5px] font-medium text-muted-foreground">
                Appointments
              </span>
            </div>
            <p className="tabular mt-1 text-lg font-semibold leading-none">
              {totalAppointments.toLocaleString()}
              <span className="ml-2 align-middle text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                +8.1%
              </span>
            </p>
          </div>
          <div className="ml-auto hidden items-center gap-1.5 rounded-lg border border-border/70 px-2.5 py-1.5 text-[11px] text-muted-foreground sm:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            Live data
          </div>
        </div>

        <div className="h-[248px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={patientOverview}
              margin={{ top: 6, right: 6, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={42}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                tickFormatter={(value: number) =>
                  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`
                }
              />
              <Tooltip content={<OverviewTooltip />} cursor={{ stroke: "var(--border)" }} />
              <Area
                type="monotone"
                dataKey="patients"
                name="Patients"
                stroke="var(--chart-1)"
                strokeWidth={2.4}
                fill="url(#fillPatients)"
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
              />
              <Area
                type="monotone"
                dataKey="appointments"
                name="Appointments"
                stroke="var(--chart-2)"
                strokeWidth={2.4}
                fill="url(#fillAppointments)"
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
