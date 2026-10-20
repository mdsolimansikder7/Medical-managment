"use client";

import * as React from "react";
import {
  AlertTriangle,
  Boxes,
  Minus,
  MoreHorizontal,
  PackagePlus,
  Pill,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import {
  medicines as seedMedicines,
  patients,
  pharmacyPurchases,
  pharmacySales as seedSales,
  type Medicine,
  type MedicineStatus,
} from "@/lib/data";
import { cn, formatCompactCurrency, formatCurrency } from "@/lib/utils";

const tabs = ["Inventory", "Sales", "Purchases"] as const;
type Tab = (typeof tabs)[number];

type Sale = (typeof seedSales)[number];

function stockStatus(stock: number, reorder: number): MedicineStatus {
  if (stock <= 0) return "Out of stock";
  if (stock <= reorder) return "Low stock";
  return "In stock";
}

function isExpiring(expiry: string) {
  return expiry.includes("2026");
}

export function PharmacyView() {
  const [tab, setTab] = React.useState<Tab>("Inventory");
  const [query, setQuery] = React.useState("");
  const [onlyAlerts, setOnlyAlerts] = React.useState(false);
  const [items, setItems] = React.useState<Medicine[]>(seedMedicines);
  const [sales, setSales] = React.useState<Sale[]>(seedSales);
  const [saleItem, setSaleItem] = React.useState<Medicine | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [patient, setPatient] = React.useState(patients[0]?.id ?? "");
  const [method, setMethod] = React.useState("Cash");

  const filtered = items.filter((item) => {
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [item.name, item.category, item.batch, item.supplier].some((value) =>
        value.toLowerCase().includes(term),
      );
    const matchesAlert = !onlyAlerts || item.status !== "In stock";
    return matchesQuery && matchesAlert;
  });

  function openSale(item: Medicine) {
    setSaleItem(item);
    setQuantity(1);
  }

  function restock(item: Medicine) {
    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              stock: entry.stock + 100,
              status: stockStatus(entry.stock + 100, entry.reorder),
            }
          : entry,
      ),
    );
    toast.success("Stock received", {
      description: `${item.name} · 100 units added to batch ${item.batch}.`,
    });
  }

  function completeSale() {
    if (!saleItem) return;

    const patientName = patients.find((item) => item.id === patient)?.name ?? "Walk-in patient";
    const total = saleItem.price * quantity;

    setItems((current) =>
      current.map((entry) =>
        entry.id === saleItem.id
          ? {
              ...entry,
              stock: entry.stock - quantity,
              status: stockStatus(entry.stock - quantity, entry.reorder),
            }
          : entry,
      ),
    );

    setSales((current) => [
      {
        id: `SAL-${9013 + current.length}`,
        patient: patientName,
        items: 1,
        amount: total,
        method: method as Sale["method"],
        time: "Just now",
        accent: "teal",
      },
      ...current,
    ]);

    setSaleItem(null);
    toast.success("Sale completed", {
      description: `${quantity} × ${saleItem.name} · ${formatCurrency(total)} via ${method}.`,
    });
  }

  const stockValue = items.reduce((sum, item) => sum + item.stock * item.price, 0);

  return (
    <>
      <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <CardHeader className="gap-3 border-b border-border/60 px-5 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold transition",
                    tab === item
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
              {tab === "Inventory" && (
                <>
                  <span className="mx-1 h-4 w-px bg-border" />
                  <button
                    onClick={() => setOnlyAlerts((value) => !value)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition",
                      onlyAlerts
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <AlertTriangle className="size-3.5" />
                    Needs attention
                  </button>
                </>
              )}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  tab === "Inventory"
                    ? "Search medicines…"
                    : tab === "Sales"
                      ? "Search sales…"
                      : "Search purchases…"
                }
                className="h-9 rounded-xl pl-8 text-[12px] lg:w-52"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <div className="overflow-x-auto">
            {tab === "Inventory" ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    {["Medicine", "Batch & expiry", "Stock", "Price", "Status"].map((head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                          head === "Medicine" ? "pl-5" : "pl-4",
                          head === "Price" && "text-right",
                        )}
                      >
                        {head}
                      </TableHead>
                    ))}
                    <TableHead className="h-9 w-10 pr-5" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-border/50 transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="py-3 pl-5">
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Pill className="size-3.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="whitespace-nowrap text-[11.5px] font-semibold">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {item.category} · {item.supplier}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 pl-4">
                        <p className="tabular text-[11px] font-medium">{item.batch}</p>
                        <p
                          className={cn(
                            "tabular text-[10px]",
                            isExpiring(item.expiry)
                              ? "font-medium text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          Exp {item.expiry}
                        </p>
                      </TableCell>
                      <TableCell className="py-3 pl-4">
                        <p className="tabular text-[11.5px] font-semibold">{item.stock} units</p>
                        <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              item.status === "Out of stock"
                                ? "bg-rose-500"
                                : item.status === "Low stock"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500",
                            )}
                            style={{
                              width: `${Math.min(100, (item.stock / (item.reorder * 2)) * 100)}%`,
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="tabular whitespace-nowrap py-3 pl-4 text-right text-[11.5px] font-semibold">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="py-3 pl-4">
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="py-3 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={item.stock === 0}
                            className="hidden h-7 rounded-lg bg-card px-2 text-[10.5px] sm:inline-flex"
                            onClick={() => openSale(item)}
                          >
                            <ShoppingCart className="size-3" />
                            Sell
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Actions for ${item.name}`}
                                className="size-7 rounded-lg text-muted-foreground"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                              <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                                {item.id}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="gap-2 rounded-lg text-[12px]"
                                disabled={item.stock === 0}
                                onClick={() => openSale(item)}
                              >
                                <ShoppingCart className="size-3.5 text-muted-foreground" />
                                New sale
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 rounded-lg text-[12px]"
                                onClick={() => restock(item)}
                              >
                                <PackagePlus className="size-3.5 text-muted-foreground" />
                                Receive 100 units
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 rounded-lg text-[12px]"
                                onClick={() =>
                                  toast.info("Purchase order drafted", {
                                    description: `${item.name} · supplier ${item.supplier}.`,
                                  })
                                }
                              >
                                <Boxes className="size-3.5 text-muted-foreground" />
                                Create purchase order
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                className="gap-2 rounded-lg text-[12px]"
                                onClick={() =>
                                  toast.success("Item archived", {
                                    description: `${item.name} was removed from active inventory.`,
                                  })
                                }
                              >
                                <Trash2 className="size-3.5" />
                                Archive item
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : tab === "Sales" ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    {["Sale", "Patient", "Items", "Method", "Amount"].map((head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                          head === "Sale" ? "pl-5" : "pl-4",
                          head === "Amount" && "text-right pr-5",
                        )}
                      >
                        {head}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow
                      key={sale.id}
                      className="border-border/50 transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="py-3 pl-5">
                        <p className="tabular text-[11.5px] font-semibold">{sale.id}</p>
                        <p className="text-[10px] text-muted-foreground">{sale.time}</p>
                      </TableCell>
                      <TableCell className="py-3 pl-4 text-[11.5px] font-medium">
                        {sale.patient}
                      </TableCell>
                      <TableCell className="py-3 pl-4 text-[11px] text-muted-foreground">
                        {sale.items} {sale.items === 1 ? "item" : "items"}
                      </TableCell>
                      <TableCell className="py-3 pl-4">
                        <span className="rounded bg-muted px-1.5 py-px text-[9.5px] font-medium text-muted-foreground">
                          {sale.method}
                        </span>
                      </TableCell>
                      <TableCell className="tabular py-3 pl-4 pr-5 text-right text-[11.5px] font-semibold">
                        {formatCurrency(sale.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    {["Purchase", "Supplier", "Items", "Amount", "Status"].map((head) => (
                      <TableHead
                        key={head}
                        className={cn(
                          "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                          head === "Purchase" ? "pl-5" : "pl-4",
                          head === "Amount" && "text-right",
                        )}
                      >
                        {head}
                      </TableHead>
                    ))}
                    <TableHead className="h-9 w-24 pr-5" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pharmacyPurchases.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-border/50 transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="py-3 pl-5">
                        <p className="tabular text-[11.5px] font-semibold">{order.id}</p>
                        <p className="text-[10px] text-muted-foreground">{order.date}</p>
                      </TableCell>
                      <TableCell className="py-3 pl-4 text-[11.5px] font-medium">
                        {order.supplier}
                      </TableCell>
                      <TableCell className="py-3 pl-4 text-[11px] text-muted-foreground">
                        {order.items} lines
                      </TableCell>
                      <TableCell className="tabular py-3 pl-4 text-right text-[11.5px] font-semibold">
                        {formatCurrency(order.amount)}
                      </TableCell>
                      <TableCell className="py-3 pl-4">
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="py-3 pr-5 text-right">
                        {order.status === "Pending" ? (
                          <Button
                            size="sm"
                            className="h-7 rounded-lg px-2.5 text-[10.5px]"
                            onClick={() =>
                              toast.success("Stock received", {
                                description: `${order.id} · ${order.supplier} · ${formatCurrency(order.amount)}`,
                              })
                            }
                          >
                            Receive
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-lg bg-card px-2.5 text-[10.5px]"
                            onClick={() =>
                              toast.success("Purchase order opened", { description: order.id })
                            }
                          >
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {tab === "Inventory" && filtered.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto grid size-11 place-items-center rounded-full bg-muted text-muted-foreground">
                <Pill className="size-5" />
              </div>
              <p className="mt-3 text-[13px] font-semibold">No medicines found</p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Try a different search or turn off the attention filter.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between border-t border-border/60 px-5 py-3">
          <p className="text-[11.5px] text-muted-foreground">
            {tab === "Inventory" ? (
              <>
                <span className="font-semibold text-foreground">{filtered.length}</span> medicines ·
                stock value{" "}
                <span className="font-semibold text-foreground">
                  {formatCompactCurrency(stockValue)}
                </span>
              </>
            ) : tab === "Sales" ? (
              <>
                <span className="font-semibold text-foreground">{sales.length}</span> sales today ·
                {" "}
                <span className="font-semibold text-foreground">
                  {formatCompactCurrency(sales.reduce((sum, sale) => sum + sale.amount, 0))}
                </span>
              </>
            ) : (
              <>
                <span className="font-semibold text-foreground">
                  {pharmacyPurchases.length}
                </span>{" "}
                purchase orders ·{" "}
                <span className="font-semibold text-foreground">
                  {formatCompactCurrency(
                    pharmacyPurchases.reduce((sum, order) => sum + order.amount, 0),
                  )}
                </span>{" "}
                procured
              </>
            )}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-lg bg-card text-[11px]"
            onClick={() =>
              toast.success("Stock report exported", {
                description: "pharmacy-inventory.xlsx is ready.",
              })
            }
          >
            Export
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={!!saleItem} onOpenChange={(open) => !open && setSaleItem(null)}>
        <DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-md">
          {saleItem && (
            <>
              <DialogHeader className="border-b border-border/70 px-6 py-5">
                <DialogTitle className="text-[16px] tracking-tight">New pharmacy sale</DialogTitle>
                <DialogDescription className="text-[12.5px]">
                  Dispense against a prescription and collect payment.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 px-6 py-5">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-3.5 py-3">
                  <div>
                    <p className="text-[12px] font-semibold">{saleItem.name}</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      Batch {saleItem.batch} · {saleItem.stock} units available
                    </p>
                  </div>
                  <p className="tabular text-[12px] font-semibold">
                    {formatCurrency(saleItem.price)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px]">Patient</Label>
                  <Select value={patient} onValueChange={setPatient}>
                    <SelectTrigger className="h-10 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} · {item.id}
                        </SelectItem>
                      ))}
                      <SelectItem value="walk-in">Walk-in customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[12px]">Quantity</Label>
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Decrease quantity"
                        className="rounded-lg"
                        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        max={saleItem.stock}
                        value={quantity}
                        onChange={(event) =>
                          setQuantity(
                            Math.min(
                              saleItem.stock,
                              Math.max(1, Number(event.target.value) || 1),
                            ),
                          )
                        }
                        className="tabular h-8 w-14 rounded-lg text-center text-[12px]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Increase quantity"
                        className="rounded-lg"
                        onClick={() =>
                          setQuantity((value) => Math.min(saleItem.stock, value + 1))
                        }
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[12px]">Payment</Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger className="h-10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Bank transfer">Bank transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-primary/5 px-3.5 py-3 ring-1 ring-inset ring-primary/10">
                  <span className="text-[11.5px] font-medium text-muted-foreground">Total</span>
                  <span className="tabular text-[16px] font-semibold">
                    {formatCurrency(saleItem.price * quantity)}
                  </span>
                </div>
              </div>

              <DialogFooter className="border-t border-border/70 px-6 py-4 sm:justify-between">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setSaleItem(null)}
                >
                  Cancel
                </Button>
                <Button className="rounded-xl" onClick={completeSale}>
                  <ShoppingCart className="size-4" />
                  Complete sale
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
