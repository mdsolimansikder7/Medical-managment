import { staff, type Role } from "@/lib/data";

export type Account = {
  name: string;
  email: string;
  role: Role;
  phone: string;
  department: string;
  joined: string;
};

export type DoctorRequest = {
  name: string;
  email: string;
  createdAt: string;
};

const ACCOUNTS_KEY = "medicare.accounts";
const PENDING_KEY = "medicare.pending-doctors";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode); callers still get a result.
  }
}

function staffToAccount(member: (typeof staff)[number]): Account {
  return {
    name: member.name,
    email: member.email.toLowerCase(),
    role: member.role,
    phone: "",
    department: member.department,
    joined: member.role === "Super Admin" ? "January 2023" : "June 2024",
  };
}

export function getPendingDoctors(): DoctorRequest[] {
  if (typeof window === "undefined") return [];
  return readJson<DoctorRequest[]>(PENDING_KEY, []);
}

export function getApprovedAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  return readJson<Account[]>(ACCOUNTS_KEY, []);
}

export function submitDoctorRequest(
  name: string,
  email: string,
): { ok: true } | { ok: false; error: string } {
  const cleanEmail = email.trim().toLowerCase();

  const existingStaff = staff.find(
    (member) => member.email.toLowerCase() === cleanEmail,
  );
  if (existingStaff) {
    return {
      ok: false,
      error: "An account with this email already exists. Sign in instead.",
    };
  }

  if (getApprovedAccounts().some((account) => account.email === cleanEmail)) {
    return {
      ok: false,
      error: "An account with this email already exists. Sign in instead.",
    };
  }

  const pending = getPendingDoctors();
  if (pending.some((request) => request.email === cleanEmail)) {
    return {
      ok: false,
      error: "An application for this email is already awaiting approval.",
    };
  }

  pending.push({
    name: name.trim(),
    email: cleanEmail,
    createdAt: new Date().toISOString(),
  });
  writeJson(PENDING_KEY, pending);

  return { ok: true };
}

export function approveDoctor(
  email: string,
): { ok: true; account: Account } | { ok: false; error: string } {
  const cleanEmail = email.trim().toLowerCase();
  const pending = getPendingDoctors();
  const request = pending.find((item) => item.email === cleanEmail);

  if (!request) {
    return { ok: false, error: "This request is no longer available." };
  }

  const account: Account = {
    name: request.name,
    email: request.email,
    role: "Doctor",
    phone: "",
    department: "Clinical",
    joined: new Date().toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    }),
  };

  const accounts = getApprovedAccounts();
  if (!accounts.some((item) => item.email === account.email)) {
    accounts.push(account);
    writeJson(ACCOUNTS_KEY, accounts);
  }

  writeJson(
    PENDING_KEY,
    pending.filter((item) => item.email !== cleanEmail),
  );

  return { ok: true, account };
}

export function rejectDoctor(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  writeJson(
    PENDING_KEY,
    getPendingDoctors().filter((item) => item.email !== cleanEmail),
  );
}

/**
 * Resolve a demo sign-in to an account. Staff accounts come from the seeded
 * directory; approved doctors come from local registrations.
 */
export function findAccount(email: string):
  | { account: Account; reason?: never }
  | { account: null; reason: "pending" | "inactive" | "missing" } {
  const cleanEmail = email.trim().toLowerCase();
  const member = staff.find(
    (item) => item.email.toLowerCase() === cleanEmail,
  );

  if (member) {
    if (member.status !== "Active") {
      return { account: null, reason: "inactive" };
    }
    return { account: staffToAccount(member) };
  }

  const approved = getApprovedAccounts().find(
    (item) => item.email === cleanEmail,
  );
  if (approved) {
    return { account: approved };
  }

  if (getPendingDoctors().some((item) => item.email === cleanEmail)) {
    return { account: null, reason: "pending" };
  }

  return { account: null, reason: "missing" };
}

export const demoAccount: Account = {
  name: "Dr. Solaiman Rahman",
  email: "admin@medicare.com",
  role: "Super Admin",
  phone: "+880 1711-000 001",
  department: "Administration",
  joined: "January 2023",
};
