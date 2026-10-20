import Link from "next/link";
import { Activity, CalendarCheck2, ShieldCheck, Stethoscope } from "lucide-react";

import { AuthTopLink } from "@/components/auth/auth-top-link";

const highlights = [
  {
    icon: CalendarCheck2,
    title: "One patient journey",
    detail: "Registration, appointment, consultation, lab and billing in a single flow.",
  },
  {
    icon: Activity,
    title: "Live clinical operations",
    detail: "Queue, prescriptions, diagnostics and pharmacy stock update in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based by design",
    detail: "Every role sees exactly what it needs — and nothing more.",
  },
];

const stats = [
  { value: "4,820", label: "Patients" },
  { value: "24", label: "Doctors" },
  { value: "99.9%", label: "Uptime" },
];

export function AuthShell({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up";
}) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-[#042f2e] p-10 text-white lg:flex lg:flex-col xl:p-14">
        <div className="pointer-events-none absolute -left-32 top-1/4 size-[420px] rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-[320px] rounded-full bg-emerald-400/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 75%)",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-teal-950 shadow-lg shadow-teal-950/40">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <p className="text-[15px] font-semibold leading-tight tracking-tight">MediCare</p>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.24em] text-teal-200/70">
              Hospital Suite
            </p>
          </div>
        </div>

        <div className="relative my-auto max-w-md py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-teal-100 backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Trusted by 4,800+ patients
          </span>

          <h1 className="mt-6 text-[34px] font-semibold leading-[1.12] tracking-tight xl:text-[40px]">
            The operating system for calmer, connected care.
          </h1>
          <p className="mt-4 text-[13.5px] leading-relaxed text-teal-100/70">
            From the reception desk to the pharmacy counter — every handoff is captured, every
            record stays with the patient.
          </p>

          <ul className="mt-9 space-y-5">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.title} className="flex gap-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-teal-300">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-teal-100/60">
                      {item.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.05] py-4 backdrop-blur">
            {stats.map((item) => (
              <div key={item.label} className="px-4 text-center">
                <p className="tabular text-[18px] font-semibold leading-tight">{item.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-teal-100/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10.5px] text-teal-100/40">
            © 2026 MediCare Hospital · Dhaka, Bangladesh
          </p>
        </div>
      </aside>

      <main className="flex min-h-svh flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
              <Stethoscope className="size-4" />
            </span>
            <div>
              <p className="text-[13.5px] font-semibold leading-tight tracking-tight">MediCare</p>
              <p className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Hospital Suite
              </p>
            </div>
          </Link>
          <div className="ml-auto">
            <AuthTopLink mode={mode} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        <div className="flex items-center justify-center gap-3 text-[10.5px] text-muted-foreground/70">
          <span>© 2026 MediCare</span>
          <span className="text-border">·</span>
          <span>Privacy</span>
          <span className="text-border">·</span>
          <span>Terms</span>
        </div>
      </main>
    </div>
  );
}
