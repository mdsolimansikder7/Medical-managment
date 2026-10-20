import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  FlaskConical,
  Receipt,
  ShieldAlert,
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
import { accents, cn, type Accent } from "@/lib/utils";

const actions: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
}[] = [
  {
    href: "/patients",
    label: "Register patient",
    description: "New admission",
    icon: UserPlus,
    accent: "teal",
  },
  {
    href: "/appointments",
    label: "Book appointment",
    description: "Find a slot",
    icon: CalendarPlus,
    accent: "violet",
  },
  {
    href: "/laboratory",
    label: "Lab report",
    description: "Enter results",
    icon: FlaskConical,
    accent: "sky",
  },
  {
    href: "/billing",
    label: "Create invoice",
    description: "Billing desk",
    icon: Receipt,
    accent: "amber",
  },
];

export function QuickActions() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Quick actions
        </CardTitle>
        <CardDescription className="text-[12px]">
          Jump straight into common tasks
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-4 py-4">
        <div className="grid grid-cols-2 gap-2.5">
          {actions.map((action) => {
            const tone = accents[action.accent];
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm"
              >
                <div
                  className={cn(
                    "mb-2.5 grid size-8 place-items-center rounded-lg ring-1 ring-inset transition-transform group-hover:scale-105",
                    tone.soft,
                    tone.text,
                    tone.ring,
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <p className="text-[12px] font-semibold leading-tight">
                  {action.label}
                </p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>

        <Link
          href="/patients"
          className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] p-3 transition hover:bg-rose-500/10"
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold text-rose-700 dark:text-rose-300">
              3 critical alerts
            </p>
            <p className="truncate text-[10.5px] text-muted-foreground">
              Review patients in ICU
            </p>
          </div>
          <ArrowRight className="ml-auto size-3.5 shrink-0 text-rose-500/70" />
        </Link>
      </CardContent>
    </Card>
  );
}
