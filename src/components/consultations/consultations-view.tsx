"use client";

import * as React from "react";
import {
  Activity,
  CalendarClock,
  Copy,
  Eye,
  MoreHorizontal,
  Pill,
  Printer,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { prescriptions, type Prescription } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

const filters = ["All", "Issued", "Draft"] as const;
type Filter = (typeof filters)[number];

export function ConsultationsView() {
  const [filter, setFilter] = React.useState<Filter>("All");
  const [query, setQuery] = React.useState("");
  const [preview, setPreview] = React.useState<Prescription | null>(null);

  const filtered = prescriptions.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [item.patient, item.doctor, item.diagnosis, item.id].some((value) =>
        value.toLowerCase().includes(term),
      );
    return matchesFilter && matchesQuery;
  });

  return (
    <>
      <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 border-b border-border/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                  filter === item
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prescriptions…"
              className="h-9 rounded-xl pl-8 pr-8 text-[12px] sm:w-56"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <CardContent className="space-y-2.5 p-4">
          {filtered.map((item) => {
            const tone = accents[item.accent];

            return (
              <div
                key={item.id}
                className="group rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border hover:bg-muted/25"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
                      tone.soft,
                      tone.text,
                      tone.ring,
                    )}
                  >
                    <Pill className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-[12.5px] font-semibold">{item.patient}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {item.patientId}
                      </span>
                      <StatusBadge status={item.status} />
                      <span className="ml-auto text-[10.5px] text-muted-foreground/80">
                        {item.date} · {item.time}
                      </span>
                    </div>

                    <p className="mt-1 text-[12px] font-medium">{item.diagnosis}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
                      {item.symptoms}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {item.medicines.slice(0, 2).map((medicine) => (
                        <span
                          key={medicine.name}
                          className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {medicine.name}
                        </span>
                      ))}
                      {item.medicines.length > 2 && (
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          +{item.medicines.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] text-muted-foreground/80">
                      <span className="inline-flex items-center gap-1">
                        <Activity className="size-2.5" />
                        {item.doctor}
                      </span>
                      <span className="text-border">·</span>
                      <span>{item.department}</span>
                      <span className="text-border">·</span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock className="size-2.5" />
                        Follow-up {item.followUp}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden h-7 rounded-lg bg-card px-2 text-[10.5px] sm:inline-flex"
                      onClick={() => setPreview(item)}
                    >
                      <Eye className="size-3" />
                      View Rx
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${item.id}`}
                          className="size-7 rounded-lg text-muted-foreground"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 rounded-xl">
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() => setPreview(item)}
                        >
                          <Eye className="size-3.5 text-muted-foreground" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() => toast.success("Sent to printer")}
                        >
                          <Printer className="size-3.5 text-muted-foreground" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() =>
                            toast.success("Prescription duplicated", {
                              description: `A new draft was created from ${item.id}.`,
                            })
                          }
                        >
                          <Copy className="size-3.5 text-muted-foreground" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() =>
                            toast.info("Follow-up added to calendar", {
                              description: `${item.patient} · ${item.followUp}`,
                            })
                          }
                        >
                          <CalendarClock className="size-3.5 text-muted-foreground" />
                          Add follow-up
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-5" />
              </div>
              <p className="mt-3 text-[13px] font-semibold">No prescriptions found</p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Try another filter or create a new consultation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-2xl">
          {preview && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>Prescription {preview.id}</DialogTitle>
                <DialogDescription>
                  Digital prescription preview for {preview.patient}
                </DialogDescription>
              </DialogHeader>

              <div className="print-area p-6">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                      <Activity className="size-4" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold leading-tight">
                        MediCare Hospital
                      </p>
                      <p className="text-[10.5px] text-muted-foreground">
                        House 12, Road 7, Dhanmondi · Dhaka 1205
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Prescription
                    </p>
                    <p className="tabular text-[11px] font-medium">{preview.id}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3">
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Patient
                    </p>
                    <p className="text-[12px] font-semibold">{preview.patient}</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      {preview.patientId}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Consultant
                    </p>
                    <p className="text-[12px] font-semibold">{preview.doctor}</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      {preview.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Date
                    </p>
                    <p className="tabular text-[11.5px] font-medium">
                      {preview.date} · {preview.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Follow-up
                    </p>
                    <p className="tabular text-[11.5px] font-medium">
                      {preview.followUp}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    Diagnosis
                  </p>
                  <p className="text-[12.5px] font-semibold">{preview.diagnosis}</p>
                  <p className="text-[11px] text-muted-foreground">{preview.symptoms}</p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="font-serif text-2xl font-semibold leading-none text-primary">
                    Rx
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-border">
                  <div className="grid grid-cols-[1.4fr_0.8fr_1.3fr_0.7fr] gap-2 border-b border-border bg-muted/50 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <span>Medicine</span>
                    <span>Dose</span>
                    <span>Frequency</span>
                    <span>Duration</span>
                  </div>
                  {preview.medicines.map((medicine, index) => (
                    <div
                      key={medicine.name}
                      className={cn(
                        "grid grid-cols-[1.4fr_0.8fr_1.3fr_0.7fr] gap-2 px-3 py-2.5 text-[11px]",
                        index !== preview.medicines.length - 1 && "border-b border-border/60",
                      )}
                    >
                      <span className="font-medium">
                        {index + 1}. {medicine.name}
                      </span>
                      <span className="text-muted-foreground">{medicine.dose}</span>
                      <span className="text-muted-foreground">{medicine.frequency}</span>
                      <span className="text-muted-foreground">{medicine.duration}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-dashed border-border p-3">
                  <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    Advice
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed">{preview.advice}</p>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <p className="text-[9.5px] text-muted-foreground">
                    Generated by MediCare · Verify before dispensing
                  </p>
                  <div className="text-center">
                    <p className="border-t border-foreground/50 px-8 pt-1 text-[10.5px] font-medium">
                      {preview.doctor}
                    </p>
                    <p className="text-[9px] text-muted-foreground">Signature</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="no-print border-t border-border/70 bg-muted/30 px-6 py-3 sm:justify-between">
                <p className="hidden text-[10.5px] text-muted-foreground sm:block">
                  Digitally issued · {preview.status}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() =>
                      toast.success("PDF downloaded", {
                        description: `${preview.id}.pdf saved to your device.`,
                      })
                    }
                  >
                    Download PDF
                  </Button>
                  <Button
                    className="rounded-xl"
                    onClick={() => {
                      window.print();
                      toast.success("Print dialog opened");
                    }}
                  >
                    <Printer className="size-4" />
                    Print
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
