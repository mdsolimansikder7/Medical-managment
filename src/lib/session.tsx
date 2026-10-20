"use client";

import * as React from "react";

import { demoAccount, findAccount, submitDoctorRequest } from "@/lib/accounts";

export type SessionUser = {
  name: string;
  email: string;
  role: string;
  phone: string;
  department: string;
  joined: string;
};

type SignInInput = { email: string; password: string };
type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

type SessionResult = { ok: true } | { ok: false; error: string };

type SessionContextValue = {
  user: SessionUser | null;
  ready: boolean;
  signIn: (input: SignInInput) => SessionResult;
  signUp: (input: SignUpInput) => SessionResult;
  signOut: () => void;
  updateUser: (patch: Partial<SessionUser>) => void;
};

const STORAGE_KEY = "medicare.session";
const SIGNED_OUT = "signed-out";

const demoUser: SessionUser = { ...demoAccount };

const SessionContext = React.createContext<SessionContextValue | null>(null);

function persist(user: SessionUser | null) {
  try {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.setItem(STORAGE_KEY, SIGNED_OUT);
    }
  } catch {
    // Storage can be unavailable (private mode); the session still works in memory.
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // The demo account is the default so the dashboard is usable on first load.
  const [user, setUser] = React.useState<SessionUser | null>(demoUser);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setUser(demoUser);
      } else if (stored === SIGNED_OUT) {
        setUser(null);
      } else {
        const parsed = JSON.parse(stored) as SessionUser;
        if (parsed && typeof parsed.email === "string") {
          setUser({ ...demoUser, ...parsed });
        }
      }
    } catch {
      setUser(demoUser);
    } finally {
      setReady(true);
    }
  }, []);

  const signIn = React.useCallback(({ email, password }: SignInInput): SessionResult => {
    const cleanEmail = email.trim().toLowerCase();

    if (!isValidEmail(cleanEmail)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (password.length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }

    const result = findAccount(cleanEmail);

    if (!result.account) {
      if (result.reason === "pending") {
        return {
          ok: false,
          error:
            "Your doctor application is still awaiting approval by a Super Admin.",
        };
      }
      if (result.reason === "inactive") {
        return {
          ok: false,
          error: "This account is not active. Contact your administrator.",
        };
      }
      return {
        ok: false,
        error:
          "No account found for this email. Ask your administrator for an invitation.",
      };
    }

    const nextUser: SessionUser = { ...result.account };
    setUser(nextUser);
    persist(nextUser);
    return { ok: true };
  }, []);

  const signUp = React.useCallback(
    ({ name, email, password }: SignUpInput): SessionResult => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (cleanName.length < 2) {
        return { ok: false, error: "Enter your full name." };
      }
      if (!isValidEmail(cleanEmail)) {
        return { ok: false, error: "Enter a valid email address." };
      }
      if (password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
      }

      // Public registration is doctor-only and stays pending until a Super Admin
      // approves it from Staff & roles.
      return submitDoctorRequest(cleanName, cleanEmail);
    },
    [],
  );

  const signOut = React.useCallback(() => {
    setUser(null);
    persist(null);
  }, []);

  const updateUser = React.useCallback((patch: Partial<SessionUser>) => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      persist(next);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ user, ready, signIn, signUp, signOut, updateUser }),
    [user, ready, signIn, signUp, signOut, updateUser],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
