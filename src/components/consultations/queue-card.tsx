import { ArrowRight, Ticket } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { queueTokens } from "@/lib/data";
import { cn } from "@/lib/utils";

export function QueueCard() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Token queue
          </CardTitle>
          <CardDescription className="text-[12px]">
            OPD block · live waiting list
          </CardDescription>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {queueTokens.map((token) => (
          <div
            key={token.token}
            className="flex items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-muted/60"
          >
            <div
              className={cn(
                "grid h-8 w-11 shrink-0 place-items-center rounded-lg text-[10.5px] font-semibold",
                token.status === "In consultation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {token.token}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold leading-tight">
                {token.patient}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                {token.doctor}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={token.status} dot={false} />
              <span className="text-[9.5px] text-muted-foreground/80">
                {token.wait}
              </span>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
          <Ticket className="size-3" />
          Next token T-22
        </span>
        <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-primary">
          Manage queue
          <ArrowRight className="size-3" />
        </span>
      </div>
    </Card>
  );
}
