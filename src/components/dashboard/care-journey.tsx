import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardPlus,
  FileText,
  FlaskConical,
  Receipt,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const steps: {
  label: string;
  meta: string;
  href: string;
  icon: LucideIcon;
  tone: string;
}[] = [
  {
    label: "Registration",
    meta: "18 new today",
    href: "/patients",
    icon: UserPlus,
    tone: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    label: "Appointment",
    meta: "48 scheduled",
    href: "/appointments",
    icon: CalendarDays,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "Consultation",
    meta: "32 completed",
    href: "/consultations",
    icon: ClipboardPlus,
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Lab & tests",
    meta: "26 ordered",
    href: "/laboratory",
    icon: FlaskConical,
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Billing",
    meta: "৳86.4K collected",
    href: "/billing",
    icon: Receipt,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Records",
    meta: "1,204 archived",
    href: "/records",
    icon: FileText,
    tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
];

export function CareJourney() {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between px-2 pb-2.5">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold tracking-tight">Patient care journey</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>
        <span className="hidden text-[10.5px] text-muted-foreground sm:block">
          Registration → records, one connected flow
        </span>
      </div>

      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <Link
              key={step.label}
              href={step.href}
              className="group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition hover:bg-muted/60"
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-105",
                  step.tone,
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-semibold leading-tight">
                  <span className="tabular mr-1 text-[9.5px] text-muted-foreground/60">
                    0{index + 1}
                  </span>
                  {step.label}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">{step.meta}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden size-3 shrink-0 text-border xl:block" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
