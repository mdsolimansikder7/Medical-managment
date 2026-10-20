"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ExportButton({ label = "Export report" }: { label?: string }) {
  return (
    <Button
      variant="outline"
      className="rounded-xl bg-card/60"
      onClick={() =>
        toast.success("Report queued", {
          description: "You'll receive the PDF export by email in a few minutes.",
        })
      }
    >
      <Download className="size-4" />
      {label}
    </Button>
  );
}
