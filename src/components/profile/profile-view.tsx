"use client";

import * as React from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  KeyRound,
  Laptop,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/lib/session";
import { initials } from "@/lib/utils";

const sessions = [
  {
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh · Current session",
    time: "Active now",
    icon: Laptop,
    current: true,
  },
  {
    device: "Safari on iPhone",
    location: "Dhaka, Bangladesh",
    time: "2 hours ago",
    icon: Smartphone,
    current: false,
  },
];

export function ProfileView() {
  const { user, updateUser } = useSession();

  const [name, setName] = React.useState(user?.name ?? "");
  const [email, setEmail] = React.useState(user?.email ?? "");
  const [phone, setPhone] = React.useState(user?.phone ?? "");
  const [department, setDepartment] = React.useState(user?.department ?? "");
  const [twoFactor, setTwoFactor] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setDepartment(user.department);
  }, [user]);

  if (!user) return null;

  const fields = [name, email, phone, department].filter((value) => value.trim().length > 0);
  const completeness = Math.round((fields.length / 4) * 100);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Name is required", { description: "Enter your full name." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Invalid email", { description: "Enter a valid email address." });
      return;
    }

    updateUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      department: department.trim(),
    });
    toast.success("Profile updated", {
      description: "Your details are now visible across the workspace.",
    });
  }

  function handlePasswordChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentPassword.length < 6) {
      toast.error("Current password is too short");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated", {
      description: "Use your new password the next time you sign in.",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight sm:text-[24px]">
            My profile
          </h1>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            Manage your personal details, sign-in security and active devices.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-xl bg-card">
          <Link href="/settings">
            <Settings className="size-4" />
            Workspace settings
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="relative h-24 bg-gradient-to-r from-teal-500/90 via-emerald-500/80 to-sky-500/70">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
            </div>
            <CardContent className="px-5 pb-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-3">
                  <Avatar className="-mt-8 size-16 shrink-0 rounded-2xl ring-4 ring-card">
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-[18px] font-semibold text-white">
                      {initials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-[16px] font-semibold leading-tight">{user.name}</p>
                      <BadgeCheck className="size-4 text-primary" />
                    </div>
                    <p className="text-[11.5px] text-muted-foreground">
                      {user.role} · {user.department}
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Verified account
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-muted/25 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    <Mail className="size-3" />
                    Email
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] font-medium">{user.email}</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/25 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    <Phone className="size-3" />
                    Phone
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] font-medium">
                    {user.phone || "Not added"}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/25 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wide text-muted-foreground">
                    <MapPin className="size-3" />
                    Location
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] font-medium">Dhaka, Bangladesh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                Personal information
              </CardTitle>
              <CardDescription className="text-[12px]">
                Used across appointments, prescriptions and billing records.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 py-4">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name" className="text-[12px]">
                      Full name
                    </Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email" className="text-[12px]">
                      Email address
                    </Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone" className="text-[12px]">
                      Phone number
                    </Label>
                    <Input
                      id="profile-phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-department" className="text-[12px]">
                      Department
                    </Label>
                    <Input
                      id="profile-department"
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      className="h-10 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <p className="text-[10.5px] text-muted-foreground">
                    Changes apply immediately to your account.
                  </p>
                  <Button type="submit" className="rounded-xl">
                    <Check className="size-4" />
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight">Security</CardTitle>
              <CardDescription className="text-[12px]">
                Keep your account protected with a strong password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-5 py-4">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-[12px]">
                      Current password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      placeholder="••••••••"
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-[12px]">
                      New password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="At least 6 characters"
                      className="h-10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password" className="text-[12px]">
                      Confirm new password
                    </Label>
                    <Input
                      id="confirm-new-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Repeat password"
                      className="h-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="outline" className="rounded-xl bg-card">
                    <KeyRound className="size-4" />
                    Update password
                  </Button>
                </div>
              </form>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 px-3.5 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold">Two-factor authentication</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      Require a one-time code when signing in from a new device.
                    </p>
                  </div>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={(value) => {
                    setTwoFactor(value);
                    toast.success(value ? "Two-factor enabled" : "Two-factor disabled");
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                Account overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 px-5 py-4">
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Profile completeness</span>
                  <span className="font-semibold">{completeness}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              {[
                { label: "Role", value: user.role },
                { label: "Department", value: user.department },
                { label: "Member since", value: user.joined },
                { label: "User ID", value: "USR-01" },
                { label: "Time zone", value: "Asia/Dhaka (GMT+6)" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-border/50 pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-right text-[11.5px] font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardHeader className="border-b border-border/60 px-5 py-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                Active sessions
              </CardTitle>
              <CardDescription className="text-[12px]">Devices signed in to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-3">
              {sessions.map((session) => {
                const Icon = session.icon;

                return (
                  <div
                    key={session.device}
                    className="flex items-start gap-2.5 rounded-xl px-1.5 py-2"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11.5px] font-semibold">{session.device}</p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {session.location}
                      </p>
                    </div>
                    <span
                      className={
                        session.current
                          ? "rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400"
                          : "text-[9.5px] text-muted-foreground"
                      }
                    >
                      {session.time}
                    </span>
                  </div>
                );
              })}
            </CardContent>
            <div className="border-t border-border/60 px-4 py-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-lg bg-card text-[11px]"
                onClick={() =>
                  toast.success("Other sessions signed out", {
                    description: "Only this device remains signed in.",
                  })
                }
              >
                Sign out other sessions
              </Button>
            </div>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <CardContent className="space-y-1 p-2.5">
              <Link
                href="/settings"
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 transition hover:bg-muted/60"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Settings className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-semibold">Workspace settings</p>
                  <p className="text-[10px] text-muted-foreground">
                    Theme, notifications and regional preferences
                  </p>
                </div>
              </Link>
              <div className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <CalendarDays className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-semibold">Joined MediCare</p>
                  <p className="text-[10px] text-muted-foreground">{user.joined}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
