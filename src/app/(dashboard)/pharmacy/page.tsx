import type { Metadata } from "next";
import { CalendarX2, PackageCheck, Pill, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PharmacyView } from "@/components/pharmacy/pharmacy-view";
import { ExpiringSoon, StockAlerts } from "@/components/pharmacy/stock-alerts";
import { QuickStat } from "@/components/quick-stat";
import { formatCompactCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pharmacy",
};

export default function PharmacyPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Pharmacy"
        description="Dispense against prescriptions, keep batch-level stock accurate and stay ahead of expiry."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Active medicines"
          value="1,284"
          hint="72 categories"
          icon={Pill}
          accent="teal"
        />
        <QuickStat
          label="Stock value"
          value={formatCompactCurrency(642000)}
          hint="+4.8% this month"
          icon={PackageCheck}
          accent="emerald"
        />
        <QuickStat
          label="Low / out of stock"
          value="12"
          hint="4 need reorder today"
          icon={TrendingUp}
          accent="amber"
        />
        <QuickStat
          label="Expiring in 90 days"
          value="05"
          hint="2 batches critical"
          icon={CalendarX2}
          accent="rose"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PharmacyView />
        </div>
        <div className="space-y-4">
          <StockAlerts />
          <ExpiringSoon />
        </div>
      </div>
    </div>
  );
}
