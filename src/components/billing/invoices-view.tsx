"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Receipt,
  Search,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { invoices } from "@/lib/data";
import { accents, cn, formatCurrency, type Accent } from "@/lib/utils";

const tabs = ["All", "Paid", "Pending", "Overdue"] as const;
type Tab = (typeof tabs)[number];

const tints: Accent[] = ["teal", "violet", "sky", "amber", "rose", "emerald", "orange"];

export function InvoicesView() {
  const [tab, setTab] = React.useState<Tab>("All");
  const [query, setQuery] = React.useState("");

  const counts = React.useMemo(
    () =>
      tabs.reduce<Record<string, number>>((acc, item) => {
        acc[item] =
          item === "All"
            ? invoices.length
            : invoices.filter((invoice) => invoice.status === item).length;
        return acc;
      }, {}),
    [],
  );

  const filtered = invoices.filter((invoice) => {
    const matchesTab = tab === "All" || invoice.status === tab;
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [invoice.patient, invoice.id, invoice.service].some((value) =>
        value.toLowerCase().includes(term),
      );

    return matchesTab && matchesQuery;
  });

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="gap-3 border-b border-border/60 px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                  tab === item
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item}
                <span
                  className={cn(
                    "tabular rounded px-1 text-[10px]",
                    tab === item
                      ? "bg-primary-foreground/20"
                      : "bg-muted text-muted-foreground/80",
                  )}
                >
                  {counts[item]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search invoices…"
              className="h-9 rounded-xl pl-8 text-[12px] lg:w-56"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                {["Invoice", "Patient", "Service", "Amount", "Status"].map(
                  (head) => (
                    <TableHead
                      key={head}
                      className={cn(
                        "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                        head === "Invoice" ? "pl-5" : "pl-4",
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
              {filtered.map((invoice, index) => (
                <TableRow
                  key={invoice.id}
                  className="border-border/50 transition-colors hover:bg-muted/40"
                >
                  <TableCell className="py-3 pl-5">
                    <p className="tabular text-[11.5px] font-semibold">{invoice.id}</p>
                    <p className="tabular text-[10px] text-muted-foreground">{invoice.date}</p>
                  </TableCell>
                  <TableCell className="py-3 pl-4">
                    <div className="flex items-center gap-2">
                      <PersonAvatar
                        name={invoice.patient}
                        accent={tints[index % tints.length]}
                        size="xs"
                      />
                      <span className="whitespace-nowrap text-[12px] font-medium">
                        {invoice.patient}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 pl-4">
                    <p className="text-[11.5px] text-muted-foreground">{invoice.service}</p>
                    <span className="mt-0.5 inline-block rounded bg-muted px-1.5 py-px text-[9.5px] font-medium text-muted-foreground">
                      {invoice.method}
                    </span>
                  </TableCell>
                  <TableCell className="tabular whitespace-nowrap py-3 pl-4 text-right text-[12px] font-semibold">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="py-3 pl-4">
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="py-3 pr-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${invoice.id}`}
                          className="size-7 rounded-lg text-muted-foreground"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 rounded-xl">
                        <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                          {invoice.id}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() => toast.success("Invoice downloaded")}
                        >
                          <Download className="size-3.5 text-muted-foreground" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() =>
                            toast.success("Reminder sent", {
                              description: `${invoice.patient} was notified by SMS.`,
                            })
                          }
                        >
                          <Send className="size-3.5 text-muted-foreground" />
                          Send reminder
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
              <Receipt className="size-5" />
            </div>
            <p className="mt-3 text-[13px] font-semibold">No invoices found</p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Change the filter or search for a different patient.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between border-t border-border/60 px-5 py-3">
        <p className="text-[11.5px] text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> invoices
          · total{" "}
          <span className="font-semibold text-foreground">
            {formatCurrency(filtered.reduce((sum, item) => sum + item.amount, 0))}
          </span>
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="rounded-lg"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="tabular px-2 text-[11.5px] font-medium">Page 1 of 1</span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="rounded-lg"
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
