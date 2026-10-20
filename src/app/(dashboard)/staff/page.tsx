import type { Metadata } from "next";
import { MailPlus, ShieldCheck, Stethoscope, Users } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { QuickStat } from "@/components/quick-stat";
import { InviteMemberDialog } from "@/components/staff/invite-member-dialog";
import { PendingApprovals } from "@/components/staff/pending-approvals";
import { RoleMatrix, RoleSummary } from "@/components/staff/role-matrix";
import { StaffView } from "@/components/staff/staff-view";

export const metadata: Metadata = {
  title: "Staff & Roles",
};

export default function StaffPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Staff & roles"
        description="Manage doctors, staff accounts and role-based permissions across every module."
      >
        <InviteMemberDialog />
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickStat
          label="Total users"
          value="4,856"
          hint="including patients"
          icon={Users}
          accent="teal"
        />
        <QuickStat
          label="Doctors"
          value="24"
          hint="18 on duty today"
          icon={Stethoscope}
          accent="sky"
        />
        <QuickStat
          label="Staff accounts"
          value="32"
          hint="6 roles configured"
          icon={ShieldCheck}
          accent="emerald"
        />
        <QuickStat
          label="Pending invites"
          value="03"
          hint="expire in 5 days"
          icon={MailPlus}
          accent="amber"
        />
      </div>

      <PendingApprovals />

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StaffView />
        </div>
        <RoleSummary />
      </div>

      <RoleMatrix />
    </div>
  );
}
