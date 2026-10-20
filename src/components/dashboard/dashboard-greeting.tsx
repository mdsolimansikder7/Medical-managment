"use client";

import { CalendarCheck2 } from "lucide-react";

import { ExportButton } from "@/components/export-button";
import { NewAppointmentDialog } from "@/components/new-appointment-dialog";
import { useSession } from "@/lib/session";

export function DashboardGreeting() {
  const { user } = useSession();
  const fullName = user?.name?.trim() || "Doctor";
  const firstName = fullName.replace(/^Dr\.\s*/i, "").split(/\s+/)[0] ?? "Doctor";
  const prefix = /^Dr\./i.test(fullName) ? "Dr. " : "";

  return (
    <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1">
            <CalendarCheck2 className="size-3 text-primary" />
            Tuesday, October 20
          </span>
          <span className="hidden text-border sm:inline">·</span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </span>
        </div>
        <h1 className="mt-2.5 text-[23px] font-semibold leading-tight tracking-tight sm:text-[26px]">
          Good morning, {prefix}
          {firstName}
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-foreground">8 appointments</span> and{" "}
          <span className="font-semibold text-rose-600 dark:text-rose-400">
            3 critical alerts
          </span>{" "}
          to review today.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <ExportButton />
        <NewAppointmentDialog />
      </div>
    </div>
  );
}
