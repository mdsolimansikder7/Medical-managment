"use client";

import * as React from "react";
import {
  ArrowUpRight,
  CalendarPlus,
  Phone,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { doctors } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

export function DoctorDirectory() {
  const [department, setDepartment] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const departments = ["All", ...Array.from(new Set(doctors.map((item) => item.department)))];

  const filtered = doctors.filter((doctor) => {
    const matchesDepartment =
      department === "All" || doctor.department === department;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [doctor.name, doctor.specialty, doctor.department].some((value) =>
        value.toLowerCase().includes(term),
      );

    return matchesDepartment && matchesQuery;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-[0_1px_2px_rgba(16,24,40,0.03)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {departments.map((item) => (
            <button
              key={item}
              onClick={() => setDepartment(item)}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                department === item
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
            placeholder="Search doctors…"
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

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/70 bg-card px-5 py-16 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
            <Search className="size-5" />
          </div>
          <p className="mt-3 text-[13px] font-semibold">No doctors found</p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Try a different department or search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((doctor) => {
            const tone = accents[doctor.accent];

            return (
              <article
                key={doctor.id}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-22px_rgba(16,24,40,0.4)]"
              >
                <div className={cn("h-1 w-full bg-gradient-to-r", tone.gradient)} />

                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <PersonAvatar name={doctor.name} accent={doctor.accent} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-semibold leading-tight">
                        {doctor.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {doctor.specialty}
                      </p>
                    </div>
                    <StatusBadge status={doctor.status} dot={false} />
                  </div>

                  <div className="mt-3 grid grid-cols-3 divide-x divide-border/60 rounded-xl border border-border/60 bg-muted/30 py-2">
                    <div className="px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="tabular text-[12px] font-semibold">
                          {doctor.rating}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[9.5px] uppercase tracking-wide text-muted-foreground/80">
                        Rating
                      </p>
                    </div>
                    <div className="px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="size-3 text-muted-foreground" />
                        <span className="tabular text-[12px] font-semibold">
                          {doctor.patients.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[9.5px] uppercase tracking-wide text-muted-foreground/80">
                        Patients
                      </p>
                    </div>
                    <div className="px-2 text-center">
                      <p className="tabular text-[12px] font-semibold leading-5">
                        {doctor.experience} yrs
                      </p>
                      <p className="mt-0.5 text-[9.5px] uppercase tracking-wide text-muted-foreground/80">
                        Experience
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-medium text-muted-foreground">
                        Availability today
                      </span>
                      <span className="tabular font-semibold">{doctor.availability}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", tone.solid)}
                        style={{ width: `${doctor.availability}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center gap-2">
                    <Button
                      className="h-8 flex-1 rounded-lg text-[11.5px]"
                      onClick={() =>
                        toast.success("Slot requested", {
                          description: `Booking request sent to ${doctor.name}.`,
                        })
                      }
                    >
                      <CalendarPlus className="size-3.5" />
                      Book
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={`Call ${doctor.name}`}
                      className="rounded-lg text-muted-foreground"
                      onClick={() =>
                        toast.info(doctor.phone, {
                          description: `Calling ${doctor.name}…`,
                        })
                      }
                    >
                      <Phone className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`View ${doctor.name}`}
                      className="rounded-lg text-muted-foreground"
                      onClick={() => toast.info(`${doctor.name} · ${doctor.department}`)}
                    >
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
