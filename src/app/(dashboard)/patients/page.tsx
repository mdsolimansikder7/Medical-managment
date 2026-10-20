import type { Metadata } from "next";
import { BedDouble, ShieldAlert, UserPlus, Users } from "lucide-react";

import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { NewPatientDialog } from "@/components/patients/new-patient-dialog";
import { PatientDirectory } from "@/components/patients/patient-directory";
import { QuickStat } from "@/components/quick-stat";

export const metadata: Metadata = {
  title: "Patients",
};

export default function PatientsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Patients"
        description="A complete registry of everyone under your care — admissions, vitals and medical history in one place."
      >
        <ExportButton label="Export list" />
        <NewPatientDialog />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Total patients"
          value="4,820"
          hint="+12.4% this month"
          icon={Users}
          accent="teal"
        />
        <QuickStat
          label="Currently admitted"
          value="320"
          hint="142 beds free"
          icon={BedDouble}
          accent="sky"
        />
        <QuickStat
          label="Critical care"
          value="03"
          hint="ICU · immediate"
          icon={ShieldAlert}
          accent="rose"
        />
        <QuickStat
          label="New this week"
          value="58"
          hint="+9 vs last week"
          icon={UserPlus}
          accent="violet"
        />
      </div>

      <PatientDirectory />
    </div>
  );
}
