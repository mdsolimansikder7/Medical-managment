import { ChevronRight, Pill } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accents, cn, type Accent } from "@/lib/utils";

const prescriptions: {
  patient: string;
  medicine: string;
  schedule: string;
  accent: Accent;
}[] = [
  {
    patient: "Ayesha Rahman",
    medicine: "Amlodipine 5mg",
    schedule: "Once daily · 14 days",
    accent: "teal",
  },
  {
    patient: "Tanvir Ahmed",
    medicine: "Metformin 850mg",
    schedule: "Twice daily · 30 days",
    accent: "violet",
  },
  {
    patient: "Mahmud Hasan",
    medicine: "Budesonide inhaler",
    schedule: "2 puffs · as needed",
    accent: "emerald",
  },
  {
    patient: "Nusrat Jahan",
    medicine: "Sumatriptan 50mg",
    schedule: "At migraine onset",
    accent: "sky",
  },
];

export function PrescriptionsCard() {
  return (
    <Card className="gap-0 rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-[15px] font-semibold tracking-tight">
          Recent prescriptions
        </CardTitle>
        <CardDescription className="text-[12px]">
          Issued in the last 24 hours
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 p-2.5">
        {prescriptions.map((item) => {
          const tone = accents[item.accent];

          return (
            <div
              key={item.patient}
              className="group flex items-center gap-2.5 rounded-xl px-2 py-2.5 transition hover:bg-muted/60"
            >
              <div
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg ring-1 ring-inset",
                  tone.soft,
                  tone.text,
                  tone.ring,
                )}
              >
                <Pill className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold leading-tight">
                  {item.medicine}
                </p>
                <p className="truncate text-[10.5px] text-muted-foreground">
                  {item.patient} · {item.schedule}
                </p>
              </div>
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
