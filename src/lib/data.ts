import type { Accent } from "@/lib/utils";

export type AppointmentStatus = "Scheduled" | "In progress" | "Completed" | "Cancelled";
export type PatientStatus = "Active" | "Critical" | "Recovered" | "New";
export type DoctorStatus = "On duty" | "Off duty" | "In surgery";
export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  bloodGroup: string;
  condition: string;
  department: string;
  status: PatientStatus;
  lastVisit: string;
  admitted: string;
  room: string;
  doctor: string;
  vitals: {
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    oxygen: string;
  };
  accent: Accent;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  department: string;
  status: DoctorStatus;
  rating: number;
  patients: number;
  experience: number;
  phone: string;
  accent: Accent;
  availability: number;
};

export type Appointment = {
  id: string;
  patient: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: "Consultation" | "Follow-up" | "Emergency" | "Check-up";
  status: AppointmentStatus;
  room: string;
  accent: Accent;
};

export type Invoice = {
  id: string;
  patient: string;
  date: string;
  service: string;
  amount: number;
  status: InvoiceStatus;
  method: "Card" | "Cash" | "Insurance" | "Bank transfer";
};

export type MedicalRecord = {
  id: string;
  patient: string;
  doctor: string;
  type: "Prescription" | "Lab report" | "Surgery" | "Diagnosis";
  date: string;
  summary: string;
  department: string;
  accent: Accent;
};

export const patients: Patient[] = [
  {
    id: "PT-1042",
    name: "Ayesha Rahman",
    age: 32,
    gender: "Female",
    phone: "+880 1711-204 882",
    email: "ayesha.rahman@email.com",
    bloodGroup: "A+",
    condition: "Hypertension",
    department: "Cardiology",
    status: "Active",
    lastVisit: "Oct 18, 2026",
    admitted: "Oct 12, 2026",
    room: "C-204",
    doctor: "Dr. Sadia Islam",
    vitals: { heartRate: "78 bpm", bloodPressure: "138/88", temperature: "98.4°F", oxygen: "97%" },
    accent: "teal",
  },
  {
    id: "PT-1043",
    name: "Tanvir Ahmed",
    age: 45,
    gender: "Male",
    phone: "+880 1812-556 310",
    email: "tanvir.ahmed@email.com",
    bloodGroup: "B+",
    condition: "Type 2 Diabetes",
    department: "Endocrinology",
    status: "Critical",
    lastVisit: "Oct 19, 2026",
    admitted: "Oct 19, 2026",
    room: "ICU-3",
    doctor: "Dr. Imran Hossain",
    vitals: { heartRate: "92 bpm", bloodPressure: "150/95", temperature: "99.1°F", oxygen: "94%" },
    accent: "rose",
  },
  {
    id: "PT-1044",
    name: "Nusrat Jahan",
    age: 28,
    gender: "Female",
    phone: "+880 1913-778 045",
    email: "nusrat.jahan@email.com",
    bloodGroup: "O-",
    condition: "Migraine",
    department: "Neurology",
    status: "New",
    lastVisit: "Oct 20, 2026",
    admitted: "—",
    room: "OPD-12",
    doctor: "Dr. Farhan Kabir",
    vitals: { heartRate: "72 bpm", bloodPressure: "118/76", temperature: "98.1°F", oxygen: "99%" },
    accent: "violet",
  },
  {
    id: "PT-1045",
    name: "Rafiq Uddin",
    age: 61,
    gender: "Male",
    phone: "+880 1614-330 219",
    email: "rafiq.uddin@email.com",
    bloodGroup: "AB+",
    condition: "Post-surgery recovery",
    department: "Orthopedics",
    status: "Active",
    lastVisit: "Oct 17, 2026",
    admitted: "Oct 08, 2026",
    room: "B-118",
    doctor: "Dr. Nadia Chowdhury",
    vitals: { heartRate: "80 bpm", bloodPressure: "128/82", temperature: "98.6°F", oxygen: "96%" },
    accent: "amber",
  },
  {
    id: "PT-1046",
    name: "Sadia Noor",
    age: 24,
    gender: "Female",
    phone: "+880 1515-902 664",
    email: "sadia.noor@email.com",
    bloodGroup: "A-",
    condition: "Dermatitis",
    department: "Dermatology",
    status: "Recovered",
    lastVisit: "Oct 11, 2026",
    admitted: "—",
    room: "OPD-05",
    doctor: "Dr. Sadia Islam",
    vitals: { heartRate: "68 bpm", bloodPressure: "112/74", temperature: "98.2°F", oxygen: "98%" },
    accent: "sky",
  },
  {
    id: "PT-1047",
    name: "Mahmud Hasan",
    age: 39,
    gender: "Male",
    phone: "+880 1717-445 908",
    email: "mahmud.hasan@email.com",
    bloodGroup: "O+",
    condition: "Asthma",
    department: "Pulmonology",
    status: "Active",
    lastVisit: "Oct 16, 2026",
    admitted: "Oct 16, 2026",
    room: "C-312",
    doctor: "Dr. Imran Hossain",
    vitals: { heartRate: "88 bpm", bloodPressure: "124/80", temperature: "98.9°F", oxygen: "93%" },
    accent: "emerald",
  },
  {
    id: "PT-1048",
    name: "Farzana Akter",
    age: 51,
    gender: "Female",
    phone: "+880 1819-672 431",
    email: "farzana.akter@email.com",
    bloodGroup: "B-",
    condition: "Arthritis",
    department: "Orthopedics",
    status: "Active",
    lastVisit: "Oct 15, 2026",
    admitted: "Oct 10, 2026",
    room: "B-206",
    doctor: "Dr. Nadia Chowdhury",
    vitals: { heartRate: "76 bpm", bloodPressure: "132/86", temperature: "98.5°F", oxygen: "97%" },
    accent: "orange",
  },
  {
    id: "PT-1049",
    name: "Arif Chowdhury",
    age: 17,
    gender: "Male",
    phone: "+880 1999-118 003",
    email: "arif.chowdhury@email.com",
    bloodGroup: "A+",
    condition: "Fracture (left arm)",
    department: "Emergency",
    status: "New",
    lastVisit: "Oct 20, 2026",
    admitted: "Oct 20, 2026",
    room: "ER-02",
    doctor: "Dr. Farhan Kabir",
    vitals: { heartRate: "84 bpm", bloodPressure: "120/78", temperature: "99.0°F", oxygen: "98%" },
    accent: "rose",
  },
];

export const doctors: Doctor[] = [
  {
    id: "DR-01",
    name: "Dr. Sadia Islam",
    specialty: "Cardiologist",
    department: "Cardiology",
    status: "On duty",
    rating: 4.9,
    patients: 1240,
    experience: 12,
    phone: "+880 1711-000 121",
    accent: "teal",
    availability: 78,
  },
  {
    id: "DR-02",
    name: "Dr. Imran Hossain",
    specialty: "Endocrinologist",
    department: "Endocrinology",
    status: "In surgery",
    rating: 4.8,
    patients: 986,
    experience: 9,
    phone: "+880 1812-000 344",
    accent: "violet",
    availability: 42,
  },
  {
    id: "DR-03",
    name: "Dr. Farhan Kabir",
    specialty: "Neurologist",
    department: "Neurology",
    status: "On duty",
    rating: 4.7,
    patients: 754,
    experience: 8,
    phone: "+880 1913-000 778",
    accent: "sky",
    availability: 65,
  },
  {
    id: "DR-04",
    name: "Dr. Nadia Chowdhury",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    status: "On duty",
    rating: 4.9,
    patients: 1103,
    experience: 14,
    phone: "+880 1614-000 902",
    accent: "amber",
    availability: 88,
  },
  {
    id: "DR-05",
    name: "Dr. Rakib Mahmud",
    specialty: "Pulmonologist",
    department: "Pulmonology",
    status: "Off duty",
    rating: 4.6,
    patients: 612,
    experience: 6,
    phone: "+880 1515-000 553",
    accent: "emerald",
    availability: 20,
  },
  {
    id: "DR-06",
    name: "Dr. Sabrina Karim",
    specialty: "Dermatologist",
    department: "Dermatology",
    status: "On duty",
    rating: 4.8,
    patients: 845,
    experience: 10,
    phone: "+880 1717-000 665",
    accent: "rose",
    availability: 71,
  },
];

export const appointments: Appointment[] = [
  {
    id: "AP-2041",
    patient: "Nusrat Jahan",
    patientId: "PT-1044",
    doctor: "Dr. Farhan Kabir",
    department: "Neurology",
    date: "Oct 20, 2026",
    time: "09:30 AM",
    type: "Consultation",
    status: "In progress",
    room: "OPD-12",
    accent: "violet",
  },
  {
    id: "AP-2042",
    patient: "Rafiq Uddin",
    patientId: "PT-1045",
    doctor: "Dr. Nadia Chowdhury",
    department: "Orthopedics",
    date: "Oct 20, 2026",
    time: "10:15 AM",
    type: "Follow-up",
    status: "Scheduled",
    room: "B-118",
    accent: "amber",
  },
  {
    id: "AP-2043",
    patient: "Ayesha Rahman",
    patientId: "PT-1042",
    doctor: "Dr. Sadia Islam",
    department: "Cardiology",
    date: "Oct 20, 2026",
    time: "11:00 AM",
    type: "Check-up",
    status: "Scheduled",
    room: "C-204",
    accent: "teal",
  },
  {
    id: "AP-2044",
    patient: "Arif Chowdhury",
    patientId: "PT-1049",
    doctor: "Dr. Farhan Kabir",
    department: "Emergency",
    date: "Oct 20, 2026",
    time: "11:45 AM",
    type: "Emergency",
    status: "Scheduled",
    room: "ER-02",
    accent: "rose",
  },
  {
    id: "AP-2045",
    patient: "Mahmud Hasan",
    patientId: "PT-1047",
    doctor: "Dr. Rakib Mahmud",
    department: "Pulmonology",
    date: "Oct 20, 2026",
    time: "12:30 PM",
    type: "Consultation",
    status: "Scheduled",
    room: "C-312",
    accent: "emerald",
  },
  {
    id: "AP-2038",
    patient: "Sadia Noor",
    patientId: "PT-1046",
    doctor: "Dr. Sabrina Karim",
    department: "Dermatology",
    date: "Oct 19, 2026",
    time: "04:00 PM",
    type: "Follow-up",
    status: "Completed",
    room: "OPD-05",
    accent: "sky",
  },
  {
    id: "AP-2037",
    patient: "Farzana Akter",
    patientId: "PT-1048",
    doctor: "Dr. Nadia Chowdhury",
    department: "Orthopedics",
    date: "Oct 19, 2026",
    time: "02:30 PM",
    type: "Consultation",
    status: "Completed",
    room: "B-206",
    accent: "orange",
  },
  {
    id: "AP-2036",
    patient: "Tanvir Ahmed",
    patientId: "PT-1043",
    doctor: "Dr. Imran Hossain",
    department: "Endocrinology",
    date: "Oct 19, 2026",
    time: "01:15 PM",
    type: "Emergency",
    status: "Completed",
    room: "ICU-3",
    accent: "rose",
  },
  {
    id: "AP-2035",
    patient: "Kamal Hossain",
    patientId: "PT-1031",
    doctor: "Dr. Sadia Islam",
    department: "Cardiology",
    date: "Oct 18, 2026",
    time: "10:00 AM",
    type: "Consultation",
    status: "Cancelled",
    room: "C-201",
    accent: "slate",
  },
  {
    id: "AP-2034",
    patient: "Rumana Islam",
    patientId: "PT-1029",
    doctor: "Dr. Sabrina Karim",
    department: "Dermatology",
    date: "Oct 18, 2026",
    time: "09:00 AM",
    type: "Check-up",
    status: "Completed",
    room: "OPD-05",
    accent: "sky",
  },
];

export const invoices: Invoice[] = [
  { id: "INV-8841", patient: "Ayesha Rahman", date: "Oct 18, 2026", service: "Cardiology consultation", amount: 3400, status: "Paid", method: "Card" },
  { id: "INV-8842", patient: "Tanvir Ahmed", date: "Oct 19, 2026", service: "ICU admission (2 days)", amount: 42500, status: "Pending", method: "Insurance" },
  { id: "INV-8843", patient: "Rafiq Uddin", date: "Oct 17, 2026", service: "Orthopedic surgery", amount: 86000, status: "Paid", method: "Bank transfer" },
  { id: "INV-8844", patient: "Nusrat Jahan", date: "Oct 20, 2026", service: "Neurology consultation", amount: 2800, status: "Pending", method: "Cash" },
  { id: "INV-8845", patient: "Sadia Noor", date: "Oct 11, 2026", service: "Dermatology follow-up", amount: 1500, status: "Paid", method: "Card" },
  { id: "INV-8846", patient: "Mahmud Hasan", date: "Oct 16, 2026", service: "Pulmonology + nebulization", amount: 6200, status: "Overdue", method: "Insurance" },
  { id: "INV-8847", patient: "Farzana Akter", date: "Oct 15, 2026", service: "Physiotherapy (5 sessions)", amount: 7500, status: "Paid", method: "Cash" },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "MR-5521",
    patient: "Ayesha Rahman",
    doctor: "Dr. Sadia Islam",
    type: "Prescription",
    date: "Oct 18, 2026 · 10:42 AM",
    summary: "Amlodipine 5mg once daily, low-sodium diet, review after 14 days.",
    department: "Cardiology",
    accent: "teal",
  },
  {
    id: "MR-5522",
    patient: "Tanvir Ahmed",
    doctor: "Dr. Imran Hossain",
    type: "Lab report",
    date: "Oct 19, 2026 · 08:15 AM",
    summary: "HbA1c 8.4% — elevated. Fasting glucose 168 mg/dL. Insulin plan adjusted.",
    department: "Endocrinology",
    accent: "rose",
  },
  {
    id: "MR-5523",
    patient: "Rafiq Uddin",
    doctor: "Dr. Nadia Chowdhury",
    type: "Surgery",
    date: "Oct 08, 2026 · 07:30 PM",
    summary: "Total knee replacement, left leg. Procedure completed without complications.",
    department: "Orthopedics",
    accent: "amber",
  },
  {
    id: "MR-5524",
    patient: "Mahmud Hasan",
    doctor: "Dr. Rakib Mahmud",
    type: "Diagnosis",
    date: "Oct 16, 2026 · 03:10 PM",
    summary: "Moderate persistent asthma. Spirometry shows 68% FEV1. Started ICS/LABA.",
    department: "Pulmonology",
    accent: "emerald",
  },
  {
    id: "MR-5525",
    patient: "Nusrat Jahan",
    doctor: "Dr. Farhan Kabir",
    type: "Diagnosis",
    date: "Oct 20, 2026 · 09:35 AM",
    summary: "Chronic migraine without aura. MRI clear. Started preventive therapy.",
    department: "Neurology",
    accent: "violet",
  },
];

export const patientOverview = [
  { month: "May", patients: 820, appointments: 1040, revenue: 62 },
  { month: "Jun", patients: 910, appointments: 1180, revenue: 68 },
  { month: "Jul", patients: 880, appointments: 1120, revenue: 64 },
  { month: "Aug", patients: 1040, appointments: 1310, revenue: 79 },
  { month: "Sep", patients: 1180, appointments: 1460, revenue: 86 },
  { month: "Oct", patients: 1310, appointments: 1620, revenue: 94 },
];

export const weeklyAppointments = [
  { day: "Mon", completed: 42, scheduled: 48 },
  { day: "Tue", completed: 51, scheduled: 56 },
  { day: "Wed", completed: 38, scheduled: 44 },
  { day: "Thu", completed: 62, scheduled: 68 },
  { day: "Fri", completed: 57, scheduled: 63 },
  { day: "Sat", completed: 34, scheduled: 40 },
  { day: "Sun", completed: 18, scheduled: 22 },
];

export const departmentShare = [
  { name: "Cardiology", value: 32, color: "#0d9488" },
  { name: "Orthopedics", value: 24, color: "#8b5cf6" },
  { name: "Neurology", value: 18, color: "#0ea5e9" },
  { name: "Pediatrics", value: 14, color: "#f59e0b" },
  { name: "Others", value: 12, color: "#94a3b8" },
];

export const activityFeed: {
  id: number;
  title: string;
  detail: string;
  time: string;
  accent: Accent;
}[] = [
  { id: 1, title: "New patient registered", detail: "Arif Chowdhury · Emergency", time: "2 min ago", accent: "rose" },
  { id: 2, title: "Lab report uploaded", detail: "Tanvir Ahmed · HbA1c panel", time: "18 min ago", accent: "violet" },
  { id: 3, title: "Appointment completed", detail: "Mahmud Hasan · Dr. Rakib Mahmud", time: "42 min ago", accent: "emerald" },
  { id: 4, title: "Invoice paid", detail: "INV-8841 · ৳3,400 via card", time: "1 hr ago", accent: "teal" },
  { id: 5, title: "Surgery scheduled", detail: "Rafiq Uddin · Oct 24, 09:00 AM", time: "2 hr ago", accent: "amber" },
];

export const stats = {
  totalPatients: 4820,
  todayAppointments: 48,
  availableDoctors: 24,
  revenue: 1284500,
  pendingInvoices: 6,
  criticalCases: 3,
};

/* ------------------------------------------------------------------ */
/*  Consultations & prescriptions                                      */
/* ------------------------------------------------------------------ */

export type PrescriptionMedicine = {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
};

export type Prescription = {
  id: string;
  patient: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  symptoms: string;
  diagnosis: string;
  advice: string;
  followUp: string;
  status: "Issued" | "Draft";
  accent: Accent;
  medicines: PrescriptionMedicine[];
};

export const prescriptions: Prescription[] = [
  {
    id: "RX-3021",
    patient: "Ayesha Rahman",
    patientId: "PT-1042",
    doctor: "Dr. Sadia Islam",
    department: "Cardiology",
    date: "Oct 18, 2026",
    time: "10:42 AM",
    symptoms: "Persistent headache, occasional chest tightness in the evening.",
    diagnosis: "Stage 1 hypertension with mild angina risk",
    advice: "Low-sodium diet, 30 min brisk walk daily, monitor BP twice a day.",
    followUp: "Nov 01, 2026",
    status: "Issued",
    accent: "teal",
    medicines: [
      {
        name: "Amlodipine 5mg",
        dose: "1 tablet",
        frequency: "Once daily, after dinner",
        duration: "14 days",
      },
      {
        name: "Aspirin 75mg",
        dose: "1 tablet",
        frequency: "Once daily, after breakfast",
        duration: "30 days",
      },
    ],
  },
  {
    id: "RX-3022",
    patient: "Tanvir Ahmed",
    patientId: "PT-1043",
    doctor: "Dr. Imran Hossain",
    department: "Endocrinology",
    date: "Oct 19, 2026",
    time: "08:20 AM",
    symptoms: "Frequent urination, fatigue and blurred vision for two weeks.",
    diagnosis: "Type 2 diabetes mellitus — uncontrolled (HbA1c 8.4%)",
    advice: "Carbohydrate-controlled diet, daily glucose log, foot care routine.",
    followUp: "Oct 26, 2026",
    status: "Issued",
    accent: "rose",
    medicines: [
      {
        name: "Metformin 850mg",
        dose: "1 tablet",
        frequency: "Twice daily, after meals",
        duration: "30 days",
      },
      {
        name: "Insulin glargine 100IU",
        dose: "10 units",
        frequency: "Subcutaneous, at bedtime",
        duration: "30 days",
      },
    ],
  },
  {
    id: "RX-3023",
    patient: "Mahmud Hasan",
    patientId: "PT-1047",
    doctor: "Dr. Rakib Mahmud",
    department: "Pulmonology",
    date: "Oct 16, 2026",
    time: "03:05 PM",
    symptoms: "Shortness of breath on exertion and night-time cough.",
    diagnosis: "Moderate persistent asthma",
    advice: "Avoid dust and cold drinks, use inhaler with spacer, peak-flow diary.",
    followUp: "Oct 30, 2026",
    status: "Issued",
    accent: "emerald",
    medicines: [
      {
        name: "Budesonide + Formoterol 160/4.5",
        dose: "2 puffs",
        frequency: "Twice daily",
        duration: "30 days",
      },
      {
        name: "Salbutamol 100mcg",
        dose: "2 puffs",
        frequency: "As needed (max 8/day)",
        duration: "30 days",
      },
    ],
  },
  {
    id: "RX-3024",
    patient: "Nusrat Jahan",
    patientId: "PT-1044",
    doctor: "Dr. Farhan Kabir",
    department: "Neurology",
    date: "Oct 20, 2026",
    time: "09:35 AM",
    symptoms: "Throbbing unilateral headache with photophobia and nausea.",
    diagnosis: "Chronic migraine without aura",
    advice: "Maintain sleep schedule, avoid triggers, keep headache diary.",
    followUp: "Nov 03, 2026",
    status: "Draft",
    accent: "violet",
    medicines: [
      {
        name: "Sumatriptan 50mg",
        dose: "1 tablet",
        frequency: "At migraine onset",
        duration: "10 days",
      },
      {
        name: "Propranolol 20mg",
        dose: "1 tablet",
        frequency: "Twice daily",
        duration: "30 days",
      },
    ],
  },
  {
    id: "RX-3019",
    patient: "Sadia Noor",
    patientId: "PT-1046",
    doctor: "Dr. Sabrina Karim",
    department: "Dermatology",
    date: "Oct 11, 2026",
    time: "04:10 PM",
    symptoms: "Itching and redness on both forearms after contact with detergent.",
    diagnosis: "Contact dermatitis — irritant type",
    advice: "Avoid harsh detergents, keep skin moisturised, lukewarm showers.",
    followUp: "Oct 25, 2026",
    status: "Issued",
    accent: "sky",
    medicines: [
      {
        name: "Cetirizine 10mg",
        dose: "1 tablet",
        frequency: "At night",
        duration: "7 days",
      },
      {
        name: "Hydrocortisone cream 1%",
        dose: "Thin layer",
        frequency: "Twice daily on affected area",
        duration: "7 days",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Laboratory                                                         */
/* ------------------------------------------------------------------ */

export type LabStatus = "Ordered" | "Sample collected" | "Processing" | "Ready" | "Approved";

export type LabOrder = {
  id: string;
  patient: string;
  patientId: string;
  test: string;
  category: string;
  doctor: string;
  ordered: string;
  price: number;
  status: LabStatus;
  accent: Accent;
};

export const labOrders: LabOrder[] = [
  {
    id: "LAB-7041",
    patient: "Tanvir Ahmed",
    patientId: "PT-1043",
    test: "HbA1c",
    category: "Biochemistry",
    doctor: "Dr. Imran Hossain",
    ordered: "Oct 19, 2026",
    price: 1200,
    status: "Approved",
    accent: "rose",
  },
  {
    id: "LAB-7042",
    patient: "Ayesha Rahman",
    patientId: "PT-1042",
    test: "Lipid profile",
    category: "Biochemistry",
    doctor: "Dr. Sadia Islam",
    ordered: "Oct 18, 2026",
    price: 1500,
    status: "Ready",
    accent: "teal",
  },
  {
    id: "LAB-7043",
    patient: "Nusrat Jahan",
    patientId: "PT-1044",
    test: "MRI brain (plain)",
    category: "Radiology",
    doctor: "Dr. Farhan Kabir",
    ordered: "Oct 20, 2026",
    price: 6500,
    status: "Processing",
    accent: "violet",
  },
  {
    id: "LAB-7044",
    patient: "Arif Chowdhury",
    patientId: "PT-1049",
    test: "X-Ray left forearm",
    category: "Radiology",
    doctor: "Dr. Farhan Kabir",
    ordered: "Oct 20, 2026",
    price: 900,
    status: "Ordered",
    accent: "orange",
  },
  {
    id: "LAB-7045",
    patient: "Mahmud Hasan",
    patientId: "PT-1047",
    test: "Spirometry",
    category: "Pulmonology",
    doctor: "Dr. Rakib Mahmud",
    ordered: "Oct 16, 2026",
    price: 1800,
    status: "Approved",
    accent: "emerald",
  },
  {
    id: "LAB-7046",
    patient: "Farzana Akter",
    patientId: "PT-1048",
    test: "Serum creatinine",
    category: "Biochemistry",
    doctor: "Dr. Nadia Chowdhury",
    ordered: "Oct 15, 2026",
    price: 700,
    status: "Approved",
    accent: "amber",
  },
  {
    id: "LAB-7047",
    patient: "Rafiq Uddin",
    patientId: "PT-1045",
    test: "Complete blood count",
    category: "Hematology",
    doctor: "Dr. Nadia Chowdhury",
    ordered: "Oct 20, 2026",
    price: 600,
    status: "Sample collected",
    accent: "sky",
  },
];

export const labCatalog = [
  { name: "Complete blood count", category: "Hematology", price: 600, tat: "4 hrs" },
  { name: "HbA1c", category: "Biochemistry", price: 1200, tat: "6 hrs" },
  { name: "Lipid profile", category: "Biochemistry", price: 1500, tat: "6 hrs" },
  { name: "Serum creatinine", category: "Biochemistry", price: 700, tat: "4 hrs" },
  { name: "X-Ray", category: "Radiology", price: 900, tat: "1 hr" },
  { name: "MRI brain", category: "Radiology", price: 6500, tat: "24 hrs" },
];

/* ------------------------------------------------------------------ */
/*  Pharmacy                                                           */
/* ------------------------------------------------------------------ */

export type MedicineStatus = "In stock" | "Low stock" | "Out of stock";

export type Medicine = {
  id: string;
  name: string;
  category: string;
  batch: string;
  expiry: string;
  stock: number;
  reorder: number;
  price: number;
  supplier: string;
  status: MedicineStatus;
};

export const medicines: Medicine[] = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Analgesic",
    batch: "PC-1150",
    expiry: "Feb 2028",
    stock: 1250,
    reorder: 200,
    price: 2,
    supplier: "Square Pharma",
    status: "In stock",
  },
  {
    id: "MED-002",
    name: "Amlodipine 5mg",
    category: "Cardiovascular",
    batch: "AM-2241",
    expiry: "Nov 2027",
    stock: 420,
    reorder: 100,
    price: 4.5,
    supplier: "Beximco",
    status: "In stock",
  },
  {
    id: "MED-003",
    name: "Metformin 850mg",
    category: "Antidiabetic",
    batch: "MF-1180",
    expiry: "Mar 2028",
    stock: 260,
    reorder: 80,
    price: 6,
    supplier: "Square Pharma",
    status: "In stock",
  },
  {
    id: "MED-004",
    name: "Atorvastatin 10mg",
    category: "Cardiovascular",
    batch: "AT-5512",
    expiry: "Jan 2027",
    stock: 340,
    reorder: 100,
    price: 8,
    supplier: "Incepta",
    status: "In stock",
  },
  {
    id: "MED-005",
    name: "Omeprazole 20mg",
    category: "Gastro",
    batch: "OM-7710",
    expiry: "Aug 2027",
    stock: 88,
    reorder: 120,
    price: 5,
    supplier: "Renata",
    status: "Low stock",
  },
  {
    id: "MED-006",
    name: "Salbutamol inhaler",
    category: "Respiratory",
    batch: "SB-4402",
    expiry: "Dec 2026",
    stock: 56,
    reorder: 60,
    price: 320,
    supplier: "ACI",
    status: "Low stock",
  },
  {
    id: "MED-007",
    name: "Ceftriaxone 1g injection",
    category: "Antibiotic",
    batch: "CF-9012",
    expiry: "Jun 2027",
    stock: 0,
    reorder: 50,
    price: 145,
    supplier: "Incepta",
    status: "Out of stock",
  },
  {
    id: "MED-008",
    name: "Insulin glargine 100IU",
    category: "Antidiabetic",
    batch: "IN-2201",
    expiry: "Apr 2027",
    stock: 74,
    reorder: 40,
    price: 680,
    supplier: "Sanofi",
    status: "In stock",
  },
  {
    id: "MED-009",
    name: "Azithromycin 500mg",
    category: "Antibiotic",
    batch: "AZ-3312",
    expiry: "Jul 2027",
    stock: 24,
    reorder: 60,
    price: 32,
    supplier: "Incepta",
    status: "Low stock",
  },
];

export const pharmacySales = [
  { id: "SAL-9012", patient: "Ayesha Rahman", items: 2, amount: 1480, method: "Cash", time: "10:58 AM", accent: "teal" as Accent },
  { id: "SAL-9011", patient: "Tanvir Ahmed", items: 3, amount: 3260, method: "Card", time: "09:42 AM", accent: "rose" as Accent },
  { id: "SAL-9010", patient: "Sadia Noor", items: 1, amount: 420, method: "Cash", time: "09:10 AM", accent: "sky" as Accent },
  { id: "SAL-9009", patient: "Mahmud Hasan", items: 2, amount: 980, method: "Insurance", time: "08:35 AM", accent: "emerald" as Accent },
];

export const pharmacyPurchases = [
  { id: "PO-4412", supplier: "Square Pharma", items: 12, amount: 84500, date: "Oct 19, 2026", status: "Received" as const },
  { id: "PO-4411", supplier: "Incepta", items: 8, amount: 62300, date: "Oct 17, 2026", status: "Received" as const },
  { id: "PO-4410", supplier: "Beximco", items: 6, amount: 41800, date: "Oct 20, 2026", status: "Pending" as const },
  { id: "PO-4409", supplier: "ACI", items: 4, amount: 28400, date: "Oct 15, 2026", status: "Received" as const },
];

/* ------------------------------------------------------------------ */
/*  Staff & roles                                                      */
/* ------------------------------------------------------------------ */

export type Role =
  | "Super Admin"
  | "Doctor"
  | "Receptionist"
  | "Lab Technician"
  | "Pharmacist"
  | "Accountant"
  | "Patient";

export type StaffMember = {
  id: string;
  name: string;
  role: Role;
  email: string;
  department: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  accent: Accent;
};

export const staff: StaffMember[] = [
  {
    id: "USR-01",
    name: "Dr. Solaiman Rahman",
    role: "Super Admin",
    email: "admin@medicare.com",
    department: "Administration",
    status: "Active",
    lastActive: "Online now",
    accent: "teal",
  },
  {
    id: "USR-02",
    name: "Dr. Sadia Islam",
    role: "Doctor",
    email: "sadia.islam@medicare.com",
    department: "Cardiology",
    status: "Active",
    lastActive: "5 min ago",
    accent: "sky",
  },
  {
    id: "USR-03",
    name: "Nusrat Karim",
    role: "Receptionist",
    email: "nusrat.karim@medicare.com",
    department: "Front desk",
    status: "Active",
    lastActive: "2 min ago",
    accent: "violet",
  },
  {
    id: "USR-04",
    name: "Rakib Hasan",
    role: "Lab Technician",
    email: "rakib.hasan@medicare.com",
    department: "Laboratory",
    status: "Active",
    lastActive: "18 min ago",
    accent: "amber",
  },
  {
    id: "USR-05",
    name: "Farhana Akter",
    role: "Pharmacist",
    email: "farhana.akter@medicare.com",
    department: "Pharmacy",
    status: "Active",
    lastActive: "1 hr ago",
    accent: "emerald",
  },
  {
    id: "USR-06",
    name: "Imran Chowdhury",
    role: "Accountant",
    email: "imran.chowdhury@medicare.com",
    department: "Finance",
    status: "Invited",
    lastActive: "Never",
    accent: "orange",
  },
  {
    id: "USR-07",
    name: "Dr. Nadia Chowdhury",
    role: "Doctor",
    email: "nadia.chowdhury@medicare.com",
    department: "Orthopedics",
    status: "Suspended",
    lastActive: "3 days ago",
    accent: "rose",
  },
];

export const rolePermissions: {
  module: string;
  permissions: Record<string, boolean>;
}[] = [
  { module: "Patient records", permissions: { "Super Admin": true, Doctor: true, Receptionist: true, "Lab Technician": false, Pharmacist: false, Accountant: false, Patient: false } },
  { module: "Appointments", permissions: { "Super Admin": true, Doctor: true, Receptionist: true, "Lab Technician": false, Pharmacist: false, Accountant: false, Patient: true } },
  { module: "Prescriptions", permissions: { "Super Admin": true, Doctor: true, Receptionist: false, "Lab Technician": false, Pharmacist: true, Accountant: false, Patient: true } },
  { module: "Lab reports", permissions: { "Super Admin": true, Doctor: true, Receptionist: false, "Lab Technician": true, Pharmacist: false, Accountant: false, Patient: true } },
  { module: "Pharmacy stock", permissions: { "Super Admin": true, Doctor: false, Receptionist: false, "Lab Technician": false, Pharmacist: true, Accountant: false, Patient: false } },
  { module: "Billing & payments", permissions: { "Super Admin": true, Doctor: false, Receptionist: true, "Lab Technician": false, Pharmacist: true, Accountant: true, Patient: true } },
  { module: "Reports", permissions: { "Super Admin": true, Doctor: false, Receptionist: false, "Lab Technician": false, Pharmacist: false, Accountant: true, Patient: false } },
  { module: "Users & permissions", permissions: { "Super Admin": true, Doctor: false, Receptionist: false, "Lab Technician": false, Pharmacist: false, Accountant: false, Patient: false } },
];

/* ------------------------------------------------------------------ */
/*  Admin reports                                                      */
/* ------------------------------------------------------------------ */

export const financeTrend = [
  { month: "May", income: 820000, expense: 548000 },
  { month: "Jun", income: 905000, expense: 596000 },
  { month: "Jul", income: 872000, expense: 574000 },
  { month: "Aug", income: 1045000, expense: 632000 },
  { month: "Sep", income: 1152000, expense: 688000 },
  { month: "Oct", income: 1284500, expense: 742000 },
];

export const departmentRevenue = [
  { department: "Cardiology", revenue: 428000, appointments: 386, share: 33 },
  { department: "Orthopedics", revenue: 386000, appointments: 312, share: 30 },
  { department: "Neurology", revenue: 214000, appointments: 248, share: 17 },
  { department: "Dermatology", revenue: 96000, appointments: 184, share: 7 },
  { department: "Pulmonology", revenue: 84000, appointments: 142, share: 7 },
  { department: "Others", revenue: 76500, appointments: 128, share: 6 },
];

export const doctorPerformance = [
  { name: "Dr. Sadia Islam", department: "Cardiology", appointments: 186, revenue: 428000, rating: 4.9, accent: "teal" as Accent },
  { name: "Dr. Nadia Chowdhury", department: "Orthopedics", appointments: 142, revenue: 386000, rating: 4.9, accent: "amber" as Accent },
  { name: "Dr. Farhan Kabir", department: "Neurology", appointments: 128, revenue: 214000, rating: 4.7, accent: "sky" as Accent },
  { name: "Dr. Imran Hossain", department: "Endocrinology", appointments: 96, revenue: 152000, rating: 4.8, accent: "violet" as Accent },
  { name: "Dr. Sabrina Karim", department: "Dermatology", appointments: 84, revenue: 96000, rating: 4.8, accent: "rose" as Accent },
];

/* ------------------------------------------------------------------ */
/*  Queue & tokens                                                     */
/* ------------------------------------------------------------------ */

export type QueueToken = {
  token: string;
  patient: string;
  doctor: string;
  department: string;
  status: "Waiting" | "In consultation" | "Done";
  wait: string;
  accent: Accent;
};

export const queueTokens: QueueToken[] = [
  { token: "T-18", patient: "Nusrat Jahan", doctor: "Dr. Farhan Kabir", department: "Neurology", status: "In consultation", wait: "2 min", accent: "violet" },
  { token: "T-19", patient: "Rafiq Uddin", doctor: "Dr. Nadia Chowdhury", department: "Orthopedics", status: "Waiting", wait: "6 min", accent: "amber" },
  { token: "T-20", patient: "Ayesha Rahman", doctor: "Dr. Sadia Islam", department: "Cardiology", status: "Waiting", wait: "11 min", accent: "teal" },
  { token: "T-21", patient: "Arif Chowdhury", doctor: "Dr. Farhan Kabir", department: "Emergency", status: "Waiting", wait: "14 min", accent: "rose" },
  { token: "T-17", patient: "Sadia Noor", doctor: "Dr. Sabrina Karim", department: "Dermatology", status: "Done", wait: "—", accent: "sky" },
];
