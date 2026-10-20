import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Accent = "teal" | "violet" | "sky" | "amber" | "rose" | "emerald" | "orange" | "slate";

type AccentStyle = {
  soft: string;
  text: string;
  solid: string;
  ring: string;
  border: string;
  gradient: string;
  dot: string;
};

export const accents: Record<Accent, AccentStyle> = {
  teal: {
    soft: "bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    solid: "bg-teal-500",
    ring: "ring-teal-500/20",
    border: "border-teal-500/25",
    gradient: "from-teal-500 to-emerald-500",
    dot: "text-teal-500",
  },
  violet: {
    soft: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    solid: "bg-violet-500",
    ring: "ring-violet-500/20",
    border: "border-violet-500/25",
    gradient: "from-violet-500 to-fuchsia-500",
    dot: "text-violet-500",
  },
  sky: {
    soft: "bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
    solid: "bg-sky-500",
    ring: "ring-sky-500/20",
    border: "border-sky-500/25",
    gradient: "from-sky-500 to-cyan-500",
    dot: "text-sky-500",
  },
  amber: {
    soft: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    solid: "bg-amber-500",
    ring: "ring-amber-500/20",
    border: "border-amber-500/25",
    gradient: "from-amber-500 to-orange-500",
    dot: "text-amber-500",
  },
  rose: {
    soft: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    solid: "bg-rose-500",
    ring: "ring-rose-500/20",
    border: "border-rose-500/25",
    gradient: "from-rose-500 to-pink-500",
    dot: "text-rose-500",
  },
  emerald: {
    soft: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    solid: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    border: "border-emerald-500/25",
    gradient: "from-emerald-500 to-teal-500",
    dot: "text-emerald-500",
  },
  orange: {
    soft: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    solid: "bg-orange-500",
    ring: "ring-orange-500/20",
    border: "border-orange-500/25",
    gradient: "from-orange-500 to-amber-500",
    dot: "text-orange-500",
  },
  slate: {
    soft: "bg-slate-500/10",
    text: "text-slate-600 dark:text-slate-400",
    solid: "bg-slate-500",
    ring: "ring-slate-500/20",
    border: "border-slate-500/25",
    gradient: "from-slate-500 to-slate-600",
    dot: "text-slate-500",
  },
};

export function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/BDT\s?/, "৳");
}

/**
 * Compact money notation: thousands use "K", millions use "M".
 * 86,400 → ৳86.4K · 1,284,500 → ৳1.28M
 */
export function formatCompactCurrency(value: number) {
  const abs = Math.abs(value);

  if (abs >= 1_000_000) {
    const millions = value / 1_000_000;
    return `৳${millions.toFixed(2).replace(/\.?0+$/, "")}M`;
  }

  if (abs >= 1_000) {
    const thousands = value / 1_000;
    return `৳${thousands.toFixed(1).replace(/\.0$/, "")}K`;
  }

  return `৳${value}`;
}

export const statusStyles: Record<string, string> = {
  Scheduled: "bg-info/10 text-info border-info/20",
  "In progress": "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  Completed: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  Cancelled: "bg-destructive/10 text-rose-700 border-destructive/20 dark:text-rose-400",
  Active: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  Critical: "bg-destructive/10 text-rose-700 border-destructive/20 dark:text-rose-400",
  Recovered: "bg-info/10 text-info border-info/20",
  New: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  "On duty": "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  "Off duty": "bg-muted text-muted-foreground border-border",
  "In surgery": "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  Paid: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  Pending: "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  Overdue: "bg-destructive/10 text-rose-700 border-destructive/20 dark:text-rose-400",
  Ordered: "bg-info/10 text-info border-info/20",
  "Sample collected": "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  Processing: "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  Ready: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  Approved: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  Received: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  "In stock": "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  "Low stock": "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  "Out of stock": "bg-destructive/10 text-rose-700 border-destructive/20 dark:text-rose-400",
  Issued: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
  Draft: "bg-muted text-muted-foreground border-border",
  Invited: "bg-info/10 text-info border-info/20",
  Suspended: "bg-destructive/10 text-rose-700 border-destructive/20 dark:text-rose-400",
  Waiting: "bg-warning/15 text-amber-700 border-warning/30 dark:text-warning",
  "In consultation": "bg-info/10 text-info border-info/20",
  Done: "bg-success/10 text-emerald-700 border-success/20 dark:text-success",
};

export const avatarTints: Record<Accent, string> = {
  teal: "from-teal-500/25 to-emerald-500/10 text-teal-700 dark:text-teal-300",
  violet: "from-violet-500/25 to-fuchsia-500/10 text-violet-700 dark:text-violet-300",
  sky: "from-sky-500/25 to-cyan-500/10 text-sky-700 dark:text-sky-300",
  amber: "from-amber-500/25 to-orange-500/10 text-amber-700 dark:text-amber-300",
  rose: "from-rose-500/25 to-pink-500/10 text-rose-700 dark:text-rose-300",
  emerald: "from-emerald-500/25 to-teal-500/10 text-emerald-700 dark:text-emerald-300",
  orange: "from-orange-500/25 to-amber-500/10 text-orange-700 dark:text-orange-300",
  slate: "from-slate-500/25 to-slate-500/10 text-slate-700 dark:text-slate-300",
};
