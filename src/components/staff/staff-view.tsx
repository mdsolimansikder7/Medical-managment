"use client";

import * as React from "react";
import { MoreHorizontal, Search, ShieldCheck, UserCog, UserPlus } from "lucide-react";
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
import { PersonAvatar } from "@/components/person-avatar";
import { StatusBadge } from "@/components/status-badge";
import { staff, type Role } from "@/lib/data";
import { cn } from "@/lib/utils";

const roleStyles: Record<Role, string> = {
  "Super Admin": "bg-teal-500/10 text-teal-700 border-teal-500/20 dark:text-teal-400",
  Doctor: "bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-400",
  Receptionist: "bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-400",
  "Lab Technician": "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400",
  Pharmacist: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
  Accountant: "bg-orange-500/10 text-orange-700 border-orange-500/20 dark:text-orange-400",
  Patient: "bg-muted text-muted-foreground border-border",
};

const roles = Object.keys(roleStyles) as Role[];

export function StaffView() {
  const [query, setQuery] = React.useState("");
  const [role, setRole] = React.useState("all");

  const filtered = staff.filter((member) => {
    const term = query.trim().toLowerCase();
    const matchesQuery =
      !term ||
      [member.name, member.email, member.department].some((value) =>
        value.toLowerCase().includes(term),
      );
    const matchesRole = role === "all" || member.role === role;
    return matchesQuery && matchesRole;
  });

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <CardHeader className="gap-3 border-b border-border/60 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold">Team members</p>
            <p className="text-[11px] text-muted-foreground">
              {staff.length} users · role-based access control
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-9 w-[145px] rounded-xl text-[12px]">
                <SelectValue placeholder="All roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {roles.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1 sm:w-48">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search users…"
                className="h-9 rounded-xl pl-8 text-[12px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                {["Member", "Role", "Department", "Status", "Last active"].map((head) => (
                  <TableHead
                    key={head}
                    className={cn(
                      "h-9 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground/80",
                      head === "Member" ? "pl-5" : "pl-4",
                      head === "Department" && "hidden lg:table-cell",
                      head === "Last active" && "hidden xl:table-cell",
                    )}
                  >
                    {head}
                  </TableHead>
                ))}
                <TableHead className="h-9 w-10 pr-5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((member) => (
                <TableRow
                  key={member.id}
                  className="border-border/50 transition-colors hover:bg-muted/40"
                >
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <PersonAvatar name={member.name} accent={member.accent} size="sm" />
                      <div className="min-w-0">
                        <p className="whitespace-nowrap text-[12px] font-semibold">
                          {member.name}
                        </p>
                        <p className="truncate text-[10px] text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 pl-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
                        roleStyles[member.role],
                      )}
                    >
                      {member.role === "Super Admin" && <ShieldCheck className="size-3" />}
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="hidden py-3 pl-4 text-[11px] text-muted-foreground lg:table-cell">
                    {member.department}
                  </TableCell>
                  <TableCell className="py-3 pl-4">
                    <StatusBadge status={member.status} />
                  </TableCell>
                  <TableCell className="hidden py-3 pl-4 text-[10.5px] text-muted-foreground xl:table-cell">
                    {member.lastActive}
                  </TableCell>
                  <TableCell className="py-3 pr-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${member.name}`}
                          className="size-7 rounded-lg text-muted-foreground"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuLabel className="text-[10.5px] uppercase tracking-wide text-muted-foreground">
                          {member.id}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() =>
                            toast.info("Edit member", {
                              description: `Opening access settings for ${member.name}.`,
                            })
                          }
                        >
                          <UserCog className="size-3.5 text-muted-foreground" />
                          Edit role &amp; access
                        </DropdownMenuItem>
                        {member.status === "Invited" ? (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg text-[12px]"
                            onClick={() =>
                              toast.success("Invitation resent", {
                                description: `${member.email} will receive a new link.`,
                              })
                            }
                          >
                            <UserPlus className="size-3.5 text-muted-foreground" />
                            Resend invitation
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg text-[12px]"
                            onClick={() =>
                              toast.success("Password reset link sent", {
                                description: member.email,
                              })
                            }
                          >
                            <ShieldCheck className="size-3.5 text-muted-foreground" />
                            Reset password
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          className="gap-2 rounded-lg text-[12px]"
                          onClick={() =>
                            toast.success(
                              member.status === "Suspended" ? "Access restored" : "Access suspended",
                              { description: member.name },
                            )
                          }
                        >
                          <ShieldCheck className="size-3.5" />
                          {member.status === "Suspended"
                            ? "Reactivate user"
                            : "Suspend access"}
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
            <p className="text-[13px] font-semibold">No users match this filter</p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Try a different role or clear the search.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between border-t border-border/60 px-5 py-3">
        <p className="text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          {staff.length} users shown
        </p>
        <p className="text-[10.5px] text-muted-foreground/80">
          Permissions are enforced on the server, not just in the UI
        </p>
      </CardFooter>
    </Card>
  );
}
