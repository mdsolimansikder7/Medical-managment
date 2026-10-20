import type { Metadata } from "next";
import {
  CircleDollarSign,
  FilePlus2,
  HandCoins,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { CollectionSummary, PaymentMethods } from "@/components/billing/collection-summary";
import { InvoicesView } from "@/components/billing/invoices-view";
import { StatCard } from "@/components/dashboard/stat-card";
import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { ToastButton } from "@/components/toast-button";
import { formatCompactCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Billing & invoices"
        description="Track revenue, settle outstanding balances and keep every payment accounted for."
      >
        <ExportButton label="Export" />
        <ToastButton
          title="Invoice created"
          description="A draft invoice has been added to the billing queue."
        >
          <FilePlus2 className="size-4" />
          Create invoice
        </ToastButton>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={formatCompactCurrency(1284500)}
          delta="+18.6%"
          hint="vs September"
          icon={CircleDollarSign}
          accent="teal"
          sparkId="spark-billing-total"
          data={[24, 30, 27, 36, 33, 44, 41, 52, 49, 58, 55, 66]}
        />
        <StatCard
          label="Collected"
          value={formatCompactCurrency(1024300)}
          delta="+15.2%"
          hint="79% of billed"
          icon={Wallet}
          accent="emerald"
          sparkId="spark-billing-collected"
          data={[18, 24, 22, 30, 28, 36, 34, 44, 41, 50, 47, 56]}
        />
        <StatCard
          label="Outstanding"
          value={formatCompactCurrency(260200)}
          delta="-4.1%"
          hint="6 invoices open"
          icon={HandCoins}
          accent="amber"
          trend="down"
          sparkId="spark-billing-outstanding"
          data={[42, 40, 44, 38, 41, 36, 38, 33, 35, 30, 32, 28]}
        />
        <StatCard
          label="Insurance claims"
          value={formatCompactCurrency(182400)}
          delta="+6.4%"
          hint="12 claims filed"
          icon={ShieldCheck}
          accent="violet"
          sparkId="spark-billing-insurance"
          data={[20, 22, 26, 24, 30, 28, 33, 31, 36, 34, 39, 42]}
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <InvoicesView />
        </div>
        <div className="space-y-4">
          <CollectionSummary />
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}

