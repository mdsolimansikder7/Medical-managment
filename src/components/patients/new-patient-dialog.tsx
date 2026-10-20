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

export function NewPatientDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
    toast.success("Patient registered", {
      description: `${name || "New patient"} has been added to the registry with a pending intake form.`,
    });
    setName("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-sm shadow-primary/25">
          <UserPlus className="size-4" strokeWidth={2.2} />
          Add patient
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border/70 px-6 py-5">
          <DialogTitle className="text-[16px] tracking-tight">
            Register a new patient
          </DialogTitle>
          <DialogDescription className="text-[12.5px]">
            Create a medical profile. You can complete the intake form later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="full-name" className="text-[12px]">
                Full name
              </Label>
              <Input
                id="full-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Rina Das"
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-[12px]">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min={0}
                max={120}
                placeholder="34"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[12px]">
                Gender
              </Label>
              <Select defaultValue="Female">
                <SelectTrigger id="gender" className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[12px]">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="+880 17XX-XXX XXX"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood" className="text-[12px]">
                Blood group
              </Label>
              <Select defaultValue="A+">
                <SelectTrigger id="blood" className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-[12px]">
                Department
              </Label>
              <Select defaultValue="General Medicine">
                <SelectTrigger id="department" className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "General Medicine",
                    "Cardiology",
                    "Orthopedics",
                    "Neurology",
                    "Dermatology",
                    "Pulmonology",
                    "Endocrinology",
                    "Emergency",
                  ].map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition" className="text-[12px]">
                Primary condition
              </Label>
              <Input
                id="condition"
                placeholder="e.g. Hypertension"
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl">
              Register patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
