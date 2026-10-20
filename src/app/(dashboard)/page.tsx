import {
  CalendarCheck2,
  CircleDollarSign,
  Stethoscope,
  Users,
} from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CareJourney } from "@/components/dashboard/care-journey";
import { CareTeam } from "@/components/dashboard/care-team";
import { DashboardGreeting } from "@/components/dashboard/dashboard-greeting";
import { DepartmentChart } from "@/components/dashboard/department-chart";
import { PatientOverviewChart } from "@/components/dashboard/patient-overview-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentPatientsTable } from "@/components/dashboard/recent-patients-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { TodaysSchedule } from "@/components/dashboard/todays-schedule";
import { formatCompactCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="animate-in-up space-y-4">
      <DashboardGreeting />

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total patients"
          value="4,820"
          delta="+12.4%"
          hint="vs last month"
          icon={Users}
          accent="teal"
          sparkId="spark-patients"
          data={[28, 34, 31, 40, 37, 46, 52, 49, 58, 64, 61, 72]}
        />
        <StatCard
          label="Today's appointments"
          value="48"
          delta="+8.2%"
          hint="vs yesterday"
          icon={CalendarCheck2}
          accent="violet"
          sparkId="spark-appointments"
          data={[18, 24, 20, 28, 34, 30, 38, 36, 44, 41, 48, 52]}
        />
        <StatCard
          label="Available doctors"
          value="24"
          delta="+3"
          hint="on duty now"
          icon={Stethoscope}
          accent="sky"
          sparkId="spark-doctors"
          data={[20, 22, 19, 24, 23, 26, 22, 25, 28, 24, 27, 24]}
        />
        <StatCard
          label="Revenue this month"
          value={formatCompactCurrency(1284500)}
          delta="+18.6%"
          hint="vs September"
          icon={CircleDollarSign}
          accent="amber"
          sparkId="spark-revenue"
          data={[30, 38, 35, 45, 42, 55, 52, 64, 60, 70, 68, 82]}
        />
      </div>

      {/* Care journey */}
      <CareJourney />

      {/* Main charts */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PatientOverviewChart />
        </div>
        <TodaysSchedule />
      </div>

      {/* Secondary insights */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DepartmentChart />
        <CareTeam />
        <ActivityFeed />
      </div>

      {/* Table + actions */}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentPatientsTable />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
