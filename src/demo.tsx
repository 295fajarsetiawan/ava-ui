import React, { useState, type ReactNode, useCallback, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  AreaChart,
  AppLayout,
  BarChart,
  Button,
  Card,
  CategoryCard,
  Carousel,
  Chip,
  BottomNavigation,
  Checkbox,
  CheckboxGroup,
  DataGrid,
  DatePicker,
  ChartTooltip,
  FileTree,
  FormBuilder,
  Header,
  HeroSlider,
  HoverCard,
  ImageHeroCard,
  Input,
  InputEmail,
  InputNumber,
  InputPassword,
  LineChart,
  MultiSelect,
  Navbar,
  PieChart,
  RadarChart,
  RadialChart,
  RadioGroup,
  Select,
  SectionHeading,
  Sidebar,
  Switch,
  TextArea,
  UploadArea,
  ThemeRoot
  ,
  Modal,
  ToastProvider,
  useToast,
  Alert
  ,
  ConfirmModal
} from "./index";
import type {
  DataGridAction,
  DataGridColumn,
  DataGridFilter,
  FileTreeNode,
  BottomNavigationItem,
  SidebarItem,
  HeaderAction,
  HeaderNavItem,
  HeaderProfileMenuItem,
  SlideData,
  HoverCardStat,
  ImageHeroCardMeta,
  FormFieldConfig,
  SelectOption
} from "./index";
import "./demo.css";

// ============ CONSTANTS & DATA ============
const SALES_DATA = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 31 },
  { label: "Apr", value: 48 },
  { label: "Mei", value: 44 },
  { label: "Jun", value: 62 }
];

const SEGMENT_DATA = [
  { label: "Web", value: 42, color: "#2563eb" },
  { label: "Mobile", value: 28, color: "#16a34a" },
  { label: "Store", value: 18, color: "#f59e0b" },
  { label: "Partner", value: 12, color: "#7c3aed" }
];

const RADAR_DATA = [
  { label: "UI", value: 86 },
  { label: "UX", value: 74 },
  { label: "Speed", value: 68 },
  { label: "A11y", value: 80 },
  { label: "Docs", value: 58 }
];

interface Payment {
  id: string;
  customer: string;
  email: string;
  transactionId: string;
  amount: number;
  status: "succeeded" | "failed" | "processing" | "refunded";
}

const PAYMENT_DATA: Payment[] = [
  { id: "pay_001", customer: "Emma Wilson", email: "emma@example.com", transactionId: "pay_1N3xDR", amount: 2450, status: "succeeded" },
  { id: "pay_002", customer: "Isabella Nguyen", email: "isabella@example.com", transactionId: "pay_1N3x9M", amount: 299, status: "succeeded" },
  { id: "pay_003", customer: "Jackson Lee", email: "jackson@example.com", transactionId: "pay_1N3x8L", amount: 39, status: "processing" },
  { id: "pay_004", customer: "Liam Johnson", email: "liam@example.com", transactionId: "pay_1N3xCQ", amount: 150, status: "refunded" },
  { id: "pay_005", customer: "Olivia Martin", email: "olivia@example.com", transactionId: "pay_1N3x7K", amount: 1999, status: "succeeded" },
  { id: "pay_006", customer: "Sofia Davis", email: "sofia@example.com", transactionId: "pay_1N3xBP", amount: 450, status: "succeeded" },
  { id: "pay_007", customer: "William Kim", email: "will@example.com", transactionId: "pay_1N3xAN", amount: 99, status: "failed" }
];

const FORM_OPTIONS: SelectOption[] = [
  { label: "Design System", value: "design", description: "Reusable UI standards" },
  { label: "Dashboard", value: "dashboard", description: "Admin and analytics pages" },
  { label: "Mobile App", value: "mobile", description: "Touch friendly flows" },
  { label: "Marketing Site", value: "marketing", description: "Landing page experience" }
];

interface FormValues extends Record<string, unknown> {
  fullName: string;
  email: string;
  bio: string;
  password: string;
  age: number | null;
  otp: string;
  agreeToTerms: boolean;
  notificationsEnabled: boolean;
  preferredContact: string;
  experienceLevel: number;
  satisfaction: number;
  favoriteColor: string;
  birthDate: string;
  availableTime: string;
  vacationRange: { start?: string; end?: string };
  country: string;
  assignee: string;
  skills: string[];
  meetingAt: string;
  attachments: File[];
}

const contactOptions: SelectOption[] = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "WhatsApp", value: "whatsapp" }
];

const countryOptions: SelectOption[] = [
  { label: "Indonesia", value: "id" },
  { label: "Singapore", value: "sg" },
  { label: "Malaysia", value: "my" },
  { label: "Japan", value: "jp" }
];

const assigneeOptions: SelectOption[] = [
  { label: "Ava Wilson", value: "ava", description: "Product Designer" },
  { label: "Noah Kim", value: "noah", description: "Frontend Engineer" },
  { label: "Maya Putri", value: "maya", description: "Project Manager" },
  { label: "Rafi Ahmad", value: "rafi", description: "QA Engineer" }
];

const skillOptions: SelectOption[] = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "Design System", value: "design-system" },
  { label: "Accessibility", value: "accessibility" },
  { label: "API Integration", value: "api" }
];

const searchOptions = (source: SelectOption[]) => async (query: string) => {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  return source.filter((option) => `${option.label} ${option.description ?? ""}`.toLowerCase().includes(query.toLowerCase()));
};

const searchAssignees = searchOptions(assigneeOptions);
const searchSkills = searchOptions(skillOptions);

const formBuilderFields: FormFieldConfig<FormValues>[] = [
  {
    kind: "text",
    name: "fullName",
    label: "Full name",
    row: "identity",
    props: {
      placeholder: "Nama lengkap",
      required: true,
      inputClassName: "demo-rounded-large"
    }
  },
  {
    kind: "text",
    name: "email",
    label: "Email",
    row: "identity",
    props: {
      type: "email",
      placeholder: "nama@domain.com",
      required: true
    }
  },
  {
    kind: "textarea",
    name: "bio",
    label: "Bio",
    props: {
      placeholder: "Ceritakan singkat tentang profile kamu",
      hint: "Contoh textarea dengan styling default yang bisa dioverride.",
      required: true
    }
  },
  {
    kind: "text",
    name: "password",
    label: "Password",
    row: "security",
    props: {
      type: "password",
      allowPasswordToggle: true,
      placeholder: "Masukkan password",
      required: true
    }
  },
  {
    kind: "text",
    name: "age",
    label: "Age",
    row: "security",
    props: {
      type: "number",
      placeholder: "17",
      required: true
    }
  },
  {
    kind: "otp",
    name: "otp",
    label: "OTP code",
    props: {
      hint: "Input OTP 6 digit.",
      required: true,
      inputClassName: "demo-otp-soft"
    }
  },
  {
    kind: "checkbox",
    name: "agreeToTerms",
    label: "Saya menyetujui syarat dan kebijakan",
    props: {
      description: "Contoh checkbox yang langsung terhubung ke boolean field."
    }
  },
  {
    kind: "switch",
    name: "notificationsEnabled",
    label: "Aktifkan notifikasi",
    props: {
      description: "Contoh toggle switch boolean."
    }
  },
  {
    kind: "radio",
    name: "preferredContact",
    label: "Preferred contact",
    options: contactOptions,
    props: {
      hint: "Contoh radio button group.",
      required: true
    }
  },
  {
    kind: "range",
    name: "experienceLevel",
    label: "Experience level",
    row: "feedback",
    props: {
      min: 0,
      max: 100,
      step: 5,
      hint: "Range slider 0 sampai 100.",
      required: true
    }
  },
  {
    kind: "rating",
    name: "satisfaction",
    label: "Satisfaction rating",
    row: "feedback",
    props: {
      hint: "Contoh rating 1 sampai 5.",
      required: true
    }
  },
  {
    kind: "color",
    name: "favoriteColor",
    label: "Favorite color",
    row: "schedule-a",
    props: {
      hint: "Contoh color picker.",
      required: true
    }
  },
  {
    kind: "date",
    name: "birthDate",
    label: "Birth date",
    row: "schedule-a",
    props: {
      hint: "Contoh date picker.",
      required: true
    }
  },
  {
    kind: "time",
    name: "availableTime",
    label: "Available time",
    row: "schedule-b",
    props: {
      hint: "Contoh time picker.",
      required: true
    }
  },
  {
    kind: "date-range",
    name: "vacationRange",
    label: "Vacation range",
    row: "schedule-b",
    props: {
      hint: "Contoh date range picker sederhana.",
      required: true
    }
  },
  {
    kind: "select",
    name: "country",
    label: "Country",
    row: "select-a",
    options: countryOptions,
    props: {
      placeholder: "Pilih negara",
      searchable: true,
      hint: "Single select dengan autocomplete lokal.",
      required: true
    }
  },
  {
    kind: "select",
    name: "assignee",
    label: "Assignee",
    row: "select-a",
    loadOptions: searchAssignees,
    props: {
      placeholder: "Cari assignee",
      searchPlaceholder: "Type untuk search server...",
      searchable: true,
      hint: "Contoh server-side search via route handler.",
      required: true
    }
  },
  {
    kind: "select",
    name: "skills",
    label: "Skills",
    loadOptions: searchSkills,
    props: {
      placeholder: "Pilih skill",
      searchPlaceholder: "Cari skill...",
      searchable: true,
      multiple: true,
      hint: "Multiple select dengan async query lokal.",
      required: true
    }
  },
  {
    kind: "datetime",
    name: "meetingAt",
    label: "Meeting time",
    row: "final",
    props: {
      hint: "Memakai input datetime-local.",
      required: true
    }
  },
  {
    kind: "file",
    name: "attachments",
    label: "Attachments",
    row: "final",
    props: {
      hint: "Support single atau multiple file upload.",
      accept: ".pdf,.png,.jpg,.jpeg",
      multiple: true,
      required: true
    }
  }
];

const formBuilderDefaultValues: Partial<FormValues> = {
  agreeToTerms: true,
  availableTime: "09:00",
  country: "id",
  experienceLevel: 45,
  favoriteColor: "#2563eb",
  notificationsEnabled: true,
  preferredContact: "email",
  satisfaction: 4,
  skills: ["react", "typescript"]
};

// ============ UTILITY FUNCTIONS ============
const svgDataUri = (svg: string): string => 
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const createProductImage = (view: string, accent = "#a3a3a3"): string => svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
    <rect width="900" height="650" fill="#f4f4f5"/>
    <ellipse cx="450" cy="505" rx="285" ry="35" fill="#d4d4d8" opacity=".65"/>
    <g transform="translate(140 210)">
      <path d="M92 206c72-52 135-86 219-86h143c54 0 111 41 147 103l59 101c-139 38-328 47-546 25-62-6-88-85-22-143Z" fill="${accent}"/>
      <path d="M104 254c151 31 331 34 550 10l38 67c-147 54-407 61-623 28-46-7-56-77 35-105Z" fill="#e5e7eb"/>
      <path d="M227 129c12-58 58-88 126-91 46-2 82 11 108 39l-62 81c-59-29-116-38-172-29Z" fill="#c7c9cc"/>
      <path d="M389 128c61-65 142-79 244-43 14 47 2 100-38 159-65-52-135-91-206-116Z" fill="#b6b8bb"/>
      <path d="M220 181c118 35 238 44 361 27" fill="none" stroke="#6b7280" stroke-width="14" stroke-linecap="round"/>
      <path d="M257 154l-34 60M316 145l-37 77M375 145l-44 89M438 154l-49 94" fill="none" stroke="#52525b" stroke-width="10" stroke-linecap="round"/>
      <path d="M360 260c73 11 150 7 230-12" fill="none" stroke="#ffffff" stroke-width="24" stroke-linecap="round" opacity=".72"/>
      <text x="315" y="420" fill="#71717a" font-family="Arial, sans-serif" font-size="34" font-weight="700">${view}</text>
    </g>
  </svg>
`);

const createVenueImage = (): string => svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 780">
    <defs>
      <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f7c38a"/>
        <stop offset=".48" stop-color="#8d6148"/>
        <stop offset="1" stop-color="#171717"/>
      </linearGradient>
      <radialGradient id="glow" cx=".65" cy=".02" r=".52">
        <stop offset="0" stop-color="#ffe0b5" stop-opacity=".85"/>
        <stop offset=".42" stop-color="#b56f43" stop-opacity=".45"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
    </defs>
    <rect width="1800" height="780" fill="#151311"/>
    <rect width="1800" height="780" fill="url(#sun)" opacity=".45"/>
    <rect width="1800" height="780" fill="url(#glow)"/>
    <g opacity=".32" filter="url(#blur)">
      <circle cx="170" cy="260" r="180" fill="#54614c"/>
      <circle cx="1510" cy="245" r="260" fill="#7b6045"/>
      <circle cx="1120" cy="70" r="260" fill="#e6b589"/>
    </g>
    <g transform="translate(400 0)" opacity=".55">
      <path d="M290 0c-18 146-21 283-8 411 20 203 99 304 237 304 126 0 204-90 235-270 20-120 18-267-8-445Z" fill="#14110f"/>
      <path d="M820 0c-44 142-56 278-35 410 33 207 125 310 276 310 141 0 222-94 243-282 13-119 1-265-36-438Z" fill="#1b1613"/>
    </g>
    <g transform="translate(775 180)">
      <ellipse cx="320" cy="355" rx="275" ry="92" fill="#050505" opacity=".42"/>
      <g fill="none" stroke-linecap="round" stroke-width="13" opacity=".72">
        <path d="M85 355c66-83 141-133 226-151" stroke="#1d2b22"/>
        <path d="M503 333c-81-74-155-113-221-118" stroke="#243325"/>
        <path d="M141 410c65-79 145-137 241-175" stroke="#233529"/>
        <path d="M516 423c-89-103-173-161-253-174" stroke="#18231c"/>
      </g>
      <g fill="#263628" opacity=".9">
        <path d="M50 383c59-23 109-13 148 28-61 24-111 15-148-28Z"/>
        <path d="M80 318c61-10 106 12 135 66-63 11-109-12-135-66Z"/>
        <path d="M526 355c-61-18-109-4-143 43 63 18 110 3 143-43Z"/>
        <path d="M498 279c-62-7-105 18-130 74 64 7 107-18 130-74Z"/>
      </g>
      <g>
        <circle cx="286" cy="240" r="78" fill="#f2d9b5"/>
        <circle cx="359" cy="275" r="76" fill="#d89a7b"/>
        <circle cx="214" cy="319" r="74" fill="#f8ead6"/>
        <circle cx="423" cy="355" r="68" fill="#e9c3a2"/>
        <circle cx="316" cy="372" r="88" fill="#7c2f2f"/>
        <circle cx="322" cy="255" r="56" fill="#f9f4df"/>
        <path d="M215 277c52 31 73 76 62 135-55-32-76-77-62-135Z" fill="#fff8e8"/>
        <path d="M398 230c-59 8-96 42-111 102 62-8 99-42 111-102Z" fill="#f6efe0"/>
      </g>
    </g>
    <rect width="1800" height="780" fill="#000" opacity=".18"/>
  </svg>
`);

// ============ ICON COMPONENTS ============
const Icon = ({ children, viewBox = "0 0 24 24", ...props }: { children: ReactNode; viewBox?: string; [key: string]: any }) => (
  <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    {children}
  </svg>
);

const ModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Contoh Modal">
        <p>Ini isi modal singkat untuk demo.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <Button variant="secondary" onClick={() => setOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </div>
  );
};

const ToastDemoInner: React.FC = () => {
  const { showToast } = useToast();
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button onClick={() => showToast({ message: "Info: aksi berhasil", variant: "info" })}>Info</Button>
      <Button onClick={() => showToast({ message: "Sukses: data tersimpan", variant: "success" })}>Success</Button>
      <Button onClick={() => showToast({ message: "Error: terjadi kesalahan", variant: "error" })}>Error</Button>
    </div>
  );
};

const ToastDemo: React.FC = () => (
  <ToastProvider>
    <ToastDemoInner />
  </ToastProvider>
);

const AlertDemo: React.FC = () => (
  <div style={{ display: "grid", gap: "0.5rem" }}>
    <Alert variant="info" title="Info">Ini pesan info.</Alert>
    <Alert variant="success" title="Sukses">Operasi berhasil diselesaikan.</Alert>
    <Alert variant="warning" title="Peringatan" dismissible>Periksa konfigurasi Anda.</Alert>
    <Alert variant="error" title="Error" dismissible>Terjadi kesalahan. Coba lagi.</Alert>
  </div>
);

const ConfirmDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gap: "0.6rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button onClick={() => setOpen(true)}>Open Confirm (Yes/No)</Button>
        <Button onClick={() => setOpen(true)}>Open Custom Actions</Button>
      </div>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Konfirmasi"
        message="Apakah Anda yakin ingin melanjutkan aksi ini?"
        actions={[
          { label: "Tidak", onClick: () => { setResult("no"); setOpen(false); }, variant: "secondary" },
          { label: "Ya, Lanjutkan", onClick: () => { setResult("yes"); setOpen(false); }, variant: "primary" }
        ]}
      />
      {result ? <div>Hasil: {result}</div> : null}
    </div>
  );
};

const StarIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 2.95 6.1 6.72.94-4.86 4.73 1.18 6.69L12 17.3l-5.99 3.16 1.18-6.69-4.86-4.73 6.72-.94L12 2Z" />
  </Icon>
);

const LocationIcon = () => (
  <Icon>
    <path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Icon>
);

const BagIcon = () => (
  <Icon>
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
    <path d="M9 11h6" />
  </Icon>
);

// Navigation Icons
const CallIcon = () => (
  <Icon>
    <path d="M8.5 4.5c-.8-.9-2.2-.9-3 0l-1 1c-1 1-1.2 2.5-.4 3.7a32 32 0 0 0 10.7 10.7c1.2.8 2.7.6 3.7-.4l1-1c.9-.8.9-2.2 0-3l-1.9-1.9c-.7-.7-1.8-.8-2.6-.2l-1.2.8a16 16 0 0 1-4.8-4.8l.8-1.2c.6-.8.5-1.9-.2-2.6L8.5 4.5Z" />
  </Icon>
);

const ChatIcon = () => (
  <Icon>
    <path d="M20 13a6 6 0 0 1-6 6H9l-5 3 1.5-4.5A6 6 0 0 1 4 13V8a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6Z" />
    <path d="M8 10h8M8 13h5" strokeLinecap="round" />
  </Icon>
);

const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" />
  </Icon>
);

const SettingsIcon = () => (
  <Icon>
    <path d="M10.2 4.3a2 2 0 0 1 3.6 0l.4 1.2a2 2 0 0 0 1.4 1.3l1.2.3a2 2 0 0 1 1.1 3.4l-.9.9a2 2 0 0 0-.5 1.9l.3 1.2a2 2 0 0 1-2.7 2.4l-1.2-.5a2 2 0 0 0-1.8 0l-1.2.5a2 2 0 0 1-2.7-2.4l.3-1.2a2 2 0 0 0-.5-1.9l-.9-.9a2 2 0 0 1 1.1-3.4l1.2-.3a2 2 0 0 0 1.4-1.3Z" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
);

const PlusIcon = () => (
  <Icon>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeWidth="2.2" />
  </Icon>
);

// Sidebar Icons
const DashboardIcon = () => (
  <Icon>
    <path d="M4 11h7V4H4v7Zm9 9h7v-5h-7v5ZM13 4v7h7V4h-7ZM4 20h7v-5H4v5Z" />
  </Icon>
);

const AnalyticsIcon = () => (
  <Icon>
    <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" strokeLinecap="round" />
  </Icon>
);

const TrackerIcon = () => (
  <Icon>
    <path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10" strokeLinecap="round" />
    <path d="m2.5 6.5 1 1 2-2M2.5 12.5l1 1 2-2M2.5 18.5l1 1 2-2" strokeLinecap="round" />
  </Icon>
);

const HelpIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.1c-.9.4-1.7 1.1-1.7 2.4v.5" strokeLinecap="round" />
    <path d="M12 17.2h.01" strokeLinecap="round" />
  </Icon>
);

const LogoutIcon = () => (
  <Icon>
    <path d="M10 17l-5-5 5-5" />
    <path d="M5 12h11" strokeLinecap="round" />
    <path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
  </Icon>
);

// Data Grid Icons
const CopyIcon = () => (
  <Icon>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

const ViewIcon = () => (
  <Icon>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const EditIcon = () => (
  <Icon>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);

const DeleteIcon = () => (
  <Icon>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </Icon>
);

// ============ PRODUCT DATA ============
const productSlides = [
  { id: "front", imageSrc: createProductImage("Front view"), imageAlt: "Gray running shoe front view" },
  { id: "side", imageSrc: createProductImage("Side view", "#b8b8bd"), imageAlt: "Gray running shoe side view" },
  { id: "angle", imageSrc: createProductImage("Angle view", "#9ca3af"), imageAlt: "Gray running shoe angle view" },
  { id: "sole", imageSrc: createProductImage("Sole view", "#d1d5db"), imageAlt: "Gray running shoe sole view" },
  { id: "top", imageSrc: createProductImage("Top view", "#a1a1aa"), imageAlt: "Gray running shoe top view" },
  { id: "detail", imageSrc: createProductImage("Detail", "#bfc2c7"), imageAlt: "Gray running shoe detail view" }
];

const venueImage = createVenueImage();
const venueMeta: ImageHeroCardMeta[] = [
  { id: "rating", icon: <StarIcon />, label: "4.9 / 5.0 Rating" },
  { id: "location", icon: <LocationIcon />, label: "Jakarta, Indonesia" }
];

const heroSlides: SlideData[] = [
  {
    id: 1,
    image: venueImage,
    badge: "Memorable Shot",
    discountBadge: "Diskon IDR 5JT",
    title: "Abadikan Setiap Momen Abadi",
    subtitle: "Jasa Dokumentasi & Sinematografi Kelas Satu",
    description:
      "Dapatkan potongan langsung IDR 5.000.000 untuk sesi prewedding eksklusif bertemakan alam romantis di pantai Bali.",
    tagline: "Curated by MFWedding",
    ctaText: "Lihat fotografer elite",
    targetPage: "/vendors",
    targetParams: {
      category: "photography",
      city: "bali"
    }
  },
  {
    id: 2,
    image: createVenueImage(),
    badge: "Dream Venue",
    discountBadge: "Paket Hemat",
    title: "Rayakan Cinta di Tempat Terindah",
    subtitle: "Venue Romantis untuk Pernikahan Elegan",
    description:
      "Temukan venue premium dengan dekorasi, catering, dan dokumentasi lengkap dalam satu paket yang mudah dipesan.",
    tagline: "Selected by Ava UI",
    ctaText: "Cari venue terbaik",
    endpoint: "/api/vendors?category=venue"
  },
  {
    id: 3,
    image: createProductImage("Wedding package", "#d6a92b"),
    badge: "Wedding Package",
    title: "Paket Lengkap untuk Hari Bahagia",
    subtitle: "Vendor Terverifikasi dalam Satu Alur Booking",
    description:
      "Bandingkan paket, cek detail vendor, dan lanjutkan booking tanpa pindah halaman.",
    tagline: "Premium vendor collection",
    ctaText: "Lihat paket wedding",
    targetPage: "/packages",
    targetParams: {
      sort: "popular"
    }
  }
];

const headerNavItems: HeaderNavItem[] = [
  { id: "vendor", label: "Cari Vendor", href: "#", active: true },
  { id: "package", label: "Produk & Paket", href: "#" },
  { id: "booking", label: "Form Booking", href: "#" }
];

const headerActions: HeaderAction[] = [
  {
    id: "bag",
    label: "Booking bag",
    icon: <BagIcon />,
    onClick: () => console.log("Open booking bag")
  }
];

const headerProfileMenuItems: HeaderProfileMenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "#" },
  { id: "bookings", label: "My Bookings", href: "#" },
  { id: "settings", label: "Settings", href: "#" }
];

// ============ COMPONENTS ============
const HeaderPreview: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogin = useCallback(() => setIsLoggedIn(true), []);
  const handleRegister = useCallback(() => setIsLoggedIn(true), []);
  const handleLogout = useCallback(() => setIsLoggedIn(false), []);
  const handleSearchSubmit = useCallback((value: string) => console.log("Search", value), []);

  return (
    <div className="demo-header-stage">
      <ThemeRoot
        mode="light"
        backgroundColor="#f8f6f1"
        borderColor="#e8dfd1"
        mutedColor="#8c7a61"
        primaryColor="#d6a92b"
        primaryHoverColor="#c79618"
        radius="8px"
        secondaryColor="#ffffff"
        secondaryHoverColor="#f7f1e7"
        secondaryTextColor="#8c7a61"
        surfaceColor="#f8f6f1"
        surfaceMutedColor="#fffaf3"
        textColor="#4b5563"
      >
        <Header
          actions={headerActions}
          brand={<span>MFWedding</span>}
          brandHref="#"
          isAuthenticated={isLoggedIn}
          navItems={headerNavItems}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
          profile={{
            avatar: "A",
            email: "ava@example.com",
            name: "Ava"
          }}
          profileMenuItems={headerProfileMenuItems}
          search={{
            onChange: setSearch,
            onSubmit: handleSearchSubmit,
            placeholder: "Cari...",
            value: search
          }}
        />
      </ThemeRoot>
      <p className="demo-theme-note">
        Primary color bisa diganti lewat <code>ThemeRoot</code> atau CSS variable <code>--rpc-color-primary</code> di{" "}
        <code>:root</code>.
      </p>
    </div>
  );
};

const BottomNavigationPreview: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>("create");

  const bottomNavItems: BottomNavigationItem[] = useMemo(() => [
    { id: "calls", name: "Calls", icon: <CallIcon /> },
    { id: "messages", name: "Messages", icon: <ChatIcon /> },
    { id: "create", name: "Create", active: true, icon: <PlusIcon /> },
    { id: "profile", name: "Profile", icon: <UserIcon /> },
    { id: "settings", name: "Settings", onClick: () => console.log("Open settings"), icon: <SettingsIcon /> }
  ], []);

  const handleActiveChange = useCallback((nextActiveId: string | null) => {
    setActiveId(nextActiveId);
  }, []);

  return (
    <div className="demo-bottom-nav-stage">
      <BottomNavigation
        activeId={activeId}
        activeColor="#6d28d9"
        background="#202022"
        borderColor="#2e2f34"
        items={bottomNavItems}
        maxWidth="720px"
        mutedColor="#b9bac4"
        onActiveChange={handleActiveChange}
        placement="inline"
        showLabels={false}
        textColor="#f4f4f5"
      />
    </div>
  );
};

const SidebarPreview: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>("dashboard");
  const [openIds, setOpenIds] = useState<string[]>(["analytics"]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = useMemo(() => [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon />, active: true, href: "#" },
    {
      id: "analytics",
      label: "Analytics",
      icon: <AnalyticsIcon />,
      children: [
        { id: "overview", label: "Overview" },
        { id: "reports", label: "Reports" },
        { id: "conversions", label: "Conversions" }
      ]
    },
    { id: "tracker", label: "Tracker", icon: <TrackerIcon />, badge: "New" },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      children: [
        { id: "profile-settings", label: "Profile" },
        { id: "billing-settings", label: "Billing" }
      ]
    }
  ], []);

  const footerItems: SidebarItem[] = useMemo(() => [
    { id: "help", label: "Help & Information", icon: <HelpIcon /> },
    { id: "logout", label: "Log out", icon: <LogoutIcon /> }
  ], []);

  const handleActiveChange = useCallback((nextActiveId: string | null) => {
    setActiveId(nextActiveId);
  }, []);

  const handleOpenChange = useCallback((nextOpenIds: string[]) => {
    setOpenIds(nextOpenIds);
  }, []);

  return (
    <div className="demo-sidebar-shell">
      <ThemeRoot
        mode="dark"
        backgroundColor="#09090b"
        borderColor="#27272a"
        mutedColor="#9ca3af"
        primaryColor="#2563eb"
        primaryHoverColor="#3b82f6"
        secondaryColor="#18181b"
        secondaryHoverColor="#26262a"
        secondaryTextColor="#f4f4f5"
        surfaceColor="#0f0f10"
        surfaceMutedColor="#111114"
        successColor="#22c55e"
        textColor="#f4f4f5"
      >
        <Sidebar
          activeId={activeId}
          activeColor="var(--rpc-color-primary)"
          activeTextColor="var(--rpc-color-on-primary)"
          brand="AvaUI"
          brandIcon="A"
          collapsed={isCollapsed}
          collapseLabel="Sembunyikan sidebar"
          expandLabel="Tampilkan sidebar"
          footerItems={footerItems}
          header={
            <div>
              <strong>Dashboard</strong>
              <p>Main content area. Resize to mobile to see the sheet sidebar.</p>
            </div>
          }
          items={sidebarItems}
          minHeight="560px"
          onActiveChange={handleActiveChange}
          onCollapsedChange={setIsCollapsed}
          onOpenChange={handleOpenChange}
          openIds={openIds}
          surfaceColor="var(--rpc-color-surface)"
          width="340px"
        >
          <div className="demo-sidebar-shell__body">
            <p>Use this area for dashboards, forms, tables, or any content.</p>
            <div className="demo-sidebar-shell__card" />
            <div className="demo-sidebar-shell__card demo-sidebar-shell__card--wide" />
          </div>
        </Sidebar>
      </ThemeRoot>
    </div>
  );
};

const AppLayoutPreview: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>("dashboard");
  const adminItems: SidebarItem[] = useMemo(() => [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    {
      id: "projects",
      label: "Projects",
      icon: <TrackerIcon />,
      defaultOpen: true,
      children: [
        { id: "active-projects", label: "Active" },
        { id: "archived-projects", label: "Archived" }
      ]
    },
    { id: "billing", label: "Billing", icon: <BagIcon /> },
    { id: "reports", label: "Reports", icon: <AnalyticsIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> }
  ], []);

  return (
    <div className="demo-app-layout-stage">
      <ThemeRoot
        mode="dark"
        backgroundColor="#09090b"
        borderColor="#27272a"
        mutedColor="#a1a1aa"
        primaryColor="#2563eb"
        secondaryColor="#18181b"
        surfaceColor="#111114"
        surfaceMutedColor="#18181b"
        textColor="#f4f4f5"
      >
        <AppLayout
          aside={
            <div className="demo-admin-aside">
              <strong>Details panel</strong>
              <p>Panel kanan untuk activity, profile, filter, atau inspector.</p>
              <div />
              <div />
            </div>
          }
          navbar={
            <Navbar maxWidth="full">
              <Navbar.Header>
                <Sidebar.Trigger />
                <Navbar.Spacer />
                <span className="demo-admin-user">Ava</span>
                <AppLayout.AsideTrigger />
              </Navbar.Header>
            </Navbar>
          }
          sidebar={
            <>
              <Sidebar
                activeId={activeId}
                brand="ava-admin"
                brandIcon="A"
                defaultOpenIds={["projects"]}
                items={adminItems}
                minHeight="0"
                onActiveChange={(nextActiveId) => setActiveId(nextActiveId)}
                showCollapseToggle={false}
                variant="navigation"
                width="250px"
              />
              <Sidebar.Mobile>
                <div className="demo-admin-sidebar__mobile-note">Mobile sidebar slot</div>
              </Sidebar.Mobile>
            </>
          }
          sidebarWidth="250px"
          asideWidth="280px"
        >
          <div className="demo-admin-content">
            <div>
              <p className="demo-eyebrow">Admin Layout</p>
              <h3>Dashboard overview</h3>
              <p>Area konten utama tetap scroll sendiri, sementara navbar, sidebar, dan aside punya ruang masing-masing.</p>
            </div>
            <div className="demo-admin-content__grid">
              <div />
              <div />
              <div />
            </div>
          </div>
        </AppLayout>
      </ThemeRoot>
    </div>
  );
};

const HoverCardPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const avaAvatar = useMemo(() => (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="24" fill="#050507" />
      <path d="M18.25 14.5 27 10v18.25l-8.75 4.5V14.5ZM28.75 15.75 37.5 11.25V29.5l-8.75 4.5V15.75Z" fill="white" />
    </svg>
  ), []);

  const hoverCardStats: HoverCardStat[] = useMemo(() => [
    { value: "4", label: "Following" },
    { value: "97.1K", label: "Followers" }
  ], []);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div className="demo-hover-card-stage">
      <HoverCard
        avatar={avaAvatar}
        description="Building the future of UI for web & mobile. 🚀 (YC S24)"
        handle="@ava_ui"
        id="demo-hover-card-preview"
        isOpen={isOpen}
        stats={hoverCardStats}
        title="Ava UI"
      >
        <p>
          Check out{" "}
          <button
            aria-controls="demo-hover-card-preview"
            aria-expanded={isOpen}
            className="demo-hover-card-trigger"
            onClick={handleToggle}
            type="button"
          >
            @ava_ui
          </button>{" "}
          for beautiful React components.
        </p>
      </HoverCard>
    </div>
  );
};

const SectionHeadingPreview: React.FC = () => (
  <div className="demo-section-heading-stage">
    <SectionHeading
      align="center"
      eyebrow="Kategori Layanan"
      title="Butuh Kebutuhan Megesankan Apa?"
      description="Pilihlah klasifikasi layanan terbaik untuk melengkapi hari suci pernikahan Anda."
      eyebrowProps={{
        color: "#d6a92b",
        fontSize: "0.78rem",
        letterSpacing: "0.38em"
      }}
      titleProps={{
        color: "#3f3f46",
        fontSize: "clamp(2rem, 4vw, 3.2rem)"
      }}
      descriptionProps={{
        color: "#9ca3af",
        fontSize: "1.12rem"
      }}
    />
    <div className="demo-section-heading-stage__variants">
      <SectionHeading
        align="left"
        lines={[
          {
            as: "span",
            color: "#2563eb",
            content: "LEFT TITLE",
            fontSize: "0.72rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          },
          {
            as: "h3",
            color: "#f4f4f5",
            content: "Custom per line",
            fontSize: "1.35rem",
            fontWeight: 800
          }
        ]}
      />
      <SectionHeading
        align="right"
        lines={[
          {
            as: "span",
            color: "#f59e0b",
            content: "RIGHT TITLE",
            fontSize: "0.72rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          },
          {
            as: "p",
            color: "#d4d4d8",
            content: "Posisi, warna, ukuran, dan style bisa diganti bebas.",
            fontSize: "0.95rem",
            lineHeight: "1.5"
          }
        ]}
      />
    </div>
  </div>
);

const FormInputsPreview: React.FC = () => {
  const [seatCount, setSeatCount] = useState<number | null>(24);

  return (
    <div className="demo-form-grid">
      <Input
        helperText="Mendukung prefix, suffix, required, dan error state."
        label="Project name"
        name="project"
        placeholder="Component Library"
        prefix="#"
        required
      />
      <InputEmail label="Email" name="email" placeholder="ava@example.com" />
      <InputPassword helperText="Gunakan minimal 8 karakter." label="Password" name="password" placeholder="Masukkan password" />
      <InputNumber
        helperText="Stepper otomatis mengikuti min, max, dan step."
        label="Seats"
        max={100}
        min={0}
        onValueChange={setSeatCount}
        step={1}
        suffix="users"
        value={seatCount ?? ""}
      />
      <TextArea
        className="demo-form-grid__wide"
        label="Description"
        maxLength={180}
        name="description"
        placeholder="Tulis deskripsi singkat..."
        rows={4}
      />
    </div>
  );
};

const FormChoicesPreview: React.FC = () => (
  <div className="demo-form-grid">
    <Checkbox label="Saya setuju dengan terms" description="Single checkbox dengan helper text." />
    <Switch label="Auto publish" description="Aktifkan untuk publish otomatis setelah build sukses." />
    <CheckboxGroup
      helperText="Checkbox group bisa controlled lewat value/onValueChange."
      label="Channels"
      layout="horizontal"
      options={FORM_OPTIONS.slice(0, 3)}
    />
    <RadioGroup
      defaultValue="comfortable"
      label="Layout"
      layout="horizontal"
      options={[
        { label: "Compact", value: "compact" },
        { label: "Comfortable", value: "comfortable" },
        { label: "Spacious", value: "spacious" }
      ]}
    />
  </div>
);

const FormSelectPreview: React.FC = () => (
  <div className="demo-form-grid">
    <Select helperText="Local options, searchable, dan clearable." label="Single select" options={FORM_OPTIONS} placeholder="Pilih project" />
    <MultiSelect
      helperText="Multiple select dengan tag dan clear all."
      label="Multi select"
      options={FORM_OPTIONS}
      placeholder="Pilih beberapa kategori"
    />
    <Select
      endpoint={{ url: "/api/users", dataPath: "data.items", pageSize: 10 }}
      helperText="Contoh remote endpoint. Di app kamu, endpoint ini akan fetch data."
      label="Remote select"
      placeholder="Cari user"
    />
    <MultiSelect
      endpoint={{ url: "/api/users", dataPath: "data.items", pageSize: 10 }}
      helperText="Remote multi select mendukung search API dan Load more."
      label="Remote multi select"
      placeholder="Cari beberapa user"
    />
  </div>
);

const FormDateUploadPreview: React.FC = () => (
  <div className="demo-form-grid">
    <DatePicker
      helperText="Klik field untuk membuka kalender, atau ketik manual YYYY-MM-DD."
      label="Launch date"
      maxDate="2027-12-31"
      minDate="2026-01-01"
      name="launchDate"
    />
    <UploadArea
      accept="image/*,.pdf"
      description="Drop image/PDF atau klik untuk memilih file."
      helperText="Mendukung multiple file, preview image, validasi tipe dan ukuran."
      label="Assets"
      maxFileSize={2 * 1024 * 1024}
      name="assets"
      progress={45}
    />
  </div>
);

const FormBuilderPreview: React.FC = () => {
  const [values, setValues] = useState<Partial<FormValues>>(formBuilderDefaultValues);
  const [submitted, setSubmitted] = useState<Partial<FormValues> | null>(null);

  return (
    <div className="demo-form-builder-stage">
      <FormBuilder<FormValues>
        defaultValues={formBuilderDefaultValues}
        fields={formBuilderFields}
        onSubmit={(nextValues) => setSubmitted(nextValues)}
        onValuesChange={(nextValues) => setValues(nextValues)}
        submitLabel="Save profile"
      />
      <pre className="demo-form-builder-stage__values">
        <code>
          {JSON.stringify(
            submitted ?? {
              ...values,
              attachments: Array.isArray(values.attachments) ? `${values.attachments.length} file(s)` : undefined
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
};

// ============ FILE TREE DATA ============
const fileTreeNodes: FileTreeNode[] = [
  {
    id: "apps",
    label: "apps",
    defaultOpen: true,
    children: [
      {
        id: "frontend",
        label: "frontend",
        defaultOpen: true,
        children: [
          { id: "frontend-package", label: "package.json" },
          { id: "frontend-tsconfig", label: "tsconfig.json" },
          {
            id: "frontend-src",
            label: "src",
            defaultOpen: false,
            children: [
              { id: "frontend-src-app", label: "App.tsx" },
              { id: "frontend-src-main", label: "main.tsx" },
              { id: "frontend-src-styles", label: "styles.css" }
            ]
          }
        ]
      },
      {
        id: "api",
        label: "api",
        defaultOpen: true,
        children: [
          { id: "api-package", label: "package.json" },
          {
            id: "api-src",
            label: "src",
            children: [
              { id: "api-src-index", label: "index.ts" },
              { id: "api-src-routes", label: "routes.ts" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "packages",
    label: "packages",
    defaultOpen: true,
    children: [
      {
        id: "react",
        label: "react",
        defaultOpen: true,
        children: [
          { id: "react-package", label: "package.json" },
          {
            id: "react-src",
            label: "src",
            children: [
              { id: "react-src-index", label: "index.ts" },
              { id: "react-src-file-tree", label: "FileTree.tsx", description: "New component" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "claude",
    label: ".claude",
    defaultOpen: true,
    children: [{ id: "claude-skills", label: "skills" }]
  },
  { id: "readme", label: "README.md" }
];

// ============ DATA GRID CONFIGURATION ============
const paymentColumns: DataGridColumn<Payment>[] = [
  {
    id: "customer",
    header: "Customer",
    accessorKey: "customer",
    isRowHeader: true,
    allowsSorting: true,
    cell: (item) => (
      <div className="demo-payment-customer">
        <strong>{item.customer}</strong>
        <span>{item.email}</span>
      </div>
    ),
    width: "32%"
  },
  {
    id: "transactionId",
    header: "Transaction ID",
    accessorKey: "transactionId"
  },
  {
    id: "status",
    header: "Status",
    cell: (item: Payment) => (
      <Chip
        color={
          item.status === "succeeded"
            ? "success"
            : item.status === "processing"
              ? "warning"
              : item.status === "failed"
                ? "danger"
                : "default"
        }
        size="sm"
        variant="soft"
      >
        {item.status}
      </Chip>
    )
  },
  {
    id: "amount",
    header: ({ sortDirection }) => (
      <span>Amount {sortDirection === "ascending" ? "↑" : sortDirection === "descending" ? "↓" : ""}</span>
    ),
    accessorKey: "amount",
    align: "right",
    allowsSorting: true,
    cell: (item) =>
      new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency"
      }).format(item.amount)
  }
];

const paymentActions: DataGridAction<Payment>[] = [
  {
    id: "copy",
    name: "Copy payment ID",
    icon: <CopyIcon />,
    onClick: (item) => {
      void navigator.clipboard?.writeText(item.transactionId);
    }
  },
  {
    id: "view",
    name: "View details",
    icon: <ViewIcon />,
    onClick: (item) => console.log("View payment", item.id)
  },
  {
    id: "edit",
    name: "Edit payment",
    icon: <EditIcon />,
    onClick: (item) => console.log("Edit payment", item.id)
  },
  {
    id: "delete",
    name: "Delete",
    color: "danger",
    icon: <DeleteIcon />,
    onClick: (item) => console.log("Delete payment", item.id)
  }
];

const paymentFilters: DataGridFilter<Payment>[] = [
  {
    id: "status",
    label: "Status",
    accessorKey: "status",
    options: [
      { id: "succeeded", label: "Succeeded", value: "succeeded" },
      { id: "processing", label: "Processing", value: "processing" },
      { id: "refunded", label: "Refunded", value: "refunded" },
      { id: "failed", label: "Failed", value: "failed" }
    ]
  }
];

// ============ DEMO ITEMS ============
interface DemoItem {
  id: string;
  title: string;
  description: string;
  preview: ReactNode;
  code: string;
  wide?: boolean;
}

interface DemoGroup {
  id: string;
  title: string;
  description: string;
  items: DemoItem[];
}

const demoGroups: DemoGroup[] = [
  {
    id: "foundation",
    title: "Foundation UI",
    description: "Komponen dasar untuk aksi, konten, dan primitive UI.",
    items: [
      {
        id: "button",
        title: "Button",
        description: "Gunakan Button untuk aksi utama, aksi sekunder, atau tombol ringan di dalam interface.",
        preview: (
          <div className="demo-actions">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
        code: `import { Button } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <div>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`
      },
      {
        id: "category-card",
        title: "Category Card",
        description: "Gunakan CategoryCard untuk menampilkan kategori layanan dengan icon, title, dan subtitle.",
        preview: (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <CategoryCard title="Wedding Venue" subtitle="Mulai dari IDR 5.000.000" icon={<LocationIcon />} />
            <CategoryCard title="Photography" subtitle="Fotografer terverifikasi" icon={<StarIcon />} />
            <CategoryCard title="Catering" subtitle="Menu & paket lengkap" icon={<BagIcon />} />
          </div>
        ),
        code: `import { CategoryCard } from "ava-ui";
import { LocationIcon, StarIcon, BagIcon } from "ava-ui/icons"; // contoh import icon
import "ava-ui/styles.css";

export function Example() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
      <CategoryCard title="Wedding Venue" subtitle="Mulai dari IDR 5.000.000" icon={<LocationIcon />} />
      <CategoryCard title="Photography" subtitle="Fotografer terverifikasi" icon={<StarIcon />} />
      <CategoryCard title="Catering" subtitle="Menu & paket lengkap" icon={<BagIcon />} />
    </div>
  );
}`
      },
      {
        id: "modal",
        title: "Modal",
        description: "Modal sederhana yang bisa ditutup dengan overlay atau tombol.",
        preview: <ModalDemo />,
        code: `import { Modal } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Contoh Modal">
        <p>Isi modal.</p>
      </Modal>
    </>
  );
}`
      },
      {
        id: "toast",
        title: "Toast",
        description: "Sistem notifikasi toast yang mudah digunakan via hook `useToast`.",
        preview: <ToastDemo />,
        code: `import { ToastProvider, useToast } from "ava-ui";
import "ava-ui/styles.css";

function ExampleInner() {
  const { showToast } = useToast();
  return <button onClick={() => showToast({ message: "Halo dari toast" })}>Show toast</button>;
}

export function Example() {
  return (
    <ToastProvider>
      <ExampleInner />
    </ToastProvider>
  );
}`
      },
      {
        id: "alert",
        title: "Alert",
        description: "Alert inline dengan variant dan opsi dismiss.",
        preview: <AlertDemo />,
        code: `import { Alert } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return <Alert variant="warning">Contoh alert</Alert>;
}`
      },
      {
        id: "confirm-modal",
        title: "Confirm Modal",
        description: "Modal konfirmasi dengan pilihan Yes/No dan dukungan custom buttons.",
        preview: <ConfirmDemo />,
        code: `import { ConfirmModal } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open confirm</button>
      <ConfirmModal isOpen={open} onClose={() => setOpen(false)} title="Yakin?" message="Lanjutkan aksi?" />
    </>
  );
}`
      },
      {
        id: "card",
        title: "Card",
        description: "Gunakan Card untuk membungkus konten ringkas seperti ringkasan data, form pendek, atau preview chart.",
        preview: (
          <Card title="Contoh Card">
            Ini komponen wrapper sederhana. Isi konten apa pun lewat children.
          </Card>
        ),
        code: `import { Card } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <Card title="Contoh Card">
      Isi konten apa pun lewat children.
    </Card>
  );
}`
      },
      {
        id: "hover-card",
        title: "Hover Card",
        description: "Gunakan HoverCard untuk profile snippet, promo card, atau highlight konten yang terasa hidup saat di-hover.",
        preview: <HoverCardPreview />,
        code: `import { useState } from "react";
import { HoverCard } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard
      isOpen={isOpen}
      avatar={<YourIcon />}
      title="Ava UI"
      handle="@ava_ui"
      description="Building the future of UI for web & mobile. 🚀 (YC S24)"
      stats={[
        { value: "4", label: "Following" },
        { value: "97.1K", label: "Followers" }
      ]}
    >
      <p>
        Check out{" "}
        <button onClick={() => setIsOpen((value) => !value)} type="button">
          @ava_ui
        </button>{" "}
        for beautiful React components.
      </p>
    </HoverCard>
  );
}`
      },
      {
        id: "section-heading",
        title: "Section Heading",
        description:
          "Gunakan SectionHeading untuk judul section seperti kategori layanan. Posisi bisa left, center, right; setiap line bisa punya font size, warna, weight, style, className, dan style custom sendiri.",
        wide: true,
        preview: <SectionHeadingPreview />,
        code: `import { SectionHeading } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <SectionHeading
      align="center"
      eyebrow="Kategori Layanan"
      title="Butuh Kebutuhan Megesankan Apa?"
      description="Pilihlah klasifikasi layanan terbaik untuk melengkapi hari suci pernikahan Anda."
      eyebrowProps={{
        color: "#d6a92b",
        fontSize: "0.78rem",
        letterSpacing: "0.38em"
      }}
      titleProps={{
        color: "#3f3f46",
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontStyle: "italic"
      }}
      descriptionProps={{
        color: "#9ca3af",
        fontSize: "1.12rem"
      }}
    />
  );
}

export function CustomLines() {
  return (
    <SectionHeading
      align="left"
      lines={[
        {
          as: "span",
          content: "Custom eyebrow",
          color: "#d6a92b",
          fontSize: "0.75rem",
          fontWeight: 900,
          letterSpacing: "0.24em",
          textTransform: "uppercase"
        },
        {
          as: "h2",
          content: <>Judul bisa ReactNode <em>custom</em></>,
          color: "#111827",
          fontSize: "3rem",
          fontFamily: "Georgia, serif",
          fontStyle: "italic"
        }
      ]}
    />
  );
}`
      },
      {
        id: "input",
        title: "Input",
        description: "Gunakan Input untuk field teks dengan label dan helper text yang konsisten.",
        preview: <Input label="Nama" name="name" placeholder="Masukkan nama" helperText="Contoh input reusable." />,
        code: `import { Input } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <Input
      label="Nama"
      name="name"
      placeholder="Masukkan nama"
      helperText="Contoh input reusable."
    />
  );
}`
      },
      {
        id: "chip",
        title: "Chip",
        description: "Gunakan Chip untuk status kecil, tag, atau penanda visual yang ringkas.",
        preview: (
          <div className="demo-chip-row">
            <Chip color="success" variant="soft">
              Succeeded
            </Chip>
            <Chip color="danger" variant="soft">
              Failed
            </Chip>
            <Chip color="info" variant="outline">
              Info
            </Chip>
          </div>
        ),
        code: `import { Chip } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <div>
      <Chip color="success" variant="soft">Succeeded</Chip>
      <Chip color="danger" variant="soft">Failed</Chip>
      <Chip color="info" variant="outline">Info</Chip>
    </div>
  );
}`
      }
    ]
  },
  {
    id: "forms",
    title: "Forms UI",
    description: "Komponen form lengkap untuk input, pilihan, tanggal, select local/remote, dan upload file.",
    items: [
      {
        id: "form-inputs",
        title: "Inputs",
        description:
          "Gunakan Input, InputNumber, InputEmail, InputPassword, dan TextArea untuk field form dengan label, helper text, error, required, prefix/suffix, dan aksesibilitas dasar.",
        wide: true,
        preview: <FormInputsPreview />,
        code: `import {
  Input,
  InputEmail,
  InputNumber,
  InputPassword,
  TextArea
} from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <form>
      <Input
        label="Project name"
        name="project"
        placeholder="Component Library"
        prefix="#"
        helperText="Mendukung prefix, suffix, required, dan error state."
        required
      />

      <InputEmail
        label="Email"
        name="email"
        placeholder="ava@example.com"
      />

      <InputPassword
        label="Password"
        name="password"
        placeholder="Masukkan password"
        helperText="Gunakan minimal 8 karakter."
      />

      <InputNumber
        label="Seats"
        name="seats"
        min={0}
        max={100}
        step={1}
        suffix="users"
      />

      <TextArea
        label="Description"
        name="description"
        rows={4}
        maxLength={180}
        placeholder="Tulis deskripsi singkat..."
      />
    </form>
  );
}`
      },
      {
        id: "form-choices",
        title: "Choices",
        description:
          "Gunakan Checkbox, CheckboxGroup, RadioGroup, dan Switch untuk pilihan single/multiple dengan layout horizontal atau vertical.",
        wide: true,
        preview: <FormChoicesPreview />,
        code: `import {
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  type SelectOption
} from "ava-ui";
import "ava-ui/styles.css";

const options: SelectOption[] = [
  { label: "Design System", value: "design" },
  { label: "Dashboard", value: "dashboard" },
  { label: "Mobile App", value: "mobile" }
];

export function Example() {
  return (
    <form>
      <Checkbox
        label="Saya setuju dengan terms"
        description="Single checkbox dengan helper text."
      />

      <Switch
        label="Auto publish"
        description="Aktifkan untuk publish otomatis."
      />

      <CheckboxGroup
        label="Channels"
        layout="horizontal"
        options={options}
      />

      <RadioGroup
        label="Layout"
        layout="horizontal"
        defaultValue="comfortable"
        options={[
          { label: "Compact", value: "compact" },
          { label: "Comfortable", value: "comfortable" },
          { label: "Spacious", value: "spacious" }
        ]}
      />
    </form>
  );
}`
      },
      {
        id: "form-selects",
        title: "Selects",
        description:
          "Gunakan Select dan MultiSelect untuk data local atau remote endpoint dengan search, clear, loading, error, dan load more pagination.",
        wide: true,
        preview: <FormSelectPreview />,
        code: `import { Select, MultiSelect, type SelectOption } from "ava-ui";
import "ava-ui/styles.css";

const options: SelectOption[] = [
  { label: "Design System", value: "design" },
  { label: "Dashboard", value: "dashboard" },
  { label: "Mobile App", value: "mobile" }
];

export function Example() {
  return (
    <form>
      <Select
        label="Single select"
        options={options}
        placeholder="Pilih project"
        helperText="Local options, searchable, dan clearable."
      />

      <MultiSelect
        label="Multi select"
        options={options}
        placeholder="Pilih beberapa kategori"
      />

      <Select
        label="Remote select"
        endpoint={{
          url: "/api/users",
          dataPath: "data.items",
          pageSize: 10
        }}
        placeholder="Cari user"
      />

      <MultiSelect
        label="Remote multi select"
        endpoint={{
          url: "/api/users",
          dataPath: "data.items",
          pageSize: 10
        }}
        placeholder="Cari beberapa user"
      />
    </form>
  );
}`
      },
      {
        id: "form-date-upload",
        title: "Date Picker & Upload",
        description:
          "Gunakan DatePicker untuk input tanggal dengan popup kalender, dan UploadArea untuk drag/drop file dengan preview, validasi, remove, dan progress.",
        wide: true,
        preview: <FormDateUploadPreview />,
        code: `import { DatePicker, UploadArea } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  return (
    <form>
      <DatePicker
        label="Launch date"
        name="launchDate"
        minDate="2026-01-01"
        maxDate="2027-12-31"
        helperText="Klik field untuk membuka kalender."
      />

      <UploadArea
        label="Assets"
        name="assets"
        accept="image/*,.pdf"
        maxFileSize={2 * 1024 * 1024}
        multiple
        progress={45}
        helperText="Mendukung preview image dan remove file."
      />
    </form>
  );
}`
      },
      {
        id: "form-builder",
        title: "Form Builder",
        description:
          "Gunakan FormBuilder untuk membuat form lengkap dari array FormFieldConfig<TValues>. Mendukung row grouping, default values, values change, submit, async select, OTP, range, rating, date range, dan upload.",
        wide: true,
        preview: <FormBuilderPreview />,
        code: `import { FormBuilder, type FormFieldConfig, type SelectOption } from "ava-ui";
import "ava-ui/styles.css";

interface FormValues extends Record<string, unknown> {
  fullName: string;
  email: string;
  bio: string;
  password: string;
  age: number | null;
  otp: string;
  agreeToTerms: boolean;
  notificationsEnabled: boolean;
  preferredContact: string;
  experienceLevel: number;
  satisfaction: number;
  favoriteColor: string;
  birthDate: string;
  availableTime: string;
  vacationRange: { start?: string; end?: string };
  country: string;
  assignee: string;
  skills: string[];
  meetingAt: string;
  attachments: File[];
}

const contactOptions: SelectOption[] = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "WhatsApp", value: "whatsapp" }
];

const countryOptions: SelectOption[] = [
  { label: "Indonesia", value: "id" },
  { label: "Singapore", value: "sg" }
];

const searchAssignees = async (query: string): Promise<SelectOption[]> => {
  const response = await fetch(\`/api/users?search=\${query}\`);
  const json = await response.json();
  return json.data.map((item: { id: string; name: string }) => ({
    label: item.name,
    value: item.id
  }));
};

const formFields: FormFieldConfig<FormValues>[] = [
  {
    kind: "text",
    name: "fullName",
    label: "Full name",
    row: "identity",
    props: {
      placeholder: "Nama lengkap",
      required: true,
      inputClassName: "rounded-[1.5rem]"
    }
  },
  {
    kind: "text",
    name: "email",
    label: "Email",
    row: "identity",
    props: {
      type: "email",
      placeholder: "nama@domain.com",
      required: true
    }
  },
  {
    kind: "textarea",
    name: "bio",
    label: "Bio",
    props: {
      placeholder: "Ceritakan singkat tentang profile kamu",
      hint: "Textarea default bisa dioverride.",
      required: true
    }
  },
  {
    kind: "text",
    name: "password",
    label: "Password",
    row: "security",
    props: {
      type: "password",
      allowPasswordToggle: true,
      placeholder: "Masukkan password",
      required: true
    }
  },
  {
    kind: "text",
    name: "age",
    label: "Age",
    row: "security",
    props: {
      type: "number",
      placeholder: "17",
      required: true
    }
  },
  {
    kind: "otp",
    name: "otp",
    label: "OTP code",
    props: {
      hint: "Input OTP 6 digit.",
      required: true
    }
  },
  {
    kind: "checkbox",
    name: "agreeToTerms",
    label: "Saya menyetujui syarat dan kebijakan"
  },
  {
    kind: "switch",
    name: "notificationsEnabled",
    label: "Aktifkan notifikasi"
  },
  {
    kind: "radio",
    name: "preferredContact",
    label: "Preferred contact",
    options: contactOptions,
    props: { required: true }
  },
  {
    kind: "range",
    name: "experienceLevel",
    label: "Experience level",
    row: "feedback",
    props: { min: 0, max: 100, step: 5 }
  },
  {
    kind: "rating",
    name: "satisfaction",
    label: "Satisfaction rating",
    row: "feedback"
  },
  {
    kind: "color",
    name: "favoriteColor",
    label: "Favorite color",
    row: "schedule-a"
  },
  {
    kind: "date",
    name: "birthDate",
    label: "Birth date",
    row: "schedule-a"
  },
  {
    kind: "time",
    name: "availableTime",
    label: "Available time",
    row: "schedule-b"
  },
  {
    kind: "date-range",
    name: "vacationRange",
    label: "Vacation range",
    row: "schedule-b"
  },
  {
    kind: "select",
    name: "country",
    label: "Country",
    row: "select-a",
    options: countryOptions,
    props: {
      placeholder: "Pilih negara",
      searchable: true
    }
  },
  {
    kind: "select",
    name: "assignee",
    label: "Assignee",
    row: "select-a",
    loadOptions: searchAssignees,
    props: {
      placeholder: "Cari assignee",
      searchPlaceholder: "Type untuk search server...",
      searchable: true
    }
  },
  {
    kind: "select",
    name: "skills",
    label: "Skills",
    loadOptions: searchAssignees,
    props: {
      placeholder: "Pilih skill",
      multiple: true,
      searchable: true
    }
  },
  {
    kind: "datetime",
    name: "meetingAt",
    label: "Meeting time",
    row: "final"
  },
  {
    kind: "file",
    name: "attachments",
    label: "Attachments",
    row: "final",
    props: {
      accept: ".pdf,.png,.jpg,.jpeg",
      multiple: true
    }
  }
];

export function Example() {
  return (
    <FormBuilder<FormValues>
      fields={formFields}
      defaultValues={{
        favoriteColor: "#2563eb",
        experienceLevel: 45,
        satisfaction: 4
      }}
      onSubmit={(values) => console.log(values)}
      submitLabel="Save profile"
    />
  );
}`
      },
      {
        id: "form-react-hook-form",
        title: "React Hook Form",
        description:
          "Semua komponen form tetap menerima name, value, onChange, onBlur, dan ref/native props sehingga bisa dipakai dengan React Hook Form atau Formik.",
        preview: (
          <pre className="demo-inline-code">
            <code>{`<Controller
  control={form.control}
  name="email"
  render={({ field, fieldState }) => (
    <InputEmail
      {...field}
      label="Email"
      error={fieldState.error?.message}
    />
  )}
/>`}</code>
          </pre>
        ),
        code: `import { Controller, useForm } from "react-hook-form";
import { InputEmail } from "ava-ui";
import "ava-ui/styles.css";

export function Example() {
  const form = useForm({
    defaultValues: {
      email: ""
    }
  });

  return (
    <Controller
      control={form.control}
      name="email"
      render={({ field, fieldState }) => (
        <InputEmail
          {...field}
          label="Email"
          error={fieldState.error?.message}
        />
      )}
    />
  );
}`
      }
    ]
  },
  {
    id: "navigation",
    title: "Navigation UI",
    description: "Komponen untuk menampilkan struktur folder, item bertingkat, dan navigasi eksplorasi.",
    items: [
      {
        id: "app-layout",
        title: "App Layout",
        description:
          "Gunakan AppLayout untuk admin shell lengkap dengan navbar, sidebar, aside/details panel, overlay mobile, dan trigger compound seperti AppLayout.MenuToggle dan AppLayout.AsideTrigger.",
        wide: true,
        preview: <AppLayoutPreview />,
        code: `import { useState } from "react";
import { AppLayout, Navbar, Sidebar, type SidebarItem } from "ava-ui";
import "ava-ui/styles.css";

function DetailsPanel() {
  return <aside>Details, filters, activity, or inspector content.</aside>;
}

const items: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "projects",
    label: "Projects",
    defaultOpen: true,
    children: [
      { id: "active-projects", label: "Active" },
      { id: "archived-projects", label: "Archived" }
    ]
  },
  { id: "billing", label: "Billing" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" }
];

function AdminSidebar({
  activeId,
  onActiveChange
}: {
  activeId: string | null;
  onActiveChange: (activeId: string | null) => void;
}) {
  return (
    <>
      <Sidebar
        activeId={activeId}
        brand="ava-admin"
        brandIcon="A"
        defaultOpenIds={["projects"]}
        items={items}
        minHeight="0"
        onActiveChange={onActiveChange}
        showCollapseToggle={false}
        variant="navigation"
        width="280px"
      />
      <Sidebar.Mobile>
        <nav>Mobile sidebar content</nav>
      </Sidebar.Mobile>
    </>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>("dashboard");

  return (
    <AppLayout
      aside={<DetailsPanel />}
      navbar={
        <Navbar maxWidth="full">
          <Navbar.Header>
            <Sidebar.Trigger />
            <Navbar.Spacer />
            <AppLayout.AsideTrigger />
          </Navbar.Header>
        </Navbar>
      }
      sidebar={
        <AdminSidebar
          activeId={activeId}
          onActiveChange={setActiveId}
        />
      }
      sidebarWidth="280px"
      asideWidth="340px"
    >
      {children}
    </AppLayout>
  );
}`
      },
      {
        id: "header",
        title: "Header",
        description:
          "Gunakan Header untuk navbar aplikasi dengan brand, menu, search, action icon, login/register, dan profile menu setelah login. Primary color bisa kamu ganti lewat ThemeRoot atau CSS variable --rpc-color-primary.",
        wide: true,
        preview: <HeaderPreview />,
        code: `import { useState } from "react";
import {
  ThemeRoot,
  Header,
  type HeaderAction,
  type HeaderNavItem,
  type HeaderProfileMenuItem
} from "ava-ui";
import "ava-ui/styles.css";

const navItems: HeaderNavItem[] = [
  { id: "vendor", label: "Cari Vendor", href: "#", active: true },
  { id: "package", label: "Produk & Paket", href: "#" },
  { id: "booking", label: "Form Booking", href: "#" }
];

const actions: HeaderAction[] = [
  { id: "bag", label: "Booking bag", icon: <BagIcon /> }
];

const profileMenuItems: HeaderProfileMenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "#" },
  { id: "bookings", label: "My Bookings", href: "#" }
];

export function Example() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  return (
      <ThemeRoot
        mode="light"
        backgroundColor="#f8f6f1"
        borderColor="#e8dfd1"
        mutedColor="#8c7a61"
      primaryColor="#d6a92b"
      primaryHoverColor="#c79618"
      secondaryColor="#ffffff"
      secondaryHoverColor="#f7f1e7"
      secondaryTextColor="#8c7a61"
      surfaceColor="#f8f6f1"
      surfaceMutedColor="#fffaf3"
      textColor="#4b5563"
    >
      <Header
        brand={<span>MFWedding</span>}
        navItems={navItems}
        actions={actions}
        isAuthenticated={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onRegister={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        profile={{ name: "Ava", email: "ava@example.com", avatar: "A" }}
        profileMenuItems={profileMenuItems}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Cari..."
        }}
      />
    </ThemeRoot>
  );
}`
      },
      {
        id: "bottom-navigation",
        title: "Bottom Navigation",
        description:
          "Gunakan BottomNavigation untuk app shell mobile dengan item icon, nama, url atau onClick, dan state aktif berbentuk tombol plus di tengah.",
        preview: <BottomNavigationPreview />,
        code: `import { useState } from "react";
import { BottomNavigation, type BottomNavigationItem } from "ava-ui";
import "ava-ui/styles.css";

const items: BottomNavigationItem[] = [
  { id: "calls", name: "Calls", href: "#", icon: <CallIcon /> },
  { id: "messages", name: "Messages", href: "#", icon: <ChatIcon /> },
  { id: "create", name: "Create", active: true },
  { id: "profile", name: "Profile", href: "#", icon: <UserIcon /> },
  { id: "settings", name: "Settings", onClick: () => console.log("Settings"), icon: <SettingsIcon /> }
];

export function Example() {
  const [activeId, setActiveId] = useState("create");

  return (
    <BottomNavigation
      activeId={activeId}
      activeColor="#6d28d9"
      background="#202022"
      borderColor="#2e2f34"
      items={items}
      maxWidth="720px"
      mutedColor="#b9bac4"
      onActiveChange={setActiveId}
      placement="inline"
      showLabels={false}
      textColor="#f4f4f5"
    />
  );
}`
      },
      {
        id: "sidebar",
        title: "Sidebar",
        description:
          "Gunakan Sidebar untuk app shell dengan brand, menu bertingkat, badge, footer actions, dan mode sheet di mobile. Semua warna mengikuti ThemeRoot.",
        wide: true,
        preview: <SidebarPreview />,
        code: `import { useState } from "react";
import { Sidebar, ThemeRoot, type SidebarItem } from "ava-ui";
import "ava-ui/styles.css";

const items: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", href: "#", icon: <DashboardIcon />, active: true },
  {
    id: "analytics",
    label: "Analytics",
    icon: <AnalyticsIcon />,
    defaultOpen: true,
    children: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
      { id: "conversions", label: "Conversions" }
    ]
  },
  { id: "tracker", label: "Tracker", icon: <TrackerIcon />, badge: "New" },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> }
];

const footerItems: SidebarItem[] = [
  { id: "help", label: "Help & Information", icon: <HelpIcon /> },
  { id: "logout", label: "Log out", icon: <LogoutIcon /> }
];

export function Example() {
  const [activeId, setActiveId] = useState<string | null>("dashboard");
  const [openIds, setOpenIds] = useState<string[]>(["analytics"]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeRoot
      mode="dark"
      backgroundColor="#09090b"
      borderColor="#27272a"
      mutedColor="#9ca3af"
      primaryColor="#2563eb"
      primaryHoverColor="#3b82f6"
      secondaryColor="#18181b"
      secondaryHoverColor="#26262a"
      secondaryTextColor="#f4f4f5"
      surfaceColor="#0f0f10"
      surfaceMutedColor="#111114"
      textColor="#f4f4f5"
    >
      <Sidebar
        activeId={activeId}
        brand="HeroUI"
        brandIcon="H"
        collapsed={collapsed}
        footerItems={footerItems}
        header={<div><strong>Dashboard</strong><p>Main content area.</p></div>}
        height="560px"
        items={items}
        minHeight="0"
        onActiveChange={(nextActiveId) => setActiveId(nextActiveId)}
        onCollapsedChange={setCollapsed}
        onOpenChange={(nextOpenIds) => setOpenIds(nextOpenIds)}
        openIds={openIds}
        width="340px"
      >
        <div>Your dashboard content here.</div>
      </Sidebar>
    </ThemeRoot>
  );
}`
      },
      {
        id: "file-tree",
        title: "File Tree",
        description: "Gunakan FileTree untuk menampilkan struktur folder, file, atau side navigation bertingkat.",
        wide: true,
        preview: (
          <div className="demo-file-tree-stage">
            <FileTree
              description="Hierarki folder yang bisa dibuka dan dipilih."
              nodes={fileTreeNodes}
              title="Project tree"
            />
          </div>
        ),
        code: `import { FileTree, type FileTreeNode } from "ava-ui";
import "ava-ui/styles.css";

const nodes: FileTreeNode[] = [
  {
    id: "apps",
    label: "apps",
    defaultOpen: true,
    children: [
      {
        id: "frontend",
        label: "frontend",
        defaultOpen: true,
        children: [
          { id: "frontend-package", label: "package.json" },
          { id: "frontend-tsconfig", label: "tsconfig.json" }
        ]
      }
    ]
  }
];

export function Example() {
  return (
    <FileTree
      title="Project tree"
      description="Hierarki folder yang bisa dibuka dan dipilih."
      nodes={nodes}
      defaultSelectedId="frontend-package"
    />
  );
}`
      }
    ]
  },
  {
    id: "data",
    title: "Data UI",
    description: "Komponen untuk menampilkan tabel data yang responsif, sortable, dan paginated.",
    items: [
      {
        id: "data-grid",
        title: "Data Grid",
        description: "Gunakan DataGrid untuk daftar data dengan sorting kolom, pagination, dan support data lokal atau API.",
        wide: true,
        preview: (
          <DataGrid
            actions={paymentActions}
            columns={paymentColumns}
            data={PAYMENT_DATA}
            filters={paymentFilters}
            mobileMode="auto"
            cardBreakpoint="tablet"
            pageSize={7}
            pageSizeOptions={[5, 7, 10]}
            searchPlaceholder="Search payments..."
            selectable
            tone="dark"
          />
        ),
        code: `import {
  Chip,
  DataGrid,
  type DataGridAction,
  type DataGridColumn,
  type DataGridEndpointConfig,
  type DataGridFilter,
} from "ava-ui";
import "ava-ui/styles.css";

interface Payment {
  id: string;
  customer: string;
  email: string;
  transactionId: string;
  amount: number;
  status: "succeeded" | "failed";
}

const columns: DataGridColumn<Payment>[] = [
  {
    id: "customer",
    header: "Customer",
    accessorKey: "customer",
    isRowHeader: true,
    allowsSorting: true,
    cell: (item) => (
      <div>
        <strong>{item.customer}</strong>
        <span>{item.email}</span>
      </div>
    ),
  },
  {
    id: "transactionId",
    header: "Transaction ID",
    accessorKey: "transactionId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => (
      <Chip color={item.status === "succeeded" ? "success" : "danger"} size="sm" variant="soft">
        {item.status}
      </Chip>
    ),
  },
  {
    id: "amount",
    header: ({ sortDirection }) => (
      <span>Amount {sortDirection === "ascending" ? "↑" : sortDirection === "descending" ? "↓" : ""}</span>
    ),
    accessorKey: "amount",
    align: "right",
    allowsSorting: true,
  },
];

const actions: DataGridAction<Payment>[] = [
  {
    id: "copy",
    name: "Copy payment ID",
    icon: <span>Copy</span>,
    onClick: (item) => navigator.clipboard.writeText(item.transactionId),
  },
  {
    id: "view",
    name: "View details",
    icon: <span>View</span>,
    onClick: (item) => console.log("view", item.id),
  },
  {
    id: "edit",
    name: "Edit payment",
    icon: <span>Edit</span>,
    onClick: (item) => console.log("edit", item.id),
  },
  {
    id: "delete",
    name: "Delete",
    color: "danger",
    icon: <span>Delete</span>,
    onClick: (item) => console.log("delete", item.id),
  },
];

const filters: DataGridFilter<Payment>[] = [
  {
    id: "status",
    label: "Status",
    accessorKey: "status",
    options: [
      { id: "succeeded", label: "Succeeded", value: "succeeded" },
      { id: "failed", label: "Failed", value: "failed" },
    ],
  },
];

const endpoint: DataGridEndpointConfig<Payment> = {
  url: "/api/payments",
  dataPath: "data.items",
  totalPath: "data.total",
  auth: {
    type: "bearer",
    token: accessToken,
  },
  queryParams: ({ page, pageSize, sortBy, sortDirection, search, filters, visibleColumns }) => ({
    page,
    limit: pageSize,
    sort_by: sortBy,
    sort_direction: sortDirection,
    search,
    filters: JSON.stringify(filters),
    columns: visibleColumns?.join(","),
  }),
};

export function Example() {
  return (
    <DataGrid
      actions={actions}
      columns={columns}
      endpoint={endpoint}
      filters={filters}
      mobileMode="auto"
      cardBreakpoint="tablet"
      pageSize={7}
      searchPlaceholder="Search payments..."
      selectable
      tone="dark"
    />
  );
}`
      }
    ]
  },
  {
    id: "media",
    title: "Media UI",
    description: "Komponen untuk menampilkan galeri gambar, produk, atau konten promosi.",
    items: [
      {
        id: "hero-slider",
        title: "Hero Slider",
        description:
          "Gunakan HeroSlider untuk banner promosi berbasis data JSON dengan image, badge, discount badge, headline, CTA, arrows, dots, autoplay opsional, dan redirect via endpoint atau targetPage + targetParams.",
        wide: true,
        preview: (
          <HeroSlider
            height="520px"
            minHeight="520px"
            onNavigate={({ url }) => console.log("Navigate to", url)}
            slides={heroSlides}
          />
        ),
        code: `import { HeroSlider, type SlideData } from "ava-ui";
import "ava-ui/styles.css";

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/wedding-hero.jpg",
    badge: "Memorable Shot",
    discountBadge: "Diskon IDR 5JT",
    title: "Abadikan Setiap Momen Abadi",
    subtitle: "Jasa Dokumentasi & Sinematografi Kelas Satu",
    description:
      "Dapatkan potongan langsung IDR 5.000.000 untuk sesi prewedding eksklusif bertemakan alam romantis di pantai Bali.",
    tagline: "Curated by MFWedding",
    ctaText: "Lihat fotografer elite",
    targetPage: "/vendors",
    targetParams: {
      category: "photography",
      city: "bali"
    }
  },
  {
    id: 2,
    image: "/images/venue.jpg",
    badge: "Dream Venue",
    title: "Rayakan Cinta di Tempat Terindah",
    subtitle: "Venue Romantis untuk Pernikahan Elegan",
    description: "Temukan venue premium dengan paket lengkap.",
    tagline: "Selected by Ava UI",
    ctaText: "Cari venue terbaik",
    endpoint: "/api/vendors?category=venue"
  }
];

export function Example() {
  return (
    <HeroSlider
      slides={slides}
      autoPlay
      autoPlayInterval={6000}
      onNavigate={({ url }) => {
        // Integrasikan dengan router kamu di sini.
        window.location.assign(url);
      }}
    />
  );
}`
      },
      {
        id: "image-hero-card",
        title: "Image Hero Card",
        description: "Gunakan ImageHeroCard untuk venue, hotel, event, produk, atau konten promosi dengan gambar besar dan overlay.",
        wide: true,
        preview: (
          <ImageHeroCard
            badge="Venue"
            height="420px"
            imageAlt="Wedding bouquet venue preview"
            imageSrc={venueImage}
            meta={venueMeta}
            title="The Grand Pavilion & Glasshouse"
            titleFontSize="clamp(2rem, 4vw, 3rem)"
            width="100%"
          />
        ),
        code: `import { ImageHeroCard, type ImageHeroCardMeta } from "ava-ui";
import "ava-ui/styles.css";

const meta: ImageHeroCardMeta[] = [
  { id: "rating", icon: <StarIcon />, label: "4.9 / 5.0 Rating" },
  { id: "location", icon: <LocationIcon />, label: "Jakarta, Indonesia" }
];

export function Example() {
  return (
    <ImageHeroCard
      badge="Venue"
      width="100%"
      height="420px"
      imageSrc="/images/venue.jpg"
      imageAlt="Wedding bouquet venue preview"
      title="The Grand Pavilion & Glasshouse"
      titleFontSize="clamp(2rem, 4vw, 3rem)"
      titleFontWeight={800}
      meta={meta}
    />
  );
}`
      },
      {
        id: "carousel",
        title: "Carousel",
        description:
          "Gunakan Carousel untuk galeri produk responsif dengan arrow, dots, thumbnails, keyboard navigation, swipe, dan autoplay opsional.",
        wide: true,
        preview: (
          <Carousel
            ariaLabel="Product image carousel"
            aspectRatio="1 / 1"
            autoPlayInterval={5000}
            items={productSlides}
          />
        ),
        code: `import { Carousel } from "ava-ui";
import "ava-ui/styles.css";

const items = [
  {
    id: "front",
    imageSrc: "/images/shoe-front.png",
    imageAlt: "Gray running shoe front view"
  },
  {
    id: "side",
    imageSrc: "/images/shoe-side.png",
    imageAlt: "Gray running shoe side view"
  }
];

export function Example() {
  return (
    <Carousel
      ariaLabel="Product image carousel"
      aspectRatio="1 / 1"
      items={items}
      loop
      showArrows
      showDots
      showThumbnails
    />
  );
}`
      }
    ]
  },
  {
    id: "charts",
    title: "Charts",
    description: "Komponen grafik SVG custom untuk dashboard dan visualisasi data ringan.",
    items: [
      {
        id: "area-chart",
        title: "Area Chart",
        description: "Gunakan AreaChart untuk memperlihatkan tren dengan penekanan volume di bawah garis.",
        preview: <AreaChart data={SALES_DATA} />,
        code: `import { AreaChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 31 }
];

export function Example() {
  return <AreaChart data={data} />;
}`
      },
      {
        id: "bar-chart",
        title: "Bar Chart",
        description: "Gunakan BarChart untuk membandingkan nilai antar kategori atau periode.",
        preview: <BarChart data={SALES_DATA} />,
        code: `import { BarChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 31 }
];

export function Example() {
  return <BarChart data={data} />;
}`
      },
      {
        id: "line-chart",
        title: "Line Chart",
        description: "Gunakan LineChart untuk tren yang fokus pada pergerakan garis dari waktu ke waktu.",
        preview: <LineChart data={SALES_DATA} />,
        code: `import { LineChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 38 },
  { label: "Mar", value: 31 }
];

export function Example() {
  return <LineChart data={data} />;
}`
      },
      {
        id: "pie-chart",
        title: "Pie Chart",
        description: "Gunakan PieChart untuk memperlihatkan proporsi setiap bagian terhadap total.",
        preview: <PieChart data={SEGMENT_DATA} />,
        code: `import { PieChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "Web", value: 42, color: "#2563eb" },
  { label: "Mobile", value: 28, color: "#16a34a" },
  { label: "Store", value: 18, color: "#f59e0b" }
];

export function Example() {
  return <PieChart data={data} />;
}`
      },
      {
        id: "radar-chart",
        title: "Radar Chart",
        description: "Gunakan RadarChart untuk membandingkan beberapa metrik dalam satu profil visual.",
        preview: <RadarChart data={RADAR_DATA} />,
        code: `import { RadarChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "UI", value: 86 },
  { label: "UX", value: 74 },
  { label: "Speed", value: 68 }
];

export function Example() {
  return <RadarChart data={data} />;
}`
      },
      {
        id: "radial-chart",
        title: "Radial Chart",
        description: "Gunakan RadialChart untuk progress atau persentase multi kategori dalam bentuk ring.",
        preview: <RadialChart data={SEGMENT_DATA} />,
        code: `import { RadialChart } from "ava-ui";
import "ava-ui/styles.css";

const data = [
  { label: "Web", value: 42 },
  { label: "Mobile", value: 28 },
  { label: "Store", value: 18 }
];

export function Example() {
  return <RadialChart data={data} />;
}`
      },
      {
        id: "chart-tooltip",
        title: "Chart Tooltip",
        description: "Gunakan ChartTooltip sebagai UI tooltip statis atau custom overlay untuk chart buatan sendiri.",
        preview: (
          <ChartTooltip
            footer="Contoh tooltip statis untuk chart custom."
            items={SEGMENT_DATA.slice(0, 3)}
            title="Channel"
          />
        ),
        code: `import { ChartTooltip } from "ava-ui";
import "ava-ui/styles.css";

const items = [
  { label: "Web", value: 42, color: "#2563eb" },
  { label: "Mobile", value: 28, color: "#16a34a" }
];

export function Example() {
  return (
    <ChartTooltip
      title="Channel"
      items={items}
      footer="Contoh tooltip statis untuk chart custom."
    />
  );
}`
      }
    ]
  }
];

// ============ DEMO CARD COMPONENT ============
const DemoCard: React.FC<{ item: DemoItem }> = ({ item }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCode = useCallback(() => {
    setIsCodeVisible(prev => !prev);
  }, []);

  return (
    <article className={["demo-doc-card", item.wide ? "demo-doc-card--wide" : ""].filter(Boolean).join(" ")} id={item.id}>
      <div className="demo-doc-card__header">
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <button
          aria-controls={`${item.id}-code`}
          aria-expanded={isCodeVisible}
          className="demo-code-toggle"
          onClick={toggleCode}
          type="button"
        >
          {isCodeVisible ? "Hide code" : "Show code"}
        </button>
      </div>

      <div className="demo-preview">{item.preview}</div>

      {isCodeVisible && (
        <pre className="demo-code" id={`${item.id}-code`}>
          <code>{item.code}</code>
        </pre>
      )}
    </article>
  );
};

// ============ MAIN DEMO COMPONENT ============
const Demo: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(demoGroups[0]?.id ?? null);
  const demoContentRef = useRef<HTMLElement | null>(null);
  const scrollToDemoTarget = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    const scrollContainer = demoContentRef.current?.closest(".rpc-sidebar__content-body") as HTMLElement | null;

    if (!target || !scrollContainer) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const nextTop = targetRect.top - containerRect.top + scrollContainer.scrollTop - 12;

    scrollContainer.scrollTo({
      behavior: "smooth",
      top: Math.max(nextTop, 0)
    });
  }, []);
  const demoSidebarItems: SidebarItem[] = useMemo(
    () =>
      demoGroups.map((group) => ({
        id: group.id,
        label: group.title,
        icon: <span className="demo-shell-sidebar__icon">{group.title.slice(0, 1)}</span>,
        onClick: () => scrollToDemoTarget(group.id),
        children: group.items.map((item) => ({
          id: `${group.id}-${item.id}`,
          label: item.title,
          onClick: () => scrollToDemoTarget(item.id)
        }))
      })),
    [scrollToDemoTarget]
  );
  const demoSidebarOpenIds = useMemo(() => demoGroups.map((group) => group.id), []);

  return (
    <main className="demo-shell" id="top">
      <Sidebar
        activeId={activeGroupId}
        ariaLabel="Demo navigation"
        brand="ava-ui"
        brandHref="#top"
        brandIcon="A"
        className="demo-shell-sidebar"
        collapsedWidth="76px"
        header={
          <div className="demo-shell-sidebar__header">
            <strong>Component Library</strong>
            <span>Demo & documentation</span>
          </div>
        }
        height="calc(100vh - 2.75rem)"
        items={demoSidebarItems}
        minHeight="0"
        onActiveChange={(nextActiveId) => setActiveGroupId(nextActiveId)}
        defaultOpenIds={demoSidebarOpenIds}
        width="260px"
      >
        <section className="demo-content" ref={demoContentRef}>
          <header className="demo-hero">
            <p className="demo-eyebrow">React Component Library</p>
            <h1>Preview, dokumentasi, dan contoh penggunaan komponen.</h1>
            <p>
              Setiap komponen punya deskripsi singkat, preview langsung, dan contoh code yang bisa dipakai setelah package
              dipublish.
            </p>
          </header>

          <div className="demo-groups">
            {demoGroups.map((group) => (
              <section className="demo-group" id={group.id} key={group.id}>
                <div className="demo-group__header">
                  <p className="demo-eyebrow">{group.id}</p>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>

                <div className="demo-doc-grid">
                  {group.items.map((item) => (
                    <DemoCard item={item} key={item.id} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </Sidebar>
    </main>
  );
};

// ============ APP INITIALIZATION ============
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  );
}
