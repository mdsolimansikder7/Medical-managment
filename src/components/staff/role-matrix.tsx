import { Check, Minus, ShieldCheck, Stethoscope, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { rolePermissions } from "@/lib/data";
import { cn } from "@/lib/utils";

const roleColumns = [
  "Super Admin",
  "Doctor",
  "Receptionist",
  "Lab Technician",
  "Pharmacist",
  "Accountant",
  "Patient",
];

const roleSummary = [
  {
    role: "Super Admin",
    count: 1,
    description: "Full system, settings & users",
    icon: ShieldCheck,
    tone: "text-teal-600 bg-teal-500/10 dark:text-teal-400",
  },
  {
    role: "Doctor",
    count: 24,
    description: "History, diagnosis & prescriptions",
    icon: Stethoscope,
    tone: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  },
  {
    role: "Receptionist",
    count: 3,
    description: "Registration, appointments & billing",
    icon: UserRound,
    tone: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
  },
  {
    role: "Lab Technician",
    count: 4,
    description: "Samples, tests & report entry",
    icon: Stethoscope,
    tone: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  },
  {
    role: "Pharmacist",
    count: 2,
    description: "Stock, sales & dispensing",
    icon: UserRound,
    tone: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    role: "Accountant",
    count: 2,
    description: "Invoices, payments & reports",
    icon: UserRound,
    tone: "text-orange-600 bg-orange-500/10 dark:text-orange-400",
  },
  {
    role: "Patient",
    count: 4820,
    description: "Own records, reports & appointments",
    icon: UserRound,
    tone: "text-muted-foreground bg-muted",
  },
];

export function RoleSummary() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">Roles at a glance</CardTitle>
        <CardDescription className="text-[12px]">Least privilege by default</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {roleSummary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.role}
              className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-muted/60"
            >
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", item.tone)}>
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-semibold">{item.role}</p>
                <p className="truncate text-[10px] text-muted-foreground">{item.description}</p>
              </div>
              <span className="tabular text-[11px] font-semibold text-muted-foreground">
                {item.count.toLocaleString("en-US")}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function RoleMatrix() {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Permissions matrix
        </CardTitle>
        <CardDescription className="text-[12px]">
          Module access per role — enforced on the server for every request
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60">
                <th className="h-9 pl-5 pr-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Module
                </th>
                {roleColumns.map((role) => (
                  <th
                    key={role}
                    className="h-9 px-2 text-center text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground/80"
                  >
                    {role.replace(" Technician", " Tech")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rolePermissions.map((row) => (
                <tr
                  key={row.module}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/30"
                >
                  <td className="py-2.5 pl-5 pr-3 text-[11.5px] font-medium">{row.module}</td>
                  {roleColumns.map((role) => {
                    const allowed = row.permissions[role];

                    return (
                      <td key={role} className="px-2 py-2.5 text-center">
                        <span
                          className={cn(
                            "mx-auto grid size-5 place-items-center rounded-md",
                            allowed
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "text-muted-foreground/30",
                          )}
                        >
                          {allowed ? (
                            <Check className="size-3" strokeWidth={3} />
                          ) : (
                            <Minus className="size-3" />
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
