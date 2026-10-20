"use client";

import * as React from "react";
import { FlaskConical, Plus } from "lucide-react";
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
import { doctors, labCatalog, patients } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function NewLabOrderDialog() {
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(patients[0]?.id ?? "");
  const [doctor, setDoctor] = React.useState(doctors[0]?.id ?? "");
  const [test, setTest] = React.useState(labCatalog[0]?.name ?? "");
  const [priority, setPriority] = React.useState("Routine");

  const selectedTest = labCatalog.find((item) => item.name === test);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const patientName = patients.find((item) => item.id === patient)?.name ?? "Patient";
    const doctorName = doctors.find((item) => item.id === doctor)?.name ?? "Doctor";

    setOpen(false);
    toast.success("Lab order created", {
      description: `${test} for ${patientName} · ${formatCurrency(selectedTest?.price ?? 0)} · ordered by ${doctorName}.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-sm shadow-primary/25">
          <Plus className="size-4" />
          New test order
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border/70 px-6 py-5">
          <DialogTitle className="text-[16px] tracking-tight">Order a diagnostic test</DialogTitle>
          <DialogDescription className="text-[12.5px]">
            Create a lab order and collect payment at the reception desk.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 px-6 py-5">
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[12px]">Referring doctor</Label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[12px]">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Routine">Routine</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="STAT">STAT (emergency)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px]">Test</Label>
              <Select value={test} onValueChange={setTest}>
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue placeholder="Select test" />
                </SelectTrigger>
                <SelectContent>
                  {labCatalog.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name} · {item.category} · {formatCurrency(item.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FlaskConical className="size-4" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold">{test}</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    {selectedTest?.category} · report in {selectedTest?.tat}
                  </p>
                </div>
              </div>
              <p className="tabular text-[13px] font-semibold">
                {formatCurrency(selectedTest?.price ?? 0)}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px]">Clinical notes for the lab</Label>
              <Textarea
                rows={2}
                placeholder="Fasting status, suspected condition, special instructions…"
                className="resize-none rounded-xl"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-between">
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              Payment can be collected later from billing.
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
                Create order
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
