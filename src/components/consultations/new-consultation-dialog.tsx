"use client";

import * as React from "react";
import { ClipboardPlus, Plus, Trash2 } from "lucide-react";
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

type MedRow = {
  key: number;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
};

let counter = 0;
const newRow = (): MedRow => ({
  key: ++counter,
  name: "",
  dose: "1 tablet",
  frequency: "Once daily after meal",
  duration: "7 days",
});

export function NewConsultationDialog() {
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(patients[0]?.id ?? "");
  const [doctor, setDoctor] = React.useState(doctors[0]?.id ?? "");
  const [diagnosis, setDiagnosis] = React.useState("");
  const [followUp, setFollowUp] = React.useState("2026-11-03");
  const [rows, setRows] = React.useState<MedRow[]>([newRow(), newRow()]);

  function updateRow(key: number, field: keyof MedRow, value: string) {
    setRows((current) =>
      current.map((row) => (row.key === key ? { ...row, [field]: value } : row)),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const patientName = patients.find((item) => item.id === patient)?.name ?? "Patient";
    const doctorName = doctors.find((item) => item.id === doctor)?.name ?? "Doctor";

    setOpen(false);
    toast.success("Consultation saved", {
      description: `Prescription issued for ${patientName} by ${doctorName}. Follow-up on ${followUp}.`,
    });
    setDiagnosis("");
    setRows([newRow(), newRow()]);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-sm shadow-primary/25">
          <ClipboardPlus className="size-4" />
          New consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border/70 px-6 py-5">
          <DialogTitle className="text-[16px] tracking-tight">
            Start a consultation
          </DialogTitle>
          <DialogDescription className="text-[12.5px]">
            Record symptoms, diagnosis and build a digital prescription in one flow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-[12px]">Patient</Label>
              <Select value={patient} onValueChange={setPatient}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue placeholder="Select patient" />
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
              <Label className="text-[12px]">Consulting doctor</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} · {item.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[12px]">Presenting symptoms</Label>
              <Textarea
                rows={2}
                placeholder="e.g. Throbbing headache with nausea for 3 days…"
                className="resize-none rounded-xl"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[12px]">Diagnosis</Label>
              <Input
                value={diagnosis}
                onChange={(event) => setDiagnosis(event.target.value)}
                placeholder="e.g. Chronic migraine without aura"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[12px]">Doctor&apos;s advice</Label>
              <Textarea
                rows={2}
                placeholder="Diet, activity, warning signs, next steps…"
                className="resize-none rounded-xl"
              />
            </div>

            <div className="space-y-3 sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label className="text-[12px]">Medicines</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-lg text-[11px] text-primary hover:bg-accent/60 hover:text-primary"
                  onClick={() => setRows((current) => [...current, newRow()])}
                >
                  <Plus className="size-3.5" />
                  Add medicine
                </Button>
              </div>

              <div className="space-y-2">
                {rows.map((row, index) => (
                  <div
                    key={row.key}
                    className="grid gap-2 rounded-xl border border-border/70 bg-muted/25 p-2.5 sm:grid-cols-[1.3fr_0.7fr_1.2fr_0.7fr_auto]"
                  >
                    <Input
                      value={row.name}
                      onChange={(event) => updateRow(row.key, "name", event.target.value)}
                      placeholder={`Medicine ${index + 1}`}
                      className="h-9 rounded-lg bg-card text-[12px]"
                    />
                    <Input
                      value={row.dose}
                      onChange={(event) => updateRow(row.key, "dose", event.target.value)}
                      placeholder="Dose"
                      className="h-9 rounded-lg bg-card text-[12px]"
                    />
                    <Input
                      value={row.frequency}
                      onChange={(event) =>
                        updateRow(row.key, "frequency", event.target.value)
                      }
                      placeholder="Frequency"
                      className="h-9 rounded-lg bg-card text-[12px]"
                    />
                    <Input
                      value={row.duration}
                      onChange={(event) => updateRow(row.key, "duration", event.target.value)}
                      placeholder="Duration"
                      className="h-9 rounded-lg bg-card text-[12px]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remove medicine"
                      className="rounded-lg text-muted-foreground hover:text-rose-600"
                      onClick={() =>
                        setRows((current) =>
                          current.length > 1
                            ? current.filter((item) => item.key !== row.key)
                            : current,
                        )
                      }
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px]">Follow-up date</Label>
              <Input
                type="date"
                value={followUp}
                onChange={(event) => setFollowUp(event.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-between">
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              The prescription can be printed or shared after saving.
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
                Save &amp; issue
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
