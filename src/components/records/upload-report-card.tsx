"use client";

import { CloudUpload, FileUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UploadReportCard() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardContent className="p-5">
        <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-center">
          <div className="grid size-11 place-items-center rounded-xl bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/20 dark:text-teal-400">
            <CloudUpload className="size-5" />
          </div>
          <p className="mt-3 text-[12.5px] font-semibold">Upload lab report</p>
          <p className="mt-1 max-w-[220px] text-[11px] leading-relaxed text-muted-foreground">
            Drop a PDF or DICOM file here, or pick one from your device.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-3 h-8 rounded-lg bg-card text-[11.5px]"
            onClick={() =>
              toast.success("Upload started", {
                description: "lab-report-oct-20.pdf is being processed.",
              })
            }
          >
            <FileUp className="size-3.5" />
            Choose file
          </Button>
          <p className="mt-2 text-[9.5px] text-muted-foreground/70">
            PDF, PNG or DICOM · max 25 MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
