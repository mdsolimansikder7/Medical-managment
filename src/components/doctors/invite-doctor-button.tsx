"use client";

import { UserRoundPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function InviteDoctorButton() {
  return (
    <Button
      className="rounded-xl shadow-sm shadow-primary/25"
      onClick={() =>
        toast.success("Invitation sent", {
          description: "The doctor will receive an onboarding link by email.",
        })
      }
    >
      <UserRoundPlus className="size-4" />
      Invite doctor
    </Button>
  );
}
