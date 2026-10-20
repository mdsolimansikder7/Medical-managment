import {
  CalendarClock,
  CheckCircle2,
  CreditCard,
  FlaskConical,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { activityFeed } from "@/lib/data";
import { accents, cn } from "@/lib/utils";

const icons: Record<number, LucideIcon> = {
  1: UserPlus,
  2: FlaskConical,
  3: CheckCircle2,
  4: CreditCard,
  5: CalendarClock,
};

export function ActivityFeed() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Recent activity
          </CardTitle>
          <CardDescription className="text-[12px]">
            Everything happening across the hospital
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </CardHeader>

      <CardContent className="px-5 py-4">
        <div className="relative space-y-4">
          <span className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-border" />
          {activityFeed.map((item) => {
            const Icon = icons[item.id] ?? CheckCircle2;
            const tone = accents[item.accent];

            return (
              <div key={item.id} className="relative flex gap-3">
                <div
                  className={cn(
                    "z-10 grid size-8 shrink-0 place-items-center rounded-full bg-card ring-1 ring-inset",
                    tone.soft,
                    tone.text,
                    tone.ring,
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12.5px] font-semibold leading-tight">
                      {item.title}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground/70">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
