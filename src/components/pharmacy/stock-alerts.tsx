import { AlertTriangle, CalendarX2, PackageSearch } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const lowStock = [
  { name: "Ceftriaxone 1g injection", stock: 0, reorder: 50, unit: "injection" },
  { name: "Omeprazole 20mg", stock: 88, reorder: 120, unit: "capsules" },
  { name: "Salbutamol inhaler", stock: 56, reorder: 60, unit: "inhalers" },
  { name: "Azithromycin 500mg", stock: 24, reorder: 60, unit: "tablets" },
];

const expiring = [
  { name: "Salbutamol inhaler", batch: "SB-4402", expiry: "Dec 2026", days: 42 },
  { name: "Atorvastatin 10mg", batch: "AT-5512", expiry: "Jan 2027", days: 73 },
  { name: "Insulin glargine 100IU", batch: "IN-2201", expiry: "Apr 2027", days: 162 },
];

export function StockAlerts() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Low stock alerts
          </CardTitle>
          <CardDescription className="text-[12px]">Reorder before the shelf runs out</CardDescription>
        </div>
        <span className="grid size-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="size-4" />
        </span>
      </CardHeader>

      <CardContent className="space-y-2 px-5 py-4">
        {lowStock.map((item) => {
          const critical = item.stock === 0;

          return (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-xl border border-border/60 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-medium">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.stock} / {item.reorder} {item.unit}
                </p>
              </div>
              <span
                className={
                  critical
                    ? "rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-rose-600 dark:text-rose-400"
                    : "rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-600 dark:text-amber-400"
                }
              >
                {critical ? "Out" : "Low"}
              </span>
            </div>
          );
        })}
      </CardContent>

      <div className="border-t border-border/60 px-4 py-3">
        <Button variant="outline" size="sm" className="h-8 w-full rounded-lg bg-card text-[11px]">
          <PackageSearch className="size-3.5" />
          Review purchase list
        </Button>
      </div>
    </Card>
  );
}

export function ExpiringSoon() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">Expiring soon</CardTitle>
          <CardDescription className="text-[12px]">Next 6 months · batch level</CardDescription>
        </div>
        <span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground">
          <CalendarX2 className="size-4" />
        </span>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {expiring.map((item) => (
          <div
            key={item.batch}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-muted/60"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11.5px] font-medium">{item.name}</p>
              <p className="tabular text-[10px] text-muted-foreground">
                {item.batch} · {item.expiry}
              </p>
            </div>
            <span
              className={
                item.days <= 60
                  ? "tabular rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-rose-600 dark:text-rose-400"
                  : "tabular rounded-md bg-muted px-1.5 py-0.5 text-[9.5px] font-medium text-muted-foreground"
              }
            >
              {item.days}d
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
