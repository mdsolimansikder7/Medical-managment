# MediCare — Hospital Management Dashboard

A modern, responsive hospital management interface built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

## Live Demo

🚀 **Live Website:** [MediCare Live Demo](https://medical-managment-seven.vercel.app/)

## GitHub Repository

💻 **Source Code:** [Medical-managment on GitHub](https://github.com/mdsolimansikder7/Medical-managment)

## Pages & Features

| Route | Description |
|---|---|
| `/` | Dashboard with KPIs, patient overview, schedules, department statistics, and recent activity |
| `/appointments` | Appointment management, status filters, search, and appointment statistics |
| `/patients` | Patient registry, department filters, vitals preview, and patient details |
| `/doctors` | Doctor directory, availability, ratings, and booking actions |
| `/consultations` | Consultation records, digital prescriptions, and token queue |
| `/laboratory` | Lab orders, sample workflow, report entry, and test catalogue |
| `/pharmacy` | Inventory, sales, purchases, low-stock alerts, and expiry alerts |
| `/records` | Medical records timeline, prescriptions, and lab-report uploads |
| `/billing` | Invoices, revenue statistics, collections, and payment summaries |
| `/reports` | Financial charts, revenue breakdown, and doctor and department performance |
| `/staff` | Staff directory, role filters, invitations, and permissions |
| `/profile` | Personal details, password settings, and session management |
| `/settings` | Theme, notifications, regional preferences, and security settings |
| `/sign-in`, `/sign-up` | Authentication interface and doctor registration workflow |

## Tech Stack

- **Next.js 16** — App Router
- **React 19** — UI components
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **shadcn/ui** — Reusable UI components
- **Recharts** — Data visualization
- **Lucide React** — Icons
- **next-themes** — Light and dark mode
- **Sonner** — Toast notifications

## Getting Started

### Prerequisites

- Node.js installed
- npm installed
- Git installed

### Installation

Clone the repository:

```bash
git clone https://github.com/mdsolimansikder7/Medical-managment.git
```

Navigate to the project directory:

```bash
cd Medical-managment
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run typecheck` | Check TypeScript types |

## Project Structure

```text
src/
├── app/
│   ├── (auth)/             # Sign-in and sign-up pages
│   ├── (dashboard)/        # Dashboard layout and protected pages
│   │   ├── appointments/
│   │   ├── patients/
│   │   ├── doctors/
│   │   ├── consultations/
│   │   ├── laboratory/
│   │   ├── pharmacy/
│   │   ├── records/
│   │   ├── billing/
│   │   ├── reports/
│   │   ├── staff/
│   │   ├── profile/
│   │   └── settings/
│   ├── globals.css         # Global styles and design tokens
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── auth/               # Authentication components
│   ├── layout/             # Sidebar, topbar, and app shell
│   ├── dashboard/
│   ├── appointments/
│   ├── patients/
│   ├── doctors/
│   ├── consultations/
│   ├── laboratory/
│   ├── pharmacy/
│   ├── records/
│   ├── billing/
│   ├── reports/
│   ├── staff/
│   ├── profile/
│   └── settings/
└── lib/
    ├── data.ts             # Demo data
    ├── session.tsx         # Demo session management
    └── utils.ts            # Utility functions
```

## Authentication & Demo Notes

- The application includes demo accounts for testing.
- Doctor registration follows a Super Admin approval workflow.
- Demo accounts and session information use browser `localStorage`.
- Authentication is currently client-side demo functionality and is **not production-ready**.
- The application uses mock data and does not currently require a backend API.

**Security notice:** Do not enter real patient information into this demo. A production medical management system requires secure server-side authentication, authorization, database integration, and appropriate patient-data protection.

## Design Highlights

- Responsive layout for mobile, tablet, and desktop.
- Light and dark themes.
- Emerald and teal accent colors.
- Interactive charts and statistics.
- Reusable components and consistent UI styling.
- Dashboard navigation and role-oriented management interfaces.

