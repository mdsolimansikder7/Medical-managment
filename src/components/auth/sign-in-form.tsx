"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Eye, EyeOff, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/session";

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useSession();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const result = signIn({ email, password });

    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }

    toast.success("Welcome back", { description: "You are signed in to MediCare." });
    router.replace("/");
  }

  function fillDemo() {
    setEmail("admin@medicare.com");
    setPassword("medicare123");
    setError("");
    toast.info("Demo credentials filled", {
      description: "Press Sign in to open the administrator workspace.",
    });
  }

  function handleForgotPassword() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter your email first, then request a reset link.");
      return;
    }

    toast.success("Reset link sent", {
      description: `Check ${email.trim()} for password reset instructions.`,
    });
  }

  return (
    <div className="animate-in-up">
      <div className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Welcome back
        </p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight">
          Sign in to MediCare
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
          Continue managing patients, appointments and clinical records.
        </p>
      </div>

      <button
        type="button"
        onClick={fillDemo}
        className="group mb-5 flex w-full items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] px-3.5 py-2.5 text-left transition hover:border-primary/35 hover:bg-primary/[0.07]"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] font-semibold">Use the demo account</span>
          <span className="block text-[10.5px] text-muted-foreground">
            admin@medicare.com · Super Admin access
          </span>
        </span>
        <ArrowRight className="size-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
      </button>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2.5 text-[11.5px] text-rose-700 dark:text-rose-300">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-[12px]">
            Email address
          </Label>
          <Input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="you@medicare.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password" className="text-[12px]">
              Password
            </Label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[11px] font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10 rounded-xl pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="signin-remember"
            checked={remember}
            onCheckedChange={(value) => setRemember(value === true)}
          />
          <Label
            htmlFor="signin-remember"
            className="text-[11.5px] font-normal text-muted-foreground"
          >
            Keep me signed in on this device
          </Label>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="h-10 w-full rounded-xl shadow-sm shadow-primary/25"
        >
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-[12px] text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
