import type { Metadata } from "next";
import { Building2, CalendarCheck2, Stethoscope, Timer } from "lucide-react";

import { DoctorDirectory } from "@/components/doctors/doctor-directory";
import { InviteDoctorButton } from "@/components/doctors/invite-doctor-button";
import { ExportButton } from "@/components/export-button";
import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";

export const metadata: Metadata = {
  title: "Doctors",
};

export default function DoctorsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Doctors"
        description="Your medical team at a glance — availability, specialties and today's consultation load."
      >
        <ExportButton label="Export" />
        <InviteDoctorButton />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="On duty now"
          value="24"
          hint="across 8 departments"
          icon={Stethoscope}
          accent="teal"
        />
        <QuickStat
          label="In surgery"
          value="03"
          hint="2 theatres active"
          icon={Timer}
          accent="amber"
        />
        <QuickStat
          label="Departments"
          value="12"
          hint="4 specialty centers"
          icon={Building2}
          accent="violet"
        />
        <QuickStat
          label="Consultations today"
          value="96"
          hint="avg 18 min / visit"
          icon={CalendarCheck2}
          accent="sky"
        />
      </div>

      <DoctorDirectory />
    </div>
  );
}
