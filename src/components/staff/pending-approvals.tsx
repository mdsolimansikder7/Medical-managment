"use client";

import * as React from "react";
import { Check, Clock3, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  approveDoctor,
  getPendingDoctors,
  rejectDoctor,
  type DoctorRequest,
} from "@/lib/accounts";
import { useSession } from "@/lib/session";
import { initials } from "@/lib/utils";

function formatApplied(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PendingApprovals() {
  const { user } = useSession();
  const [requests, setRequests] = React.useState<DoctorRequest[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setRequests(getPendingDoctors());
    setReady(true);
  }, []);

  const canReview = user?.role === "Super Admin" || user?.role === "Administrator";

  if (!ready || !canReview || requests.length === 0) {
    return null;
  }

  function handleApprove(request: DoctorRequest) {
    const result = approveDoctor(request.email);

    if (!result.ok) {
      toast.error("Could not approve request", { description: result.error });
      return;
    }

    setRequests((current) => current.filter((item) => item.email !== request.email));
    toast.success(`${request.name} approved`, {
      description: "They can now sign in as a Doctor with their work email.",
    });
  }

  function handleReject(request: DoctorRequest) {
    rejectDoctor(request.email);
    setRequests((current) => current.filter((item) => item.email !== request.email));
    toast.success("Application declined", {
      description: `${request.name}'s request has been removed.`,
    });
  }

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-amber-500/25 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60 bg-amber-500/[0.04] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <CardTitle className="text-[15px] font-semibold tracking-tight">
              Doctor approvals
            </CardTitle>
            <CardDescription className="text-[12px]">
              Self-registered doctors waiting for activation.
            </CardDescription>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10.5px] font-semibold text-amber-700 dark:text-amber-400">
          <Clock3 className="size-3" />
          {requests.length} pending
        </span>
      </CardHeader>

      <CardContent className="divide-y divide-border/50 px-5 py-1">
        {requests.map((request) => (
          <div
            key={request.email}
            className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center"
          >
            <Avatar className="size-9">
              <AvatarFallback className="bg-gradient-to-br from-teal-500/20 to-emerald-500/10 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                {initials(request.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-semibold">{request.name}</p>
              <p className="truncate text-[10.5px] text-muted-foreground">
                {request.email} · Applied {formatApplied(request.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px]"
                onClick={() => handleApprove(request)}
              >
                <Check className="size-3.5" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-lg bg-card px-3 text-[11px]"
                onClick={() => handleReject(request)}
              >
                <X className="size-3.5" />
                Decline
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="border-t border-border/60 px-5 py-2.5">
        <p className="text-[10.5px] text-muted-foreground">
          Approved doctors get clinical access immediately. Only a Super Admin can review
          applications.
        </p>
      </div>
    </Card>
  );
}
