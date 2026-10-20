"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleOptions = [
  "Doctor",
  "Receptionist",
  "Lab Technician",
  "Pharmacist",
  "Accountant",
  "Super Admin",
];

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Endocrinology",
  "Dermatology",
  "Pulmonology",
  "Laboratory",
  "Pharmacy",
  "Front desk",
  "Finance",
  "Administration",
];

export function InviteMemberDialog() {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("Doctor");
  const [department, setDepartment] = React.useState("Cardiology");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");

    setOpen(false);
    toast.success("Invitation sent", {
      description: `${email} was invited as ${role} · ${department}.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-sm shadow-primary/25">
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-md">
        <DialogHeader className="border-b border-border/70 px-6 py-5">
          <DialogTitle className="text-[16px] tracking-tight">Invite a team member</DialogTitle>
          <DialogDescription className="text-[12.5px]">
            They will receive an email link to set up their account and permissions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5">
            <div className="space-y-2">
              <Label className="text-[12px]" htmlFor="invite-name">
                Full name
              </Label>
              <Input
                id="invite-name"
                name="name"
                required
                placeholder="e.g. Dr. Rezaul Karim"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px]" htmlFor="invite-email">
                Work email
              </Label>
              <Input
                id="invite-email"
                name="email"
                type="email"
                required
                placeholder="name@medicare.com"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[12px]">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[12px]">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="rounded-xl bg-muted/50 px-3 py-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
              {role} access includes{" "}
              {role === "Doctor"
                ? "patient records, consultations and prescriptions."
                : role === "Receptionist"
                  ? "patient registration, appointments and billing."
                  : role === "Lab Technician"
                    ? "lab orders, sample tracking and report entry."
                    : role === "Pharmacist"
                      ? "inventory, sales and prescription dispensing."
                      : role === "Accountant"
                        ? "billing, payments and financial reports."
                        : "full system access including user management."}
            </p>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl">
              Send invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
