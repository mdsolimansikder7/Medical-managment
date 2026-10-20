import type { Metadata } from "next";
import { CalendarCheck2, ClipboardPlus, FileClock, Timer } from "lucide-react";

import { CommonDiagnoses } from "@/components/consultations/common-diagnoses";
import { ConsultationsView } from "@/components/consultations/consultations-view";
import { NewConsultationDialog } from "@/components/consultations/new-consultation-dialog";
import { QueueCard } from "@/components/consultations/queue-card";
import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";

export const metadata: Metadata = {
  title: "Consultations",
};

export default function ConsultationsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Consultations & prescriptions"
        description="Record symptoms and diagnosis, issue a digital prescription and schedule the follow-up visit."
      >
        <ExportButton label="Export" />
        <NewConsultationDialog />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Consultations today"
          value="32"
          hint="+4 vs yesterday"
          icon={ClipboardPlus}
          accent="teal"
        />
        <QuickStat
          label="Prescriptions issued"
          value="28"
          hint="87% of visits"
          icon={CalendarCheck2}
          accent="emerald"
        />
        <QuickStat
          label="Drafts pending"
          value="04"
          hint="awaiting sign-off"
          icon={FileClock}
          accent="amber"
        />
        <QuickStat
          label="Avg. consultation"
          value="18m"
          hint="target under 20m"
          icon={Timer}
          accent="sky"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ConsultationsView />
        </div>
        <div className="space-y-4">
          <QueueCard />
          <CommonDiagnoses />
        </div>
      </div>
    </div>
  );
}
