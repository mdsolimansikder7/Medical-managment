import { ArrowRight, ClipboardList } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { labCatalog } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const workload = [
  { label: "Biochemistry", count: 11, share: 42, color: "bg-teal-500" },
  { label: "Radiology & imaging", count: 7, share: 28, color: "bg-violet-500" },
  { label: "Hematology", count: 5, share: 18, color: "bg-sky-500" },
  { label: "Other", count: 3, share: 12, color: "bg-amber-500" },
];

export function LabWorkload() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Today&apos;s workload
        </CardTitle>
        <CardDescription className="text-[12px]">26 samples across 4 sections</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-4">
        {workload.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`size-1.5 rounded-full ${item.color}`} />
              <span className="text-[11.5px] font-medium">{item.label}</span>
              <span className="tabular ml-auto text-[10.5px] text-muted-foreground">
                {item.count} samples
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.share / 42) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function TestCatalog() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Test catalogue
          </CardTitle>
          <CardDescription className="text-[12px]">Popular tests & turnaround</CardDescription>
        </div>
        <span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground">
          <ClipboardList className="size-4" />
        </span>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {labCatalog.slice(0, 5).map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-muted/60"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11.5px] font-medium">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {item.category} · {item.tat}
              </p>
            </div>
            <span className="tabular text-[11.5px] font-semibold">
              {formatCurrency(item.price)}
            </span>
          </div>
        ))}
      </CardContent>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
        <span className="text-[10.5px] text-muted-foreground">72 tests available</span>
        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-primary">
          Full catalogue
          <ArrowRight className="size-3" />
        </span>
      </div>
    </Card>
  );
}
