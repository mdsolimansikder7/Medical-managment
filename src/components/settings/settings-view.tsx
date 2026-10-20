"use client";

import * as React from "react";
import Link from "next/link";
import {
  BellRing,
  CalendarClock,
  Check,
  FlaskConical,
  Globe2,
  LifeBuoy,
  Mail,
  Monitor,
  Moon,
  Package,
  Palette,
  ReceiptText,
  RotateCcw,
  Save,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/lib/session";
import { initials } from "@/lib/utils";

const STORAGE_KEY = "medicare.preferences";

type Preferences = {
  reminders: boolean;
  labResults: boolean;
  lowStock: boolean;
  billing: boolean;
  dailyDigest: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  twoFactor: boolean;
  autoSignOut: string;
};

const defaults: Preferences = {
  reminders: true,
  labResults: true,
  lowStock: true,
  billing: false,
  dailyDigest: true,
  language: "English (UK)",
  timezone: "Asia/Dhaka (GMT+6)",
  dateFormat: "DD MMM YYYY",
  twoFactor: false,
  autoSignOut: "30 minutes",
};

const notificationOptions = [
  {
    key: "reminders" as const,
    title: "Appointment reminders",
    detail: "Get notified 30 minutes before a patient is due.",
    icon: CalendarClock,
  },
  {
    key: "labResults" as const,
    title: "Lab results ready",
    detail: "Alert me when a report is approved or needs review.",
    icon: FlaskConical,
  },
  {
    key: "lowStock" as const,
    title: "Pharmacy stock alerts",
    detail: "Low stock and expiring medicine warnings.",
    icon: Package,
  },
  {
    key: "billing" as const,
    title: "Billing & payments",
    detail: "Invoice settlements, refunds and overdue balances.",
    icon: ReceiptText,
  },
  {
    key: "dailyDigest" as const,
    title: "Daily summary email",
    detail: "A 7:00 AM digest of yesterday's hospital activity.",
    icon: Mail,
  },
];

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function SettingsView() {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [preferences, setPreferences] = React.useState<Preferences>(defaults);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences({ ...defaults, ...(JSON.parse(stored) as Partial<Preferences>) });
      }
    } catch {
      setPreferences(defaults);
    }
  }, []);

  const activeTheme = mounted ? (theme ?? "light") : "light";
  const enabledNotifications = notificationOptions.filter(
    (option) => preferences[option.key],
  ).length;

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function handleSave() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      toast.error("Could not save preferences", {
        description: "Your browser blocked local storage.",
      });
      return;
    }

    toast.success("Preferences saved", {
      description: "Your workspace now follows these settings.",
    });
  }

  function handleReset() {
    setPreferences(defaults);
    setTheme("light");
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    } catch {
      // Reset still applies for this session.
    }
    toast.success("Preferences reset", { description: "Back to MediCare defaults." });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight sm:text-[24px]">
            Settings
          </h1>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            Personalise your workspace — appearance, alerts, regional formats and security.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" className="rounded-xl bg-card" onClick={handleReset}>
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button className="rounded-xl shadow-sm shadow-primary/25" onClick={handleSave}>
            <Save className="size-4" />
            Save preferences
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Palette className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Appearance
                  </CardTitle>
                  <CardDescription className="text-[12px]">
                    Choose how MediCare looks on this device.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const active = activeTheme === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setTheme(option.value);
                        toast.success(`${option.label} theme applied`);
                      }}
                      className={`group relative overflow-hidden rounded-xl border p-2.5 text-left transition ${
                        active
                          ? "border-primary/50 bg-primary/[0.04] ring-1 ring-primary/25"
                          : "border-border/70 hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`mb-2.5 h-16 overflow-hidden rounded-lg border ${
                          option.value === "dark"
                            ? "border-slate-700 bg-slate-900"
                            : option.value === "light"
                              ? "border-slate-200 bg-slate-50"
                              : "border-slate-200 bg-gradient-to-r from-slate-50 to-slate-900"
                        }`}
                      >
                        <div className="flex h-full">
                          <div
                            className={`w-8 border-r ${
                              option.value === "dark"
                                ? "border-slate-700 bg-slate-950"
                                : option.value === "light"
                                  ? "border-slate-200 bg-white"
                                  : "border-slate-300 bg-white/90"
                            }`}
                          >
                            <div className="mx-1.5 mt-2 h-1 rounded-full bg-teal-500" />
                            <div className="mx-1.5 mt-1.5 h-0.5 rounded-full bg-slate-300" />
                            <div className="mx-1.5 mt-1 h-0.5 rounded-full bg-slate-300" />
                            <div className="mx-1.5 mt-1 h-0.5 w-3 rounded-full bg-slate-300" />
                          </div>
                          <div className="flex-1 space-y-1.5 p-2">
                            <div className="h-1.5 w-10 rounded-full bg-slate-300/80" />
                            <div className="flex gap-1.5">
                              <div className="h-5 flex-1 rounded bg-teal-500/15" />
                              <div className="h-5 flex-1 rounded bg-teal-500/10" />
                            </div>
                            <div className="h-3 rounded bg-slate-300/40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="size-3.5 text-muted-foreground" />
                        <span className="text-[11.5px] font-medium">{option.label}</span>
                        {active && (
                          <span className="ml-auto grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-2.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <BellRing className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Notifications
                  </CardTitle>
                  <CardDescription className="text-[12px]">
                    Pick the updates you want to hear about.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-1.5">
              {notificationOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <div
                    key={option.key}
                    className="flex items-center gap-3 border-b border-border/50 py-3.5 last:border-0"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold">{option.title}</p>
                      <p className="text-[10.5px] leading-relaxed text-muted-foreground">
                        {option.detail}
                      </p>
                    </div>
                    <Switch
                      checked={preferences[option.key]}
                      onCheckedChange={(value) => update(option.key, value)}
                      aria-label={option.title}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Globe2 className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Regional preferences
                  </CardTitle>
                  <CardDescription className="text-[12px]">
                    Language, time zone and how dates and money are shown.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[12px]">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => update("language", value)}
                  >
                    <SelectTrigger className="h-10 w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English (UK)">English (UK)</SelectItem>
                      <SelectItem value="English (US)">English (US)</SelectItem>
                      <SelectItem value="বাংলা">বাংলা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Time zone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => update("timezone", value)}
                  >
                    <SelectTrigger className="h-10 w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Dhaka (GMT+6)">Asia/Dhaka (GMT+6)</SelectItem>
                      <SelectItem value="Asia/Kolkata (GMT+5:30)">
                        Asia/Kolkata (GMT+5:30)
                      </SelectItem>
                      <SelectItem value="Asia/Dubai (GMT+4)">Asia/Dubai (GMT+4)</SelectItem>
                      <SelectItem value="Europe/London (GMT+0)">Europe/London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Date format</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) => update("dateFormat", value)}
                  >
                    <SelectTrigger className="h-10 w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD MMM YYYY">DD MMM YYYY · 20 Oct 2026</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY · 20/10/2026</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY · 10/20/2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Currency</Label>
                  <div className="flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-3">
                    <span className="text-[12.5px] font-semibold text-foreground">৳ BDT</span>
                    <span className="text-[10.5px] text-muted-foreground">
                      Bangladeshi Taka · fixed
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Security
                  </CardTitle>
                  <CardDescription className="text-[12px]">
                    Protect clinical data on shared workstations.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold">Two-factor authentication</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    Ask for a one-time code on unrecognised devices.
                  </p>
                </div>
                <Switch
                  checked={preferences.twoFactor}
                  onCheckedChange={(value) => {
                    update("twoFactor", value);
                    toast.success(value ? "Two-factor enabled" : "Two-factor disabled");
                  }}
                  aria-label="Two-factor authentication"
                />
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold">Automatic sign-out</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    Sign out after a period of inactivity.
                  </p>
                </div>
                <Select
                  value={preferences.autoSignOut}
                  onValueChange={(value) => update("autoSignOut", value)}
                >
                  <SelectTrigger className="h-9 w-full rounded-xl sm:w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15 minutes">15 minutes</SelectItem>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="Never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold">Sign out everywhere</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    Revoke access on all other browsers and devices.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl bg-card"
                  onClick={() =>
                    toast.success("Other sessions revoked", {
                      description: "Only this browser is still signed in.",
                    })
                  }
                >
                  Sign out all devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 xl:sticky xl:top-20">
          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardContent className="px-5 py-4">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-10 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-[12px] font-semibold text-white">
                    {initials(user?.name ?? "MediCare")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold">{user?.name ?? "Guest"}</p>
                  <p className="truncate text-[10.5px] text-muted-foreground">
                    {user?.email ?? "guest@medicare.com"}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 border-t border-border/60 pt-3.5">
                {[
                  { label: "Theme", value: activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1) },
                  {
                    label: "Notifications",
                    value: `${enabledNotifications} of ${notificationOptions.length} on`,
                  },
                  { label: "Language", value: preferences.language },
                  { label: "Time zone", value: preferences.timezone },
                  { label: "Sign-out", value: preferences.autoSignOut },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-right text-[11px] font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="mt-4 h-9 w-full rounded-xl bg-card text-[11.5px]"
              >
                <Link href="/profile">
                  <UserRound className="size-3.5" />
                  Manage profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardContent className="relative px-5 py-4">
              <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl" />
              <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <LifeBuoy className="size-4" />
              </span>
              <p className="mt-3 text-[12.5px] font-semibold">Need a hand?</p>
              <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">
                Our support team can help with roles, data imports and workstation setup.
              </p>
              <Button
                variant="ghost"
                className="mt-2 h-8 px-0 text-[11.5px] font-semibold text-primary hover:bg-transparent"
                onClick={() =>
                  toast.success("Support requested", {
                    description: "The MediCare team will reach out within one business day.",
                  })
                }
              >
                Contact support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
