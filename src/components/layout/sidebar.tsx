"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  ClipboardPlus,
  FileText,
  FlaskConical,
  LayoutDashboard,
  LifeBuoy,
  Phone,
  Pill,
  Receipt,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

const workspace: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/appointments", label: "Appointments", icon: CalendarDays, badge: "8" },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
];

const clinical: NavItem[] = [
  { href: "/consultations", label: "Consultations", icon: ClipboardPlus, badge: "1" },
  { href: "/laboratory", label: "Laboratory", icon: FlaskConical, badge: "4" },
  { href: "/pharmacy", label: "Pharmacy", icon: Pill },
];

const management: NavItem[] = [
  { href: "/records", label: "Medical Records", icon: FileText },
  { href: "/billing", label: "Billing", icon: Receipt },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/staff", label: "Staff & Roles", icon: ShieldCheck },
];

export function Sidebar({
  collapsed = false,
  onToggle,
  onNavigate,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const renderItem = (item: NavItem) => {
    const active =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    const Icon = item.icon;

    const link = (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200",
          collapsed && "justify-center px-0",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_rgba(13,148,136,0.08)]"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
        )}
      >
        <span
          className={cn(
            "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200",
            active ? "opacity-100" : "opacity-0",
          )}
        />
        <Icon
          className={cn(
            "size-[18px] shrink-0 transition-colors",
            active
              ? "text-primary"
              : "text-muted-foreground/80 group-hover:text-foreground",
          )}
          strokeWidth={active ? 2.2 : 1.9}
        />
        {!collapsed && (
          <>
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <Badge
                variant="secondary"
                className="ml-auto h-5 min-w-5 rounded-md bg-primary/10 px-1.5 text-[10.5px] font-semibold text-primary"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );

    if (!collapsed) return link;

    return (
      <Tooltip key={item.href} delayDuration={100}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-sidebar">
      {/* Brand */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border/80 px-4",
          collapsed && "justify-center px-0",
        )}
      >
        <div className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25">
          <Activity className="size-[18px]" strokeWidth={2.4} />
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-sidebar bg-emerald-400" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight tracking-tight">
              MediCare
            </p>
            <p className="truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
              Hospital Suite
            </p>
          </div>
        )}
        {onToggle && !collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="size-7 shrink-0 rounded-lg text-muted-foreground/70 hover:bg-sidebar-accent hover:text-foreground"
          >
            <ChevronsLeft className="size-4" />
          </Button>
        )}
      </div>

      {collapsed && onToggle && (
        <div className="flex justify-center pt-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label="Expand sidebar"
            className="size-7 rounded-lg text-muted-foreground/70 hover:bg-sidebar-accent hover:text-foreground"
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5 no-scrollbar">
        {[
          { label: "Workspace", items: workspace },
          { label: "Clinical", items: clinical },
          { label: "Management", items: management },
        ].map((section) => (
          <div key={section.label} className="space-y-1">
            {!collapsed ? (
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                {section.label}
              </p>
            ) : (
              <div className="mx-auto mb-2 h-px w-6 bg-sidebar-border/70" />
            )}
            {section.items.map(renderItem)}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 space-y-3 border-t border-sidebar-border/80 p-3">
        {!collapsed ? (
          <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent p-3.5">
            <div className="absolute -right-6 -top-6 size-16 rounded-full bg-teal-500/10 blur-xl" />
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <LifeBuoy className="size-4" />
              </div>
              <p className="text-[12.5px] font-semibold">Emergency support</p>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              Our care team is available 24/7 for critical cases.
            </p>
            <a
              href="tel:+8809612345678"
              className="mt-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-teal-700 dark:text-teal-400"
            >
              <Phone className="size-3" />
              +880 9612-345 678
            </a>
          </div>
        ) : (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <a
                href="tel:+8809612345678"
                aria-label="Emergency support"
                className="mx-auto grid size-10 place-items-center rounded-xl bg-teal-500/10 text-teal-600 transition hover:bg-teal-500/20 dark:text-teal-400"
              >
                <Phone className="size-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Emergency: +880 9612-345 678</TooltipContent>
          </Tooltip>
        )}

        {!collapsed && (
          <p className="px-2 text-[10.5px] text-muted-foreground/60">
            MediCare v2.4 · All systems operational
          </p>
        )}
      </div>
    </div>
  );
}
