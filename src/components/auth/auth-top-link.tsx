"use client";

import Link from "next/link";

import { useSession } from "@/lib/session";

export function AuthTopLink({ mode }: { mode: "sign-in" | "sign-up" }) {
  const { user, ready } = useSession();

  if (!ready) {
    return <span className="h-4 w-24" aria-hidden />;
  }

  if (user) {
    return (
      <Link
        href="/"
        className="text-[11.5px] font-medium text-muted-foreground transition hover:text-foreground"
      >
        Back to dashboard
      </Link>
    );
  }

  return (
    <Link
      href={mode === "sign-in" ? "/sign-up" : "/sign-in"}
      className="text-[11.5px] font-medium text-muted-foreground transition hover:text-foreground"
    >
      {mode === "sign-in" ? "Create an account" : "Sign in instead"}
    </Link>
  );
}
