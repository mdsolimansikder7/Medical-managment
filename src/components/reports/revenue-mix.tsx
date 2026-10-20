"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/utils";

const mix = [
  { name: "Consultations", value: 539000, share: 42, color: "var(--chart-1)" },
  { name: "Pharmacy", value: 334000, share: 26, color: "var(--chart-2)" },
  { name: "Lab & imaging", value: 308000, share: 24, color: "var(--chart-3)" },
  { name: "Other services", value: 103500, share: 8, color: "var(--chart-4)" },
];

export function RevenueMix() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">Revenue mix</CardTitle>
        <CardDescription className="text-[12px]">October 2026 · by service line</CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-3">
        <div className="relative h-[172px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mix}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={74}
                paddingAngle={4}
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {mix.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0]?.payload as (typeof mix)[number];
                  return (
                    <div className="rounded-lg border border-border/80 bg-popover/95 px-2.5 py-1.5 shadow-lg">
                      <p className="text-[11px] font-semibold">{item.name}</p>
                      <p className="tabular text-[10.5px] text-muted-foreground">
                        {formatCompactCurrency(item.value)} · {item.share}%
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="tabular text-[16px] font-semibold leading-tight">
                {formatCompactCurrency(1284500)}
              </p>
              <p className="text-[10px] text-muted-foreground">total income</p>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          {mix.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] font-medium">{item.name}</span>
              <span className="ml-auto text-[10.5px] text-muted-foreground">{item.share}%</span>
              <span className="tabular w-16 text-right text-[10.5px] font-semibold">
                {formatCompactCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
