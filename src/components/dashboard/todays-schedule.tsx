import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { appointments } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

export function TodaysSchedule() {
  const todays = appointments.filter((item) => item.date === "Oct 20, 2026").slice(0, 5);

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Today&apos;s schedule
          </CardTitle>
          <CardDescription className="text-[12px]">
            {todays.length} appointments · Tue, Oct 20
          </CardDescription>
        </div>
        <Button
          asChild
          variant="outline"
          size="icon-sm"
          className="shrink-0 rounded-lg text-muted-foreground"
        >
          <Link href="/appointments" aria-label="Open calendar">
            <CalendarDays className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-2.5">
        <div className="space-y-0.5">
          {todays.map((item) => {
            const [clock, meridiem] = item.time.split(" ");
            const tone = accents[item.accent];
            const live = item.status === "In progress";

            return (
              <div
                key={item.id}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors",
                  live ? "bg-teal-500/[0.06]" : "hover:bg-muted/60",
                )}
              >
                <div className="w-[52px] shrink-0 text-right">
                  <p className="tabular text-[12.5px] font-semibold leading-tight">
                    {clock}
                  </p>
                  <p className="text-[10px] font-medium uppercase text-muted-foreground/80">
                    {meridiem}
                  </p>
                </div>

                <div className="flex flex-col items-center self-stretch pt-1.5">
                  <span
                    className={cn(
                      "relative flex size-2 shrink-0 rounded-full",
                      tone.solid,
                      live && "ring-4 ring-teal-500/15",
                    )}
                  />
                  <span className="mt-1 w-px flex-1 rounded-full bg-border" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[12.5px] font-semibold">{item.patient}</p>
                    <StatusBadge status={item.status} className="hidden sm:inline-flex" />
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {item.doctor} · {item.room}
                  </p>
                </div>

                <PersonAvatar
                  name={item.patient}
                  accent={item.accent}
                  size="sm"
                  className="hidden sm:grid"
                />
              </div>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="mt-auto border-t border-border/60 px-3 py-2.5">
        <Link
          href="/appointments"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[12px] font-semibold text-primary transition hover:bg-accent/60"
        >
          View full schedule
          <ArrowRight className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
