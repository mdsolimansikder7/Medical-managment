"use client";

import * as React from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarPlus,
  Droplets,
  HeartPulse,
  Mail,
  Phone,
  Search,
  SlidersHorizontal,
  Thermometer,
  Wind,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import {
  medicalRecords,
  patients,
  type Patient,
  type PatientStatus,
} from "@/lib/data";
import { accents, cn } from "@/lib/utils";

const statuses: ("All" | PatientStatus)[] = [
  "All",
  "Active",
  "Critical",
  "Recovered",
  "New",
];

function vitalsList(patient: Patient) {
  return [
    { label: "Heart rate", value: patient.vitals.heartRate, icon: HeartPulse, accent: "rose" as const },
    { label: "Blood pressure", value: patient.vitals.bloodPressure, icon: Activity, accent: "violet" as const },
    { label: "Temperature", value: patient.vitals.temperature, icon: Thermometer, accent: "amber" as const },
    { label: "Oxygen", value: patient.vitals.oxygen, icon: Wind, accent: "sky" as const },
  ];
}

export function PatientDirectory() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | PatientStatus>("All");
  const [department, setDepartment] = React.useState("all");
  const [selected, setSelected] = React.useState<Patient | null>(null);

  const departments = Array.from(new Set(patients.map((item) => item.department)));

  const filtered = patients.filter((patient) => {
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [patient.name, patient.id, patient.condition, patient.department].some((value) =>
        value.toLowerCase().includes(term),
      );
    const matchesStatus = status === "All" || patient.status === status;
    const matchesDepartment =
      department === "all" || patient.department === department;

    return matchesQuery && matchesStatus && matchesDepartment;
  });

  const counts = React.useMemo(
    () =>
      statuses.reduce<Record<string, number>>((acc, item) => {
        acc[item] =
          item === "All"
            ? patients.length
            : patients.filter((patient) => patient.status === item).length;
        return acc;
      }, {}),
    [],
  );

  const records = selected
    ? medicalRecords.filter((record) => record.patient === selected.name)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-[0_1px_2px_rgba(16,24,40,0.03)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {statuses.map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                status === item
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item}
              <span
                className={cn(
                  "tabular rounded px-1 text-[10px]",
                  status === item
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground/80",
                )}
              >
                {counts[item]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patients…"
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
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="h-9 w-full rounded-xl text-[12px] sm:w-44">
              <SlidersHorizontal className="mr-1 size-3.5 text-muted-foreground" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/70 bg-card px-5 py-16 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
            <Search className="size-5" />
          </div>
          <p className="mt-3 text-[13px] font-semibold">No patients found</p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Try a different search term or clear the filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => setSelected(patient)}
              className="group text-left"
            >
              <article className="relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_14px_30px_-20px_rgba(16,24,40,0.35)]">
                <div className="flex items-start gap-3">
                  <PersonAvatar name={patient.name} accent={patient.accent} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold leading-tight">
                      {patient.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {patient.id} · {patient.age} yrs · {patient.gender}
                    </p>
                  </div>
                  <StatusBadge status={patient.status} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10.5px] font-medium text-muted-foreground">
                    <Activity className="size-2.5" />
                    {patient.condition}
                  </span>
                  <span className="rounded-md bg-primary/[0.07] px-1.5 py-0.5 text-[10.5px] font-medium text-primary">
                    {patient.department}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/[0.07] px-1.5 py-0.5 text-[10.5px] font-medium text-rose-600 dark:text-rose-400">
                    <Droplets className="size-2.5" />
                    {patient.bloodGroup}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 divide-x divide-border/60 rounded-xl border border-border/60 bg-muted/30 py-2">
                  <div className="px-1 text-center">
                    <p className="text-[9.5px] font-medium uppercase tracking-wide text-muted-foreground/80">
                      Heart rate
                    </p>
                    <p className="tabular mt-0.5 text-[11.5px] font-semibold">
                      {patient.vitals.heartRate}
                    </p>
                  </div>
                  <div className="px-1 text-center">
                    <p className="text-[9.5px] font-medium uppercase tracking-wide text-muted-foreground/80">
                      BP
                    </p>
                    <p className="tabular mt-0.5 text-[11.5px] font-semibold">
                      {patient.vitals.bloodPressure}
                    </p>
                  </div>
                  <div className="px-1 text-center">
                    <p className="text-[9.5px] font-medium uppercase tracking-wide text-muted-foreground/80">
                      SpO₂
                    </p>
                    <p className="tabular mt-0.5 text-[11.5px] font-semibold">
                      {patient.vitals.oxygen}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10.5px] text-muted-foreground">
                    Last visit · {patient.lastVisit}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-70 transition group-hover:opacity-100">
                    View profile
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </article>
            </button>
          ))}
        </div>
      )}

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
          {selected && (
            <>
              <SheetHeader className="gap-4 border-b border-border/70 px-5 py-5">
                <div className="flex items-start gap-3">
                  <PersonAvatar name={selected.name} accent={selected.accent} size="xl" />
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="truncate text-[17px] tracking-tight">
                      {selected.name}
                    </SheetTitle>
                    <SheetDescription className="mt-0.5 text-[11.5px]">
                      {selected.id} · {selected.age} yrs · {selected.gender}
                    </SheetDescription>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 rounded-xl"
                    onClick={() =>
                      toast.success("Appointment booked", {
                        description: `${selected.name} is queued for the next available slot.`,
                      })
                    }
                  >
                    <CalendarPlus className="size-4" />
                    Book appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => toast.info("Patient record opened")}
                  >
                    Open record
                  </Button>
                </div>
              </SheetHeader>

              <div className="space-y-6 p-5">
                <section className="space-y-2.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Vitals today
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vitalsList(selected).map((vital) => {
                      const tone = accents[vital.accent];
                      const Icon = vital.icon;

                      return (
                        <div
                          key={vital.label}
                          className="rounded-xl border border-border/60 bg-muted/30 p-2.5"
                        >
                          <div className="flex items-center gap-1.5">
                            <Icon className={cn("size-3.5", tone.text)} />
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {vital.label}
                            </span>
                          </div>
                          <p className="tabular mt-1 text-[14px] font-semibold">
                            {vital.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Contact
                  </h3>
                  <div className="space-y-1.5 rounded-xl border border-border/60 p-3">
                    <div className="flex items-center gap-2 text-[12px]">
                      <Phone className="size-3.5 text-muted-foreground" />
                      {selected.phone}
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <span className="truncate">{selected.email}</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Clinical summary
                  </h3>
                  <dl className="divide-y divide-border/60 rounded-xl border border-border/60">
                    {[
                      ["Condition", selected.condition],
                      ["Department", selected.department],
                      ["Primary doctor", selected.doctor],
                      ["Room", selected.room],
                      ["Admitted", selected.admitted],
                      ["Last visit", selected.lastVisit],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 px-3 py-2 text-[12px]"
                      >
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className="space-y-2">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Recent records
                  </h3>
                  {records.length > 0 ? (
                    <div className="space-y-2">
                      {records.map((record) => (
                        <div
                          key={record.id}
                          className="rounded-xl border border-border/60 p-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[12px] font-semibold">{record.type}</p>
                            <span className="text-[10px] text-muted-foreground">
                              {record.date.split(" · ")[0]}
                            </span>
                          </div>
                          <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                            {record.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-border/70 px-3 py-6 text-center text-[11.5px] text-muted-foreground">
                      No recent records for this patient.
                    </p>
                  )}
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
