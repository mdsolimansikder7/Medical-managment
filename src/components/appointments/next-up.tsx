import { ArrowRight, Clock3 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { appointments } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

export function NextUp() {
  const queue = appointments.filter((item) => item.status !== "Cancelled").slice(0, 4);

  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Live queue
          </CardTitle>
          <CardDescription className="text-[12px]">
            Patients waiting across OPD blocks
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {queue.map((item) => {
          const tone = accents[item.accent];

          return (
            <div
              key={item.id}
              className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-muted/60"
            >
              <div
                className={cn(
                  "flex w-[54px] shrink-0 flex-col items-center rounded-lg py-1.5",
                  tone.soft,
                  tone.text,
                )}
              >
                <Clock3 className="size-3" />
                <span className="tabular mt-0.5 text-[10px] font-semibold">
                  {item.time.split(" ")[0]}
                </span>
              </div>
              <PersonAvatar name={item.patient} accent={item.accent} size="xs" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold leading-tight">
                  {item.patient}
                </p>
                <p className="truncate text-[10.5px] text-muted-foreground">
                  {item.doctor} · {item.room}
                </p>
              </div>
              <StatusBadge status={item.status} dot={false} />
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
