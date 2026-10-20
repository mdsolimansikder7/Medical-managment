import type { Metadata } from "next";
import { HandCoins, Landmark, TrendingUp, Wallet } from "lucide-react";

import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";
import { DailyCashSummary } from "@/components/reports/daily-cash-summary";
import { FinanceChart } from "@/components/reports/finance-chart";
import { DepartmentRevenue, DoctorPerformance } from "@/components/reports/report-tables";
import { RevenueMix } from "@/components/reports/revenue-mix";
import { formatCompactCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reports",
};

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Reports & analytics"
        description="Daily income and expenses, department revenue and doctor-wise performance in one view."
      >
        <ExportButton label="Export report" />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Total revenue"
          value={formatCompactCurrency(1284500)}
          hint="+11.5% MoM"
          icon={TrendingUp}
          accent="teal"
        />
        <QuickStat
          label="Operating expense"
          value={formatCompactCurrency(742000)}
          hint="+7.8% MoM"
          icon={Wallet}
          accent="amber"
        />
        <QuickStat
          label="Net profit"
          value={formatCompactCurrency(542000)}
          hint="42.2% margin"
          icon={HandCoins}
          accent="emerald"
        />
        <QuickStat
          label="Outstanding dues"
          value={formatCompactCurrency(186000)}
          hint="6 invoices"
          icon={Landmark}
          accent="rose"
        />
      </div>

      <DailyCashSummary />

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FinanceChart />
        </div>
        <RevenueMix />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DoctorPerformance />
        </div>
        <DepartmentRevenue />
      </div>
    </div>
  );
}
