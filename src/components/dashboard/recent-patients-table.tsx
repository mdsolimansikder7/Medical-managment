import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { patients } from "@/lib/data";

export function RecentPatientsTable() {
  const recent = patients.slice(0, 6);

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="space-y-1">
          <CardTitle className="text-[15px] font-semibold tracking-tight">
            Recent patients
          </CardTitle>
          <CardDescription className="text-[12px]">
            Latest registrations and admissions
          </CardDescription>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-8 rounded-lg text-[11.5px] font-semibold text-primary hover:bg-accent/60 hover:text-primary"
        >
          <Link href="/patients">
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="h-9 pl-5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Patient
                </TableHead>
                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Department
                </TableHead>
                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Status
                </TableHead>
                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Last visit
                </TableHead>
                <TableHead className="h-9 pr-5 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  Room
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="border-border/50 transition-colors hover:bg-muted/40"
                >
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <PersonAvatar
                        name={patient.name}
                        accent={patient.accent}
                        size="xs"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[12.5px] font-semibold leading-tight">
                          {patient.name}
                        </p>
                        <p className="text-[10.5px] text-muted-foreground">
                          {patient.id} · {patient.age} yrs
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-[12px] text-muted-foreground">
                    {patient.department}
                  </TableCell>
                  <TableCell className="py-3">
                    <StatusBadge status={patient.status} />
                  </TableCell>
                  <TableCell className="tabular py-3 text-[12px] text-muted-foreground">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell className="tabular py-3 pr-5 text-right text-[12px] font-medium">
                    {patient.room}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
