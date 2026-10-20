# MediCare — Hospital Management Dashboard

A modern, responsive hospital management interface built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui**.

## Pages

| Route | What it covers |
| --- | --- |
| `/` | Executive dashboard — KPIs, patient overview, care journey, today's schedule, department load, care team, activity feed, recent patients, quick actions |
| `/appointments` | Appointment queue with status tabs, live search, row actions, weekly volume chart and live tokens |
| `/patients` | Patient registry with status/department filters, vitals preview cards and a full detail sheet |
| `/doctors` | Doctor directory with availability, ratings and booking actions |
| `/consultations` | Consultation records, digital prescriptions with printable Rx preview, token queue and common diagnoses |
| `/laboratory` | Lab orders by status, sample workflow, report entry/approval and test catalogue |
| `/pharmacy` | Inventory, sales and purchase tabs, stock decrements, low-stock and expiry alerts |
| `/records` | Medical records timeline, prescriptions and lab-report upload |
| `/billing` | Revenue KPIs, invoice table, collection summary and payment method breakdown |
| `/reports` | Finance chart, revenue mix, daily cash summary, doctor and department performance |
| `/staff` | Staff directory, role filter, invite dialog and role/permission matrix |
| `/profile` | Editable personal details, password change, 2FA toggle and active sessions |
| `/settings` | Appearance (light/dark/system), notification switches, regional formats, security prefs |
| `/sign-in`, `/sign-up` | Split-panel authentication; doctor-only registration with Super Admin approval |

## Demo authentication

The app ships with a client-side demo directory (no backend required):

- **Super Admin** — `admin@medicare.com` · any password of 6+ characters (or use **Use the demo account**).
- **Seeded staff** — `sadia.islam@medicare.com` (Doctor), `nusrat.karim@medicare.com` (Receptionist), `rakib.hasan@medicare.com` (Lab Technician), `farhana.akter@medicare.com` (Pharmacist) · same 6+ character rule.
- **Doctor self-registration** — `/sign-up` is doctor-only. Submitting creates a **pending approval**, not a session. Sign in as the Super Admin, open **Staff & roles → Doctor approvals**, and approve the request; the doctor can then sign in with that email.
- Administrator, reception, laboratory, pharmacy and accounting accounts are **not** publicly registerable — the Super Admin creates them from Staff & roles.
- Unknown, suspended or invited emails are rejected with a clear message. Accounts live in `localStorage` (`medicare.accounts`, `medicare.pending-doctors`); the session is `medicare.session.v2`.
- **Authentication is mandatory** — every dashboard route is guarded. Opening the app without a session redirects to `/sign-in`; there is no auto-login demo session.
- This is **not production auth** — replace `src/lib/session.tsx` and `src/lib/accounts.ts` with real server-side sessions and role provisioning before deploying to a hospital network.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** with an OKLCH design-token theme (`src/app/globals.css`)
- **shadcn/ui** components in `src/components/ui`
- **Recharts** for the area, donut and bar charts
- **next-themes** for light/dark mode
- **Lucide** icons, **Sonner** toasts

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build     # production build
npm run start     # serve the production build
npm run typecheck # tsc --noEmit
```

## Project structure

```
src/
├─ app/
│  ├─ (auth)/             # sign-in / sign-up (split brand panel)
│  ├─ (dashboard)/        # guarded sidebar + topbar shell
│  │  ├─ page.tsx         # dashboard
│  │  ├─ appointments/
│  │  ├─ patients/
│  │  ├─ doctors/
│  │  ├─ consultations/
│  │  ├─ laboratory/
│  │  ├─ pharmacy/
│  │  ├─ records/
│  │  ├─ billing/
│  │  ├─ reports/
│  │  ├─ staff/
│  │  ├─ profile/
│  │  └─ settings/
│  ├─ globals.css         # design tokens, theme, utilities
│  └─ layout.tsx          # fonts, theme provider, session, toaster
├─ components/
│  ├─ ui/                 # shadcn primitives
│  ├─ auth/               # auth shell + forms
│  ├─ layout/             # sidebar, topbar, app shell, auth guard
│  ├─ dashboard/          # dashboard widgets
│  ├─ appointments/       # appointment widgets
│  ├─ patients/           # patient directory + dialogs
│  ├─ doctors/            # doctor directory
│  ├─ consultations/      # Rx cards, new visit dialog, print preview
│  ├─ laboratory/         # lab queue, report entry, test catalogue
│  ├─ pharmacy/           # inventory, sales, purchases, alerts
│  ├─ records/            # records timeline widgets
│  ├─ billing/            # invoice + collection widgets
│  ├─ reports/            # finance, revenue mix, performance tables
│  ├─ staff/              # directory, invite dialog, role matrix
│  ├─ profile/            # profile form + security + sessions
│  └─ settings/           # appearance, notifications, regional, security
└─ lib/
   ├─ data.ts             # typed mock data
   ├─ session.tsx         # demo session provider (localStorage)
   └─ utils.ts            # cn, accent tokens, currency formatters
```

## Design notes

- Emerald/teal primary with a soft neutral canvas, 2xl cards, hairline borders and layered shadows.
- Accent system (`src/lib/utils.ts → accents`) keeps icons, avatars, dots and gradients consistent.
- Full light/dark theme via CSS variables; charts read `--chart-*` tokens.
- Compact money notation (`formatCompactCurrency`) uses **K** for thousands and **M** for millions — e.g. `৳86.4K`, `৳1.28M`; exact amounts remain in invoice tables.
- Responsive from mobile (sheet navigation) through tablet to wide desktop grids.
- Settings preferences persist in `localStorage` (`medicare.preferences`); theme is managed by `next-themes`.

All data is mocked in `src/lib/data.ts` and rendered locally, so the UI runs without a backend. Swap the mock arrays for API calls when a server is ready.
