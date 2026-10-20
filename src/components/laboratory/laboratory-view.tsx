"use client";

import * as React from "react";
import {
  CheckCheck,
  Download,
  FileText,
  FlaskConical,
  MoreHorizontal,
  Printer,
  Search,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { labOrders, type LabOrder, type LabStatus } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const tabs = [
  { label: "All", value: "All" },
  { label: "Ordered", value: "Ordered" },
  { label: "Collected", value: "Sample collected" },
  { label: "Processing", value: "Processing" },
  { label: "Ready", value: "Ready" },
  { label: "Approved", value: "Approved" },
] as const;
type TabValue = (typeof tabs)[number]["value"];

const findingsByTest: Record<string, string> = {
  HbA1c: "HbA1c 8.4% — above target range. Fasting plasma glucose 168 mg/dL.\nNo evidence of anaemia. Renal function within normal limits.",
  "Lipid profile":
    "Total cholesterol 212 mg/dL, LDL-C 138 mg/dL, HDL-C 42 mg/dL, triglycerides 168 mg/dL.\nAtherogenic index mildly elevated.",
  "MRI brain (plain)":
    "No acute infarct, haemorrhage or mass lesion. Ventricles and sulci are age-appropriate.\nMild mucosal thickening in bilateral maxillary sinuses.",
  "X-Ray left forearm":
    "Undisplaced fracture of the distal radial metaphysis. Joint spaces preserved.\nSoft tissue swelling noted around the wrist.",
  Spirometry:
    "FEV1 68% of predicted, FEV1/FVC ratio 0.64. Significant reversibility post-bronchodilator.\nConsistent with moderate obstructive airway disease.",
  "Serum creatinine": "Serum creatinine 0.9 mg/dL. eGFR 96 mL/min/1.73m². Within normal reference range.",
  "Complete blood count":
    "Haemoglobin 11.2 g/dL, WBC 7,800/µL, platelets 240,000/µL.\nMicrocytic hypochromic picture — iron studies advised.",
};

export function LaboratoryView() {
  const [orders, setOrders] = React.useState<LabOrder[]>(labOrders);
  const [tab, setTab] = React.useState<TabValue>("All");
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<LabOrder | null>(null);

  const counts = React.useMemo(
    () =>
      tabs.reduce<Record<string, number>>((acc, item) => {
        acc[item.value] =
          item.value === "All"
            ? orders.length
            : orders.filter((order) => order.status === item.value).length;
        return acc;
      }, {}),
    [orders],
  );

  const filtered = orders.filter((order) => {
    const matchesTab = tab === "All" || order.status === tab;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [order.patient, order.id, order.test, order.doctor].some((value) =>
        value.toLowerCase().includes(term),
      );
    return matchesTab && matchesQuery;
  });

  function advance(order: LabOrder, status: LabStatus, message: string) {
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, status } : item)),
    );
    toast.success(message, { description: `${order.test} · ${order.patient}` });
  }

  function approve(order: LabOrder) {
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, status: "Approved" } : item)),
    );
    setActive(null);
    toast.success("Report approved & published", {
      description: `${order.patient} has been notified. Report is ready to download.`,
    });
  }

  return (
    <>
      <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <CardHeader className="gap-3 border-b border-border/60 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold">Test orders</p>
              <p className="text-[11px] text-muted-foreground">
                {orders.length} orders · {counts["Ready"] + counts["Processing"] + counts["Sample collected"] + counts["Ordered"]} pending
              </p>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search orders…"
                className="h-9 rounded-xl pl-8 text-[12px] sm:w-52"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map((item) => (
              <button
                key={item.value}
                onClick={() => setTab(item.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                  tab === item.value
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "tabular rounded px-1 text-[10px]",
                    tab === item.value
                      ? "bg-primary-foreground/20"
                      : "bg-muted text-muted-foreground/80",
                  )}
                >
                  {counts[item.value]}
                </span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  {["Order", "Patient", "Test", "Ordered by", "Amount", "Status"].map(
                    (head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                          head === "Order" ? "pl-5" : "pl-4",
                          head === "Ordered by" && "hidden xl:table-cell",
                          head === "Amount" && "text-right",
                        )}
                      >
                        {head}
                      </TableHead>
                    ),
                  )}
                  <TableHead className="h-9 w-10 pr-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className="border-border/50 transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="py-3 pl-5">
                      <p className="tabular text-[11.5px] font-semibold">{order.id}</p>
                      <p className="tabular text-[10px] text-muted-foreground">
                        {order.ordered}
                      </p>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <div className="flex items-center gap-2">
                        <PersonAvatar
                          name={order.patient}
                          accent={order.accent}
                          size="xs"
                        />
                        <div>
                          <p className="whitespace-nowrap text-[12px] font-medium">
                            {order.patient}
                          </p>
                          <p className="tabular text-[9.5px] text-muted-foreground">
                            {order.patientId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <p className="whitespace-nowrap text-[11.5px] font-medium">
                        {order.test}
                      </p>
                      <span className="mt-0.5 inline-block rounded bg-muted px-1.5 py-px text-[9.5px] font-medium text-muted-foreground">
                        {order.category}
                      </span>
                    </TableCell>
                    <TableCell className="hidden py-3 pl-4 xl:table-cell">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {order.doctor}
                      </span>
                    </TableCell>
                    <TableCell className="tabular whitespace-nowrap py-3 pl-4 text-right text-[11.5px] font-semibold">
                      {formatCurrency(order.price)}
                    </TableCell>
                    <TableCell className="py-3 pl-4">
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="py-3 pr-5 text-right">
                      {order.status === "Ready" ? (
                        <Button
                          size="sm"
                          className="h-7 rounded-lg px-2.5 text-[10.5px]"
                          onClick={() => setActive(order)}
                        >
                          Review
                        </Button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Actions for ${order.id}`}
                              className="size-7 rounded-lg text-muted-foreground"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52 rounded-xl">
                            <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                              {order.id}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {order.status === "Ordered" && (
                              <DropdownMenuItem
                                className="gap-2 rounded-lg text-[12px]"
                                onClick={() =>
                                  advance(order, "Sample collected", "Sample marked as collected")
                                }
                              >
                                <FlaskConical className="size-3.5 text-muted-foreground" />
                                Mark sample collected
                              </DropdownMenuItem>
                            )}
                            {(order.status === "Sample collected" ||
                              order.status === "Ordered") && (
                              <DropdownMenuItem
                                className="gap-2 rounded-lg text-[12px]"
                                onClick={() =>
                                  advance(order, "Processing", "Test moved to processing")
                                }
                              >
                                <FlaskConical className="size-3.5 text-muted-foreground" />
                                Start processing
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="gap-2 rounded-lg text-[12px]"
                              onClick={() => setActive(order)}
                            >
                              <FileText className="size-3.5 text-muted-foreground" />
                              {order.status === "Approved" ? "View report" : "Enter report"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 rounded-lg text-[12px]"
                              onClick={() => toast.success("Report downloaded", {
                                description: `${order.id}-report.pdf`,
                              })}
                            >
                              <Download className="size-3.5 text-muted-foreground" />
                              Download PDF
                            </DropdownMenuItem>
                            {order.status !== "Approved" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg text-[12px]"
                                  onClick={() => setActive(order)}
                                >
                                  <Printer className="size-3.5 text-muted-foreground" />
                                  Collect &amp; print label
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
                <FlaskConical className="size-5" />
              </div>
              <p className="mt-3 text-[13px] font-semibold">No test orders found</p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Change the filter or create a new lab order.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between border-t border-border/60 px-5 py-3">
          <p className="text-[11.5px] text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> orders ·
            {" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(filtered.reduce((sum, item) => sum + item.price, 0))}
            </span>{" "}
            billed
          </p>
          <span className="text-[10.5px] text-muted-foreground/80">
            Reports are published to the patient portal instantly
          </span>
        </CardFooter>
      </Card>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-2xl p-0 sm:max-w-xl">
          {active && (
            <>
              <DialogHeader className="border-b border-border/70 px-6 py-5">
                <DialogTitle className="text-[16px] tracking-tight">
                  {active.status === "Approved" ? "Lab report" : "Enter report"}
                </DialogTitle>
                <DialogDescription className="text-[12.5px]">
                  {active.test} · {active.patient} ({active.patientId})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 px-6 py-5">
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3">
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Order
                    </p>
                    <p className="tabular text-[11.5px] font-semibold">{active.id}</p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Category
                    </p>
                    <p className="text-[11.5px] font-medium">{active.category}</p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Ordered by
                    </p>
                    <p className="text-[11.5px] font-medium">{active.doctor}</p>
                  </div>
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wide text-muted-foreground">
                      Status
                    </p>
                    <StatusBadge status={active.status} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Findings</Label>
                  <Textarea
                    rows={5}
                    defaultValue={findingsByTest[active.test] ?? ""}
                    placeholder="Enter measured values and observations…"
                    className="resize-none rounded-xl text-[12px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Impression / conclusion</Label>
                  <Input
                    defaultValue={
                      active.test === "HbA1c"
                        ? "Poor glycaemic control — therapy intensification advised"
                        : ""
                    }
                    placeholder="Short clinical impression"
                    className="h-10 rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-dashed border-border px-3 py-2.5">
                  <div>
                    <p className="text-[11.5px] font-medium">Verified by</p>
                    <p className="text-[10.5px] text-muted-foreground">Rakib Hasan · Lab Technician</p>
                  </div>
                  <CheckCheck className="size-4 text-emerald-500" />
                </div>
              </div>

              <DialogFooter className="border-t border-border/70 bg-muted/25 px-6 py-4 sm:justify-between">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => toast.success("Report saved as draft")}
                >
                  Save draft
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="rounded-xl"
                    onClick={() =>
                      toast.success("Report sent to printer", {
                        description: `${active.test} · ${active.patient}`,
                      })
                    }
                  >
                    <Send className="size-4" />
                    Send to printer
                  </Button>
                  <Button className="rounded-xl" onClick={() => approve(active)}>
                    <CheckCheck className="size-4" />
                    Approve &amp; publish
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
