import type { Metadata } from "next";
import {
  ClipboardList,
  FilePlus2,
  FlaskConical,
  Pill,
  Timer,
} from "lucide-react";

import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";
import { PrescriptionsCard } from "@/components/records/prescriptions-card";
import { RecordsView } from "@/components/records/records-view";
import { UploadReportCard } from "@/components/records/upload-report-card";
import { ToastButton } from "@/components/toast-button";

export const metadata: Metadata = {
  title: "Medical Records",
};

export default function RecordsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Medical records"
        description="Prescriptions, lab results and clinical notes — securely organised for every patient."
      >
        <ExportButton label="Export" />
        <ToastButton
          title="New record started"
          description="A blank clinical note has been added to the queue."
        >
          <FilePlus2 className="size-4" />
          New record
        </ToastButton>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Total records"
          value="12,480"
          hint="+312 this month"
          icon={ClipboardList}
          accent="teal"
        />
        <QuickStat
          label="Prescriptions"
          value="4,120"
          hint="98% dispensed"
          icon={Pill}
          accent="violet"
        />
        <QuickStat
          label="Lab reports"
          value="3,860"
          hint="42 ready today"
          icon={FlaskConical}
          accent="sky"
        />
        <QuickStat
          label="Pending review"
          value="14"
          hint="needs signature"
          icon={Timer}
          accent="amber"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecordsView />
        </div>
        <div className="space-y-4">
          <PrescriptionsCard />
          <UploadReportCard />
        </div>
      </div>
    </div>
  );
}
