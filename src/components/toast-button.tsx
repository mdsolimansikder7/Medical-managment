"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ToastButton({
  children,
  title,
  description,
  variant = "default",
  className,
  message,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  message?: "success" | "info";
}) {
  return (
    <Button
      variant={variant}
      className={className ?? "rounded-xl shadow-sm shadow-primary/25"}
      onClick={() =>
        message === "info"
          ? toast.info(title, { description })
          : toast.success(title, { description })
      }
    >
      {children}
    </Button>
  );
}
