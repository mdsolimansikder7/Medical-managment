import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonAvatar } from "@/components/person-avatar";import { doctors } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

export function CareTeam() {
  const team = doctors.slice(0, 4);

  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Care team
          </CardTitle>
          <CardDescription className="text-[12px]">
            Availability across today&apos;s shifts
          </CardDescription>
        </div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary hover:underline"
        >
          All doctors
          <ArrowUpRight className="size-3" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-4">
        {team.map((doctor) => {
          const tone = accents[doctor.accent];
          const onDuty = doctor.status === "On duty";

          return (
            <div key={doctor.id} className="group space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <PersonAvatar
                    name={doctor.name}
                    accent={doctor.accent}
                    size="sm"
                  />
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card",
                      onDuty ? "bg-emerald-500" : doctor.status === "In surgery" ? "bg-amber-500" : "bg-slate-400",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold leading-tight">
                    {doctor.name}
                  </p>
                  <p className="truncate text-[10.5px] text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
                <span className="tabular text-[11px] font-semibold text-muted-foreground">
                  {doctor.availability}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", tone.solid)}
                  style={{ width: `${doctor.availability}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
