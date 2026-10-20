"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-svh bg-background">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border/80 transition-[width] duration-300 ease-out lg:block",
            collapsed ? "w-[76px]" : "w-[264px]",
          )}
        >
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-[280px] border-r p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div
          className={cn(
            "flex min-h-svh flex-col transition-[padding-left] duration-300 ease-out",
            collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]",
          )}
        >
          <Topbar onMenu={() => setMobileOpen(true)} />
          <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 lg:px-7 lg:py-7">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-[1600px] px-4 pb-6 text-[11px] text-muted-foreground/70 lg:px-7">
            © 2026 MediCare Hospital · Privacy · Terms of service
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
