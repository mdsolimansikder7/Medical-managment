import type { Metadata } from "next";
import {
  CalendarClock,
  CircleCheckBig,
  CircleX,
  Timer,
} from "lucide-react";

import { AppointmentsView } from "@/components/appointments/appointments-view";
import { NextUp } from "@/components/appointments/next-up";
import { WeeklyVolumeChart } from "@/components/appointments/weekly-volume-chart";
import { ExportButton } from "@/components/export-button";
import { NewAppointmentDialog } from "@/components/new-appointment-dialog";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";

export const metadata: Metadata = {
  title: "Appointments",
};

export default function AppointmentsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Appointments"
        description="Manage the daily schedule, assign doctors and keep the queue moving smoothly."
      >
        <ExportButton label="Export" />
        <NewAppointmentDialog />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Today's appointments"
          value="48"
          hint="+8 vs yesterday"
          icon={CalendarClock}
          accent="teal"
        />
        <QuickStat
          label="Completed"
          value="32"
          hint="66% of total"
          icon={CircleCheckBig}
          accent="emerald"
        />
        <QuickStat
          label="In progress"
          value="05"
          hint="avg 18 min"
          icon={Timer}
          accent="amber"
        />
        <QuickStat
          label="Cancelled"
          value="04"
          hint="2 no-shows"
          icon={CircleX}
          accent="rose"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AppointmentsView />
        </div>
        <div className="space-y-4">
          <WeeklyVolumeChart />
          <NextUp />
        </div>
      </div>
    </div>
  );
}
