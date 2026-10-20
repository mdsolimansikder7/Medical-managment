"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { departmentShare } from "@/lib/data";

type TooltipEntry = {
  name?: string;
  value?: number | string;
  payload?: { color?: string; name?: string; value?: number };
};

function DepartmentTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="rounded-xl border border-border/80 bg-popover/95 px-3 py-2 shadow-xl backdrop-blur">
      <div className="flex items-center gap-2 text-[12px]">
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: item.payload?.color }}
        />
        <span className="font-medium">{item.name}</span>
        <span className="tabular ml-2 font-semibold text-muted-foreground">
          {item.value}%
        </span>
      </div>
    </div>
  );
}

export function DepartmentChart() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Department load
        </CardTitle>
        <CardDescription className="text-[12px]">
          Share of appointments this month
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-4">
        <div className="relative mx-auto h-[176px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<DepartmentTooltip />} />
              <Pie
                data={departmentShare}
                dataKey="value"
                nameKey="name"
                innerRadius={56}
                outerRadius={78}
                paddingAngle={3}
                cornerRadius={6}
                stroke="none"
              >
                {departmentShare.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="tabular text-[22px] font-semibold leading-none tracking-tight">
              1,248
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Total visits
            </span>
          </div>
        </div>

        <div className="mt-1 space-y-2.5">
          {departmentShare.map((item) => (
            <div key={item.name} className="group flex items-center gap-2.5">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[12px] font-medium text-muted-foreground group-hover:text-foreground">
                {item.name}
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:block">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.value / 32) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span className="tabular w-7 text-right text-[11.5px] font-semibold">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
