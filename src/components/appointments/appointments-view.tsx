"use client";

import * as React from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { appointments, type Appointment } from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs = ["All", "Scheduled", "In progress", "Completed", "Cancelled"] as const;
type Tab = (typeof tabs)[number];

const typeStyles: Record<Appointment["type"], string> = {
  Consultation: "bg-teal-500",
  "Follow-up": "bg-violet-500",
  "Check-up": "bg-sky-500",
  Emergency: "bg-rose-500",
};

export function AppointmentsView() {
  const [tab, setTab] = React.useState<Tab>("All");
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState(appointments);

  const counts = React.useMemo(
    () =>
      tabs.reduce<Record<string, number>>((acc, item) => {
        acc[item] =
          item === "All"
            ? rows.length
            : rows.filter((row) => row.status === item).length;
        return acc;
      }, {}),
    [rows],
  );

  const filtered = rows.filter((row) => {
    const matchesTab = tab === "All" || row.status === tab;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [row.patient, row.doctor, row.department, row.id, row.type].some((value) =>
        value.toLowerCase().includes(term),
      );
    return matchesTab && matchesQuery;
  });

  function cancelAppointment(id: string) {
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, status: "Cancelled" } : row,
      ),
    );
    toast.info("Appointment cancelled", {
      description: `${id} has been marked as cancelled and the patient notified.`,
    });
  }

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="gap-4 border-b border-border/60 px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}>
            <TabsList className="h-9 w-full justify-start gap-1 rounded-xl bg-muted/70 p-1 lg:w-auto">
              {tabs.map((item) => (
                <TabsTrigger
                  key={item}
                  value={item}
                  className="h-7 flex-1 gap-1.5 rounded-lg px-2.5 text-[11.5px] font-semibold data-[state=active]:shadow-sm lg:flex-none"
                >
                  {item}
                  <span
                    className={cn(
                      "tabular rounded px-1 text-[10px] font-semibold",
                      tab === item
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground/70",
                    )}
                  >
                    {counts[item]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="relative w-full lg:w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search appointments…"
                className="h-9 rounded-xl pl-8 pr-8 text-[12px]"
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
            <Button
              variant="outline"
              size="icon"
              aria-label="Filters"
              className="size-9 shrink-0 rounded-xl text-muted-foreground"
              onClick={() =>
                toast.info("Advanced filters", {
                  description: "Filter by department, doctor or date range.",
                })
              }
            >
              <SlidersHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                {[
                  "Patient",
                  "Doctor",
                  "Date & time",
                  "Type",
                  "Status",
                  "Room",
                ].map((head) => (
                  <TableHead
                    key={head}
                    className={cn(
                      "h-9 whitespace-nowrap pl-5 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                      head === "Patient" && "pl-5",
                      head !== "Patient" && "pl-4",
                    )}
                  >
                    {head}
                  </TableHead>
                ))}
                <TableHead className="h-9 w-10 pr-5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => {
                const [clock, meridiem] = row.time.split(" ");

                return (
                  <TableRow
                    key={row.id}
                    className="border-border/50 transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="py-3 pl-5">
                      <div className="flex items-center gap-2.5">
                        <PersonAvatar
                          name={row.patient}
                          accent={row.accent}
                          size="xs"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-semibold leading-tight">
                            {row.patient}
                          </p>
                          <p className="text-[10.5px] text-muted-foreground">
                            {row.id} · {row.patientId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <p className="text-[12px] font-medium">{row.doctor}</p>
                      <p className="text-[10.5px] text-muted-foreground">
                        {row.department}
                      </p>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <p className="tabular text-[12px] font-medium">
                        {clock} {meridiem}
                      </p>
                      <p className="text-[10.5px] text-muted-foreground">{row.date}</p>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-muted-foreground">
                        <span className={cn("size-1.5 rounded-full", typeStyles[row.type])} />
                        {row.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="tabular py-3 pl-4 text-[12px] text-muted-foreground">
                      {row.room}
                    </TableCell>
                    <TableCell className="py-3 pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${row.id}`}
                            className="size-7 rounded-lg text-muted-foreground"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl">
                          <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                            {row.id}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 rounded-lg text-[12px]">
                            <CalendarDays className="size-3.5 text-muted-foreground" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 rounded-lg text-[12px] text-rose-600 focus:text-rose-600 dark:text-rose-400"
                            onClick={() => cancelAppointment(row.id)}
                          >
                            <X className="size-3.5" />
                            Cancel appointment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
              <Search className="size-5" />
            </div>
            <p className="mt-3 text-[13px] font-semibold">No appointments found</p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Try adjusting your search or switch to another tab.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between border-t border-border/60 px-5 py-3">
        <p className="text-[11.5px] text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          of {rows.length} appointments
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="rounded-lg"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="tabular px-2 text-[11.5px] font-medium">Page 1 of 1</span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="rounded-lg"
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
