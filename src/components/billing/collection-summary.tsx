import { ArrowUpRight, Banknote, CreditCard, Landmark, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/utils";

const methods = [
  { name: "Card payments", amount: 412800, share: 40, icon: CreditCard, color: "bg-teal-500" },
  { name: "Insurance", amount: 328400, share: 32, icon: ShieldCheck, color: "bg-violet-500" },
  { name: "Bank transfer", amount: 205900, share: 20, icon: Landmark, color: "bg-sky-500" },
  { name: "Cash", amount: 82300, share: 8, icon: Banknote, color: "bg-amber-500" },
];

export function CollectionSummary() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Collection summary
        </CardTitle>
        <CardDescription className="text-[12px]">
          October 2026 · all departments
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Collected
            </p>
            <p className="tabular mt-1 text-[22px] font-semibold leading-none tracking-tight">
              {formatCompactCurrency(1024300)}
            </p>
          </div>
          <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/10 px-1.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="size-3" />
            18.6%
          </span>
        </div>

        <div className="mt-4 flex h-2 gap-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: "79%" }} />
          <div className="h-full rounded-full bg-amber-400" style={{ width: "14%" }} />
          <div className="h-full rounded-full bg-rose-500" style={{ width: "7%" }} />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Paid", value: 1024300, color: "bg-emerald-500" },
            { label: "Pending", value: 181400, color: "bg-amber-400" },
            { label: "Overdue", value: 78800, color: "bg-rose-500" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/60 p-2">
              <div className="flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${item.color}`} />
                <span className="text-[10px] font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <p className="tabular mt-1 text-[11.5px] font-semibold">
                {formatCompactCurrency(item.value)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PaymentMethods() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Payment methods
        </CardTitle>
        <CardDescription className="text-[12px]">
          How patients settled their bills
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3.5 px-5 py-4">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <div key={method.name} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Icon className="size-3.5 text-muted-foreground" />
                <span className="text-[11.5px] font-medium">{method.name}</span>
                <span className="tabular ml-auto text-[11px] font-semibold">
                  {formatCompactCurrency(method.amount)}
                </span>
                <span className="tabular w-7 text-right text-[10.5px] text-muted-foreground">
                  {method.share}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${method.color}`}
                  style={{ width: `${(method.share / 40) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
