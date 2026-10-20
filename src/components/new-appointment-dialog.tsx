"use client";

import * as React from "react";
import { CalendarPlus, Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { doctors, patients } from "@/lib/data";

export function NewAppointmentDialog({
  label = "New appointment",
  variant = "default",
  className,
}: {
  label?: string;
  variant?: "default" | "outline";
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(patients[0]?.id ?? "");
  const [doctor, setDoctor] = React.useState(doctors[0]?.id ?? "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const patientName =
      patients.find((item) => item.id === patient)?.name ?? "New patient";
    const doctorName =
      doctors.find((item) => item.id === doctor)?.name ?? "Available doctor";

    setOpen(false);
    toast.success("Appointment scheduled", {
      description: `${patientName} with ${doctorName}. A confirmation has been sent.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={
            className ??
            "rounded-xl shadow-sm shadow-primary/25 transition hover:shadow-md hover:shadow-primary/25"
          }
        >
          <Plus className="size-4" strokeWidth={2.4} />
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-border/70 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/20 dark:text-teal-400">
              <CalendarPlus className="size-5" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-[16px] tracking-tight">
                Schedule an appointment
              </DialogTitle>
              <DialogDescription className="text-[12.5px]">
                Fill in the details below to reserve a slot in the doctor&apos;s
                calendar.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="patient" className="text-[12px]">
                Patient
              </Label>
              <Select value={patient} onValueChange={setPatient} required>
                <SelectTrigger id="patient" className="h-10 rounded-xl">
                  <SelectValue placeholder="Select a registered patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} · {item.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-[12px]">
                Doctor
              </Label>
              <Select value={doctor} onValueChange={setDoctor} required>
                <SelectTrigger id="doctor" className="h-10 rounded-xl">
                  <SelectValue placeholder="Assign doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} · {item.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[12px]">
                Appointment type
              </Label>
              <Select defaultValue="Consultation">
                <SelectTrigger id="type" className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Check-up">Check-up</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-[12px]">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                defaultValue="2026-10-20"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-[12px]">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                defaultValue="10:30"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="reason" className="text-[12px]">
                Reason / notes
              </Label>
              <Textarea
                id="reason"
                rows={3}
                placeholder="Briefly describe the symptoms or reason for the visit…"
                className="resize-none rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-between">
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              The patient will receive an SMS confirmation.
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl">
                Confirm appointment
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
