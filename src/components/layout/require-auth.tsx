"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";

import { useSession } from "@/lib/session";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (ready && !user) {
      router.replace("/sign-in");
    }
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-svh place-items-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="grid size-11 animate-pulse place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
            <Stethoscope className="size-5" />
          </div>
          <p className="text-[12px] font-medium text-muted-foreground">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
