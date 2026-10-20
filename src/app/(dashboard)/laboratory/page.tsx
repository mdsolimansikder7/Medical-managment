import type { Metadata } from "next";
import { BadgeCheck, FlaskConical, Microscope, TestTube2 } from "lucide-react";

import { ExportButton } from "@/components/export-button";
import { LabWorkload, TestCatalog } from "@/components/laboratory/lab-side";
import { LaboratoryView } from "@/components/laboratory/laboratory-view";
import { NewLabOrderDialog } from "@/components/laboratory/new-lab-order-dialog";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";

export const metadata: Metadata = {
  title: "Laboratory",
};

export default function LaboratoryPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Laboratory & diagnostics"
        description="Track every test from order to approved report — samples, pricing and patient results in one place."
      >
        <ExportButton label="Export" />
        <NewLabOrderDialog />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Tests ordered today"
          value="26"
          hint="+6 vs yesterday"
          icon={FlaskConical}
          accent="teal"
        />
        <QuickStat
          label="Samples collected"
          value="11"
          hint="3 awaiting pickup"
          icon={TestTube2}
          accent="sky"
        />
        <QuickStat
          label="Reports ready"
          value="06"
          hint="awaiting review"
          icon={Microscope}
          accent="amber"
        />
        <QuickStat
          label="Approved today"
          value="14"
          hint="avg TAT 5.2 hrs"
          icon={BadgeCheck}
          accent="emerald"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LaboratoryView />
        </div>
        <div className="space-y-4">
          <LabWorkload />
          <TestCatalog />
        </div>
      </div>
    </div>
  );
}
