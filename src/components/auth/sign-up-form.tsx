"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/session";

export function SignUpForm() {
  const { signUp } = useSession();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [submittedEmail, setSubmittedEmail] = React.useState("");

  const strength =
    password.length >= 10 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;
  const firstName = name.trim().replace(/^Dr\.\s*/i, "").split(/\s+/)[0] || "Doctor";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please accept the terms of service to continue.");
      return;
    }

    // Public registration is limited to doctors. The request stays pending
    // until a Super Admin approves it from Staff & roles.
    const result = signUp({ name, email, password });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmittedEmail(email.trim().toLowerCase());
  }

  if (submittedEmail) {
    return (
      <div className="animate-in-up text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400">
          <CheckCircle2 className="size-7" />
        </div>

        <h1 className="mt-5 text-[25px] font-semibold leading-tight tracking-tight">
          Application received
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
          Thanks, {firstName}. Your doctor account is pending review — a Super Admin will
          activate it from Staff &amp; roles.
        </p>

        <div className="mt-6 rounded-2xl border border-border/70 bg-muted/20 p-4 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Application status
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Check className="size-3.5" />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold">Request submitted</p>
                <p className="text-[10.5px] text-muted-foreground">
                  Doctor registration · {submittedEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Clock3 className="size-3.5" />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold">Super Admin review</p>
                <p className="text-[10.5px] text-muted-foreground">
                  Credentials and department are verified.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                <ShieldCheck className="size-3.5" />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold">Account activated</p>
                <p className="text-[10.5px] text-muted-foreground">
                  Sign in with this email once approved.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button asChild className="mt-5 h-10 w-full rounded-xl">
          <Link href="/sign-in">Back to sign in</Link>
        </Button>
        <p className="mt-3 text-[10.5px] text-muted-foreground">
          Need to check the status? Your administrator can see the request under Staff &amp;
          roles.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in-up">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Doctor registration
        </p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight">
          Apply as a doctor
        </h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
          Public sign-up is for doctors only. A Super Admin reviews every application
          before activation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] px-3 py-2.5 text-[11.5px] text-rose-700 dark:text-rose-300">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-[12px]">
            Full name
          </Label>
          <Input
            id="signup-name"
            autoComplete="name"
            placeholder="e.g. Dr. Rezaul Karim"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-10 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-[12px]">
            Work email
          </Label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="name@medicare.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/25 px-3 py-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Stethoscope className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-semibold">Requested role · Doctor</p>
            <p className="text-[10.5px] text-muted-foreground">
              Clinical access, activated after approval
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-amber-500/10 px-1.5 py-1 text-[9.5px] font-semibold text-amber-700 dark:text-amber-400">
            Approval required
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-[12px]">
            Password
          </Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 6 characters"
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
          {strength > 0 && (
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={
                    strength >= level
                      ? strength === 1
                        ? "h-1 flex-1 rounded-full bg-rose-500"
                        : strength === 2
                          ? "h-1 flex-1 rounded-full bg-amber-500"
                          : "h-1 flex-1 rounded-full bg-emerald-500"
                      : "h-1 flex-1 rounded-full bg-muted"
                  }
                />
              ))}
              <span className="ml-1 w-12 text-right text-[9.5px] text-muted-foreground">
                {strength === 1 ? "Weak" : strength === 2 ? "Good" : "Strong"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-confirm" className="text-[12px]">
            Confirm password
          </Label>
          <Input
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className="h-10 rounded-xl"
          />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="signup-terms"
            checked={terms}
            onCheckedChange={(value) => setTerms(value === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="signup-terms"
            className="block flex-1 text-[11.5px] font-normal leading-relaxed text-muted-foreground"
          >
            I agree to the{" "}
            <span className="font-medium text-foreground">terms of service</span> and{" "}
            <span className="font-medium text-foreground">privacy policy</span>.
          </Label>
        </div>

        <Button
          type="submit"
          className="h-10 w-full rounded-xl shadow-sm shadow-primary/25"
        >
          Submit application
        </Button>
      </form>

      <div className="mt-4 rounded-xl border border-border/60 bg-muted/25 px-3 py-2.5 text-[10.5px] leading-relaxed text-muted-foreground">
        Reception, laboratory, pharmacy, billing and administration accounts are created
        by your Super Admin from <span className="font-medium text-foreground">Staff &amp; roles</span>.
      </div>

      <p className="mt-4 text-center text-[12px] text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
