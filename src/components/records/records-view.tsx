"use client";

import * as React from "react";
import {
  ClipboardList,
  FlaskConical,
  Pill,
  Scissors,
  Search,
  Stethoscope,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { medicalRecords, type MedicalRecord } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

const filters = ["All", "Prescription", "Lab report", "Surgery", "Diagnosis"] as const;
type Filter = (typeof filters)[number];

const typeAccent: Record<MedicalRecord["type"], MedicalRecord["accent"]> = {
  Prescription: "teal",
  "Lab report": "violet",
  Surgery: "amber",
  Diagnosis: "sky",
};

const typeIcon = {
  Prescription: Pill,
  "Lab report": FlaskConical,
  Surgery: Scissors,
  Diagnosis: Stethoscope,
} as const;

export function RecordsView() {
  const [filter, setFilter] = React.useState<Filter>("All");
  const [query, setQuery] = React.useState("");

  const filtered = medicalRecords.filter((record) => {
    const matchesFilter = filter === "All" || record.type === filter;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [record.patient, record.doctor, record.summary, record.department].some((value) =>
        value.toLowerCase().includes(term),
      );

    return matchesFilter && matchesQuery;
  });

  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="gap-3 border-b border-border/60 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              placeholder="Search records…"
              className="h-9 rounded-xl pl-8 text-[12px] sm:w-52"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5 p-4">
        {filtered.map((record) => {
          const tone = accents[typeAccent[record.type]];
          const Icon = typeIcon[record.type];

          return (
            <div
              key={record.id}
              className="group flex gap-3 rounded-xl border border-border/60 bg-card p-3.5 transition-all hover:border-border hover:bg-muted/30"
            >
              <div
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl ring-1 ring-inset",
                  tone.soft,
                  tone.text,
                  tone.ring,
                )}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-[12.5px] font-semibold">{record.patient}</p>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                      tone.soft,
                      tone.text,
                    )}
                  >
                    {record.type}
                  </span>
                  <span className="ml-auto text-[10.5px] text-muted-foreground/80">
                    {record.date}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                  {record.summary}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] text-muted-foreground/80">
                  <span className="inline-flex items-center gap-1">
                    <ClipboardList className="size-2.5" />
                    {record.id}
                  </span>
                  <span className="text-border">·</span>
                  <span>{record.doctor}</span>
                  <span className="text-border">·</span>
                  <span>{record.department}</span>
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
            <p className="mt-3 text-[13px] font-semibold">No records found</p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Try another category or a different search term.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
