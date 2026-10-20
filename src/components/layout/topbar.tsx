"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CalendarClock,
  ChevronDown,
  CircleUserRound,
  Command,
  LogOut,
  Menu,
  Search,
  Settings,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";
import { initials, cn } from "@/lib/utils";
import { useSession } from "@/lib/session";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/appointments": "Appointments",
  "/patients": "Patients",
  "/doctors": "Doctors",
  "/consultations": "Consultations",
  "/laboratory": "Laboratory",
  "/pharmacy": "Pharmacy",
  "/records": "Medical Records",
  "/billing": "Billing",
  "/reports": "Reports",
  "/staff": "Staff & Roles",
  "/profile": "My profile",
  "/settings": "Settings",
};

const notifications = [
  {
    title: "Critical patient alert",
    detail: "Tanvir Ahmed — BP 150/95 in ICU-3",
    time: "4m",
    tint: "bg-rose-500",
  },
  {
    title: "Appointment starting soon",
    detail: "Nusrat Jahan · OPD-12 at 09:30 AM",
    time: "12m",
    tint: "bg-amber-500",
  },
  {
    title: "Lab report ready",
    detail: "HbA1c panel for Tanvir Ahmed",
    time: "28m",
    tint: "bg-teal-500",
  },
];

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useSession();
  const [unread, setUnread] = React.useState(3);

  const displayName = user?.name ?? "Guest";
  const displayRole = user?.role ?? "Member";

  function handleSignOut() {
    signOut();
    toast.success("Signed out", {
      description: "You have been securely signed out of MediCare.",
    });
    router.replace("/sign-in");
  }
  const title =
    pageTitles[pathname] ??
    pageTitles[
      Object.keys(pageTitles).find(
        (key) => key !== "/" && pathname.startsWith(key),
      ) ?? "/"
    ] ??
    "MediCare";

  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-7">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenu}
          aria-label="Open navigation"
          className="size-9 rounded-xl text-muted-foreground lg:hidden"
        >
          <Menu className="size-5" />
        </Button>

        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
            <Stethoscope className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">MediCare</span>
        </div>

        <div className="hidden text-[13px] text-muted-foreground lg:flex lg:items-center lg:gap-2">
          <span className="hidden xl:inline">Hospital</span>
          <span className="hidden text-border xl:inline">/</span>
          <span className="font-medium text-foreground">{title}</span>
        </div>

        <div className="relative ml-auto hidden w-full max-w-xs md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
          <Input
            ref={searchRef}
            placeholder="Search patients, doctors, invoices…"
            className="h-9 rounded-xl border-transparent bg-muted/70 pl-9 pr-16 text-[13px] shadow-none transition focus-visible:bg-card focus-visible:ring-1 focus-visible:ring-primary/30"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-border/80 bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="size-2.5" />K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <div className="mr-1 hidden items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-2.5 py-1.5 text-[11.5px] font-medium text-muted-foreground xl:flex">
            <CalendarClock className="size-3.5 text-primary" />
            Tue, Oct 20
          </div>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative size-9 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="size-[18px]" />
                {unread > 0 && (
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-background" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px] rounded-2xl p-0">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Notifications</p>
                  {unread > 0 && (
                    <Badge className="h-5 rounded-md bg-primary/10 px-1.5 text-[10px] text-primary">
                      {unread} new
                    </Badge>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUnread(0);
                    toast.success("All notifications marked as read");
                  }}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <DropdownMenuSeparator className="m-0" />
              <div className="p-1.5">
                {notifications.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    className="items-start gap-3 rounded-xl px-2.5 py-2.5"
                  >
                    <span
                      className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.tint)}
                    />
                    <span className="space-y-0.5">
                      <span className="block text-[12.5px] font-medium leading-snug">
                        {item.title}
                      </span>
                      <span className="block text-[11.5px] leading-snug text-muted-foreground">
                        {item.detail}
                      </span>
                    </span>
                    <span className="ml-auto text-[10.5px] text-muted-foreground/70">
                      {item.time}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator className="m-0" />
              <div className="p-1.5">
                <DropdownMenuItem className="justify-center rounded-xl py-2 text-[12px] font-medium text-primary">
                  View all notifications
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mx-1.5 hidden h-6 w-px bg-border sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-1 transition hover:bg-accent/60 sm:pr-2.5">
                <Avatar className="size-8 ring-2 ring-background">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500/20 to-emerald-500/10 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    {initials(displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="text-[12.5px] font-semibold leading-tight">
                    {displayName.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-[10.5px] leading-tight text-muted-foreground">
                    {displayRole}
                  </p>
                </div>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 rounded-2xl">
              <DropdownMenuLabel className="font-normal">
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email ?? "guest@medicare.com"}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="gap-2.5 rounded-lg">
                <Link href="/profile">
                  <CircleUserRound className="size-4 text-muted-foreground" />
                  My profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2.5 rounded-lg">
                <Link href="/settings">
                  <Settings className="size-4 text-muted-foreground" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={handleSignOut}
                className="gap-2.5 rounded-lg text-rose-600 focus:text-rose-600 dark:text-rose-400"
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
