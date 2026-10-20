import { Star, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PersonAvatar } from "@/components/person-avatar";
import { departmentRevenue, doctorPerformance } from "@/lib/data";
import { formatCompactCurrency } from "@/lib/utils";

export function DoctorPerformance() {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Doctor performance
          </CardTitle>
          <CardDescription className="text-[12px]">
            Appointments &amp; revenue · October 2026
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="size-3" />
          +8.4%
        </span>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                {["Doctor", "Appointments", "Revenue", "Rating"].map((head, index) => (
                  <TableHead
                    key={head}
                    className={
                      index === 0
                        ? "h-9 pl-5 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80"
                        : index === 3
                          ? "h-9 pl-4 pr-5 text-right text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80"
                          : "h-9 pl-4 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80"
                    }
                  >
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorPerformance.map((doctor, index) => (
                <TableRow
                  key={doctor.name}
                  className="border-border/50 transition-colors hover:bg-muted/40"
                >
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <span className="tabular w-3 text-[10px] font-semibold text-muted-foreground/70">
                        {index + 1}
                      </span>
                      <PersonAvatar name={doctor.name} accent={doctor.accent} size="xs" />
                      <div>
                        <p className="whitespace-nowrap text-[11.5px] font-semibold">
                          {doctor.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{doctor.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="tabular py-3 pl-4 text-[11.5px] font-medium">
                    {doctor.appointments}
                  </TableCell>
                  <TableCell className="tabular whitespace-nowrap py-3 pl-4 text-[11.5px] font-semibold">
                    {formatCompactCurrency(doctor.revenue)}
                  </TableCell>
                  <TableCell className="py-3 pl-4 pr-5 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      {doctor.rating}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export function DepartmentRevenue() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Department revenue
        </CardTitle>
        <CardDescription className="text-[12px]">Share of monthly income</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-4">
        {departmentRevenue.map((item) => (
          <div key={item.department} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-medium">{item.department}</span>
              <span className="tabular ml-auto text-[10.5px] font-semibold">
                {formatCompactCurrency(item.revenue)}
              </span>
              <span className="tabular w-7 text-right text-[10px] text-muted-foreground">
                {item.share}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/70"
                style={{ width: `${(item.share / 33) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="border-t border-border/60 px-5 py-3">
        <p className="text-[10.5px] text-muted-foreground">
          Cardiology leads with{" "}
          <span className="font-semibold text-foreground">33%</span> of total revenue.
        </p>
      </CardFooter>
    </Card>
  );
}
