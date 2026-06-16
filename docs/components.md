# ava-ui Component Usage Guide

Dokumentasi ini ditujukan untuk tim FE yang memakai `ava-ui` di aplikasi React.

## Setup

Install package:

```bash
npm install ava-ui
```

Import komponen dan stylesheet global:

```tsx
import { Button, Card, Input } from "ava-ui";
import "ava-ui/styles.css";
```

Semua komponen menerima `className` jika perlu override style dari aplikasi. Banyak komponen juga mewarisi atribut native HTML, misalnya `onClick`, `disabled`, `id`, `name`, `aria-*`, `style`, dan event handler lain.

## ThemeRoot

Gunakan `ThemeRoot` untuk memberi token warna, radius, shadow, dan mode terang/gelap ke subtree aplikasi.

```tsx
import { ThemeRoot, Button, Card } from "ava-ui";
import "ava-ui/styles.css";

export function App() {
  return (
    <ThemeRoot
      mode="light"
      primaryColor="#2563eb"
      surfaceColor="#ffffff"
      textColor="#111827"
      radius="14px"
    >
      <Card title="Dashboard">
        <Button>Tambah data</Button>
      </Card>
    </ThemeRoot>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `mode` | `"light" \| "dark"` | Mode warna dasar. Default `dark`. |
| `primaryColor`, `secondaryColor` | `string` | Warna utama dan sekunder. |
| `backgroundColor`, `surfaceColor`, `textColor`, `mutedColor`, `borderColor` | `string` | Token warna layout dan teks. |
| `dangerColor`, `successColor`, `warningColor`, `infoColor` | `string` | Token status. |
| `radius`, `shadow` | `string` | Token radius dan shadow global. |

## Foundation Components

### Button

```tsx
import { Button } from "ava-ui";

export function ButtonExample() {
  return (
    <>
      <Button variant="primary" size="md">Simpan</Button>
      <Button variant="secondary" size="sm">Draft</Button>
      <Button variant="ghost" size="lg" disabled>Hapus</Button>
    </>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost"` | Tampilan tombol. Default `primary`. |
| `size` | `"sm" \| "md" \| "lg"` | Ukuran tombol. Default `md`. |
| `children` | `ReactNode` | Isi tombol. |

### Card

```tsx
import { Card } from "ava-ui";

export function CardExample() {
  return (
    <Card title="Ringkasan">
      <p>Total transaksi bulan ini: 128</p>
    </Card>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `title` | `ReactNode` | Judul opsional. |
| `children` | `ReactNode` | Konten card. |

### CategoryCard

`CategoryCard` cocok untuk kartu kategori, fitur, produk, atau statistik kecil.

```tsx
import { CategoryCard } from "ava-ui";

export function CategoryCardExample() {
  return (
    <CategoryCard
      icon={<span>UI</span>}
      title="Foundation"
      subtitle="Komponen dasar untuk aplikasi"
      align="center"
      backgroundColor="#f8fafc"
      borderColor="#e2e8f0"
    />
  );
}
```

Untuk kontrol typography per baris:

```tsx
<CategoryCard
  lines={[
    { content: "12", as: "h3", fontSize: "2rem", fontWeight: 800 },
    { content: "Kategori aktif", as: "p", color: "#64748b" }
  ]}
/>
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `align` | `"left" \| "center" \| "right"` | Posisi konten. Default `center`. |
| `as` | `"article" \| "div" \| "section"` | Element wrapper. |
| `icon`, `title`, `subtitle`, `children` | `ReactNode` | Konten utama. |
| `lines` | `CategoryCardLine[]` | Konfigurasi baris custom. |
| `backgroundColor`, `borderColor`, `padding`, `radius`, `maxWidth`, `minHeight` | `string` | Token visual per instance. |

### SectionHeading

```tsx
import { SectionHeading } from "ava-ui";

export function HeadingExample() {
  return (
    <SectionHeading
      align="left"
      eyebrow="Overview"
      title="Komponen siap pakai"
      description="Bangun UI aplikasi lebih cepat dengan API yang konsisten."
    />
  );
}
```

Untuk kebutuhan custom:

```tsx
<SectionHeading
  lines={[
    { content: "ava-ui", as: "span", textTransform: "uppercase" },
    { content: "Design System Internal", as: "h1", fontSize: "3rem" }
  ]}
/>
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `align` | `"left" \| "center" \| "right"` | Posisi heading. Default `center`. |
| `as` | `"header" \| "div" \| "section"` | Element wrapper. |
| `eyebrow`, `title`, `description` | `ReactNode` | Shortcut konten umum. |
| `lines` | `SectionHeadingLine[]` | Baris custom dengan kontrol typography. |
| `maxWidth`, `gap` | `string` | Batas lebar dan jarak antar baris. |

### Chip

```tsx
import { Chip } from "ava-ui";

export function ChipExample() {
  return (
    <>
      <Chip color="success">Aktif</Chip>
      <Chip color="warning" variant="outline">Pending</Chip>
      <Chip color="danger" variant="solid" size="sm">Ditolak</Chip>
    </>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `color` | `"default" \| "success" \| "warning" \| "danger" \| "info"` | Warna status. |
| `variant` | `"soft" \| "solid" \| "outline"` | Gaya chip. |
| `size` | `"sm" \| "md"` | Ukuran chip. |

### Alert

```tsx
import { Alert } from "ava-ui";

export function AlertExample() {
  return (
    <Alert variant="success" title="Berhasil" dismissible onClose={() => {}}>
      Data berhasil disimpan.
    </Alert>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `variant` | `"info" \| "success" \| "error" \| "warning"` | Status alert. |
| `title` | `ReactNode` | Judul alert. |
| `dismissible` | `boolean` | Tampilkan tombol close. |
| `onClose` | `() => void` | Handler close. |

### Modal

```tsx
import { Modal, Button } from "ava-ui";
import { useState } from "react";

export function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Buka modal</Button>
      <Modal isOpen={open} title="Detail" onClose={() => setOpen(false)}>
        Konten modal.
      </Modal>
    </>
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `isOpen` | `boolean` | Status modal. |
| `onClose` | `() => void` | Handler close. |
| `title` | `ReactNode` | Judul modal. |
| `closeOnOverlayClick` | `boolean` | Klik overlay menutup modal. Default `true`. |

### ConfirmModal

```tsx
import { ConfirmModal } from "ava-ui";

<ConfirmModal
  isOpen={isDeleteOpen}
  onClose={() => setDeleteOpen(false)}
  title="Hapus data?"
  message="Aksi ini tidak bisa dibatalkan."
  actions={[
    { label: "Batal", variant: "secondary", onClick: () => setDeleteOpen(false) },
    { label: "Hapus", variant: "primary", onClick: handleDelete }
  ]}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `message` | `ReactNode` | Pesan konfirmasi. |
| `actions` | `{ label; onClick; variant? }[]` | Tombol aksi. |
| `isOpen`, `onClose`, `title` | dari `ModalProps` | Mengikuti API `Modal`. |

### ToastProvider dan useToast

```tsx
import { ToastProvider, useToast, Button } from "ava-ui";

function SaveButton() {
  const { showToast } = useToast();

  return (
    <Button
      onClick={() =>
        showToast({
          message: "Perubahan tersimpan.",
          variant: "success",
          duration: 3000
        })
      }
    >
      Simpan
    </Button>
  );
}

export function App() {
  return (
    <ToastProvider position="top-right">
      <SaveButton />
    </ToastProvider>
  );
}
```

Props dan options penting:

| API | Tipe | Keterangan |
| --- | --- | --- |
| `ToastProvider.position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | Posisi toast. |
| `showToast({ message })` | `ReactNode` | Isi toast. |
| `variant` | `"info" \| "success" \| "error" \| "warning"` | Status toast. |
| `duration` | `number` | Durasi ms. Default `4000`. |

### HoverCard

```tsx
import { HoverCard } from "ava-ui";

export function HoverCardExample() {
  return (
    <HoverCard
      title="Ava Admin"
      handle="@ava-admin"
      description="Template dashboard internal."
      stats={[
        { label: "Pages", value: 24 },
        { label: "Users", value: "8k" }
      ]}
      footer={<a href="/admin">Buka dashboard</a>}
    />
  );
}
```

Mode controlled untuk panel floating:

```tsx
<HoverCard isOpen={isOpen} title="Profile">
  <button onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    Hover saya
  </button>
</HoverCard>
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `title` | `ReactNode` | Nama atau judul. |
| `avatar`, `avatarSrc`, `avatarAlt`, `avatarFallback` | `ReactNode` / `string` | Avatar. |
| `handle`, `description`, `footer` | `ReactNode` | Konten pendukung. |
| `stats` | `{ label; value }[]` | Statistik ringkas. |
| `isOpen` | `boolean` | Mode controlled floating. |

## Form Components

### Input

```tsx
import { Input } from "ava-ui";

<Input
  label="Nama"
  name="name"
  placeholder="Nama lengkap"
  helperText="Sesuai KTP"
  required
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `type` | `"text" \| "search" \| "url" \| "tel" \| "email" \| "password"` | Tipe input. |
| `label`, `helperText`, `error`, `required`, `fullWidth` | `ReactNode` / `boolean` | Props field umum. |
| `prefix`, `suffix` | `ReactNode` | Affix kiri/kanan input. |
| `inputClassName` | `string` | Class untuk elemen input internal. |

### InputEmail

```tsx
import { InputEmail } from "ava-ui";

<InputEmail
  label="Email"
  name="email"
  placeholder="nama@domain.com"
  validateOnBlur
/>;
```

`InputEmail` memakai validasi native email saat blur. Semua props `Input` selain `type` tetap bisa dipakai.

### InputNumber

```tsx
import { InputNumber } from "ava-ui";
import { useState } from "react";

export function NumberExample() {
  const [qty, setQty] = useState<number | null>(1);

  return (
    <InputNumber
      label="Jumlah"
      min={1}
      max={99}
      step={1}
      value={qty ?? ""}
      onValueChange={setQty}
      formatNumber
    />
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `value` | `number \| string` | Nilai controlled. |
| `onValueChange` | `(value: number \| null) => void` | Callback nilai angka. |
| `min`, `max`, `step` | native input props | Batas dan step. |
| `formatNumber` | `boolean` | Format angka saat blur/tidak fokus. |
| `prefix`, `suffix` | `ReactNode` | Affix input. |

### InputPassword

```tsx
import { InputPassword } from "ava-ui";

<InputPassword
  label="Password"
  name="password"
  helperText="Minimal 8 karakter."
  showStrength
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `showStrength` | `boolean` | Tampilkan strength indicator. Default `true`. |
| props lain | `InputProps` | Sama seperti `Input`, kecuali `type` dan `suffix`. |

### TextArea

```tsx
import { TextArea } from "ava-ui";

<TextArea
  label="Catatan"
  name="notes"
  rows={4}
  maxLength={240}
  helperText="Opsional"
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `autoResize` | `boolean` | Auto tinggi textarea. Default `true`. |
| `showCounter` | `boolean` | Tampilkan counter jika ada `maxLength`. Default `true`. |
| `inputClassName` | `string` | Class textarea internal. |

### Checkbox

```tsx
import { Checkbox } from "ava-ui";

<Checkbox
  name="terms"
  label="Saya setuju"
  description="Dengan syarat dan ketentuan yang berlaku."
  required
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `label`, `description`, `helperText`, `error` | `ReactNode` | Konten field. |
| props lain | native input checkbox | Termasuk `checked`, `defaultChecked`, `onChange`, `disabled`. |

### CheckboxGroup

```tsx
import { CheckboxGroup } from "ava-ui";

<CheckboxGroup
  label="Channel"
  name="channels"
  layout="horizontal"
  options={[
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "whatsapp" }
  ]}
  onValueChange={(values) => console.log(values)}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `options` | `SelectOption[]` | Opsi checkbox. |
| `value`, `defaultValue` | `string[]` | Controlled/uncontrolled value. |
| `onValueChange` | `(values: string[]) => void` | Callback perubahan. |
| `layout` | `"horizontal" \| "vertical"` | Layout opsi. |

### RadioGroup

```tsx
import { RadioGroup } from "ava-ui";

<RadioGroup
  label="Metode pembayaran"
  name="payment"
  options={[
    { label: "Transfer", value: "transfer" },
    { label: "Kartu", value: "card" }
  ]}
  onValueChange={(value) => console.log(value)}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `options` | `SelectOption[]` | Opsi radio. |
| `value`, `defaultValue` | `string` | Controlled/uncontrolled value. |
| `onValueChange` | `(value: string) => void` | Callback perubahan. |
| `layout` | `"horizontal" \| "vertical"` | Layout opsi. |

### Switch

```tsx
import { Switch } from "ava-ui";

<Switch
  name="isActive"
  label="Status aktif"
  description="User dapat login jika aktif."
  onLabel="Aktif"
  offLabel="Nonaktif"
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `label`, `description`, `helperText`, `error` | `ReactNode` | Konten field. |
| `onLabel`, `offLabel` | `ReactNode` | Label status switch. |
| props lain | native checkbox props | Termasuk `checked`, `onChange`, `disabled`. |

### DatePicker

```tsx
import { DatePicker } from "ava-ui";
import { useState } from "react";

export function DateExample() {
  const [date, setDate] = useState("");

  return (
    <DatePicker
      label="Tanggal lahir"
      name="birthDate"
      value={date}
      onValueChange={setDate}
      minDate="1990-01-01"
      maxDate="2026-12-31"
      disabledDate={(item) => item.getDay() === 0}
    />
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `value`, `defaultValue` | `string` | Format `YYYY-MM-DD`. |
| `onValueChange` | `(value: string) => void` | Callback tanggal. |
| `minDate`, `maxDate` | `string` | Batas tanggal format `YYYY-MM-DD`. |
| `disabledDate` | `(date: Date) => boolean` | Disable tanggal tertentu. |
| `clearable` | `boolean` | Tampilkan clear button. Default `true`. |

### Select

Local options:

```tsx
import { Select } from "ava-ui";

<Select
  label="Role"
  name="role"
  options={[
    { label: "Admin", value: "admin" },
    { label: "Editor", value: "editor" }
  ]}
  onValueChange={(value, option) => console.log(value, option)}
/>;
```

Remote endpoint:

```tsx
<Select
  label="Universitas"
  name="university"
  endpoint={{
    url: "/api/universities",
    dataPath: "data.items",
    searchParam: "query",
    pageSize: 10,
    mapOption: (item: any) => ({
      label: item.name,
      value: String(item.id),
      meta: item
    })
  }}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `options` | `SelectOption[]` | Data local. |
| `endpoint` | `string \| SelectEndpointConfig` | Data remote. |
| `loadOptions` | `(query, page) => Promise<SelectOption[]> \| SelectOption[]` | Loader async custom. |
| `value`, `defaultValue` | `string` | Controlled/uncontrolled value. |
| `onValueChange` | `(value, option) => void` | Callback perubahan. |
| `searchable`, `clearable` | `boolean` | Search dan clear. |

### MultiSelect

```tsx
import { MultiSelect } from "ava-ui";

<MultiSelect
  label="Skills"
  name="skills"
  maxVisibleTags={2}
  options={[
    { label: "React", value: "react" },
    { label: "TypeScript", value: "ts" },
    { label: "Node.js", value: "node" }
  ]}
  onValueChange={(values, options) => console.log(values, options)}
/>;
```

Props penting sama seperti `Select`, tetapi `value`, `defaultValue`, dan callback memakai array `string[]`.

### UploadArea

```tsx
import { UploadArea } from "ava-ui";
import { useState } from "react";

export function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <UploadArea
      label="Dokumen"
      accept=".pdf,image/*"
      maxFileSize={2 * 1024 * 1024}
      files={files}
      onFilesChange={setFiles}
      progress={{ [files[0]?.name ?? ""]: 40 }}
    />
  );
}
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `files` | `File[]` | Controlled files. |
| `onFilesChange` | `(files: File[]) => void` | Callback file. |
| `accept` | `string` | Tipe file, sama seperti input file. |
| `maxFileSize` | `number` | Maksimal byte per file. |
| `multiple` | `boolean` | Multi file. Default `true`. |
| `progress` | `number \| Record<string, number>` | Progress upload. |

### FormBuilder

`FormBuilder` membuat form dari konfigurasi field.

```tsx
import { FormBuilder, type FormFieldConfig } from "ava-ui";

interface UserForm extends Record<string, unknown> {
  fullName: string;
  email: string;
  role: string;
  skills: string[];
  isActive: boolean;
}

const fields: FormFieldConfig<UserForm>[] = [
  {
    kind: "text",
    name: "fullName",
    label: "Nama lengkap",
    row: "identity",
    props: { required: true, placeholder: "Nama user" }
  },
  {
    kind: "text",
    name: "email",
    label: "Email",
    row: "identity",
    props: { type: "email", required: true }
  },
  {
    kind: "select",
    name: "role",
    label: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" }
    ]
  },
  {
    kind: "select",
    name: "skills",
    label: "Skills",
    props: { multiple: true, searchable: true },
    options: [
      { label: "React", value: "react" },
      { label: "TypeScript", value: "ts" }
    ]
  },
  {
    kind: "switch",
    name: "isActive",
    label: "User aktif"
  }
];

export function UserFormPage() {
  return (
    <FormBuilder<UserForm>
      fields={fields}
      defaultValues={{ isActive: true }}
      submitLabel="Simpan"
      onSubmit={(values) => console.log(values)}
    />
  );
}
```

Field kind yang tersedia:

```ts
type FormFieldKind =
  | "text"
  | "textarea"
  | "otp"
  | "checkbox"
  | "switch"
  | "radio"
  | "range"
  | "rating"
  | "color"
  | "date"
  | "time"
  | "date-range"
  | "select"
  | "datetime"
  | "file";
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `fields` | `FormFieldConfig<TValues>[]` | Daftar field. |
| `defaultValues`, `values` | `Partial<TValues>` | Uncontrolled/controlled values. |
| `errors` | `Partial<Record<fieldName, ReactNode>>` | Error per field. |
| `onSubmit` | `(values, event) => void` | Submit form. |
| `onValuesChange` | `(values, changedName, value) => void` | Callback perubahan field. |
| `columns` | `number` | Jumlah kolom CSS. Default `2`. |
| `showActions`, `actions`, `submitLabel`, `resetLabel` | `ReactNode` / `boolean` | Kontrol tombol form. |

## Navigation Components

### Header

```tsx
import { Header } from "ava-ui";

<Header
  brand="ava-ui"
  brandHref="/"
  navItems={[
    { id: "home", label: "Home", href: "/" },
    { id: "docs", label: "Docs", href: "/docs" }
  ]}
  activeNavId="docs"
  search={{
    placeholder: "Cari...",
    onSubmit: (query) => console.log(query)
  }}
  actions={[
    { id: "notif", label: "Notifikasi", icon: <span>!</span>, onClick: () => {} }
  ]}
  isAuthenticated
  profile={{ name: "Fajar", email: "fajar@example.com" }}
  profileMenuItems={[
    { id: "settings", label: "Pengaturan", href: "/settings" }
  ]}
  onLogout={() => console.log("logout")}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `brand`, `brandHref` | `ReactNode` / `string` | Brand header. |
| `navItems`, `activeNavId` | `HeaderNavItem[]` / `string` | Navigasi utama. |
| `search` | `HeaderSearchConfig \| false` | Search bar. Default `false`. |
| `actions` | `HeaderAction[]` | Tombol icon kanan. |
| `isAuthenticated` | `boolean` | Tampilkan profile atau login/register. |
| `profile`, `profileMenuItems`, `onLogout` | object / callback | Menu profile. |
| `maxWidth`, `height`, `background`, `textColor`, `accentColor` | `string` | Token visual header. |

### Navbar

`Navbar` adalah primitive compound untuk header ringan.

```tsx
import { Navbar, Button } from "ava-ui";

<Navbar maxWidth="full" sticky>
  <Navbar.Header>
    <Navbar.Brand>ava-admin</Navbar.Brand>
    <Navbar.Spacer />
    <Navbar.Section align="end">
      <Button size="sm">Tambah</Button>
    </Navbar.Section>
  </Navbar.Header>
</Navbar>;
```

Props penting:

| API | Keterangan |
| --- | --- |
| `Navbar maxWidth` | `"sm" \| "md" \| "lg" \| "xl" \| "full"`. |
| `Navbar sticky` | Membuat navbar sticky. |
| `Navbar.Header` | Wrapper isi navbar. |
| `Navbar.Brand` | Area brand. |
| `Navbar.Section align` | `"start" \| "center" \| "end"`. |
| `Navbar.Spacer` | Spacer fleksibel. |

### AppLayout + Sidebar

Contoh app shell admin:

```tsx
import { AppLayout, Navbar, Sidebar } from "ava-ui";

const items = [
  { id: "dashboard", label: "Dashboard", href: "/admin" },
  {
    id: "master",
    label: "Master data",
    defaultOpen: true,
    children: [
      { id: "users", label: "Users", href: "/admin/users" },
      { id: "roles", label: "Roles", href: "/admin/roles" }
    ]
  }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      sidebarWidth="300px"
      aside={<div>Detail panel</div>}
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
        <Sidebar
          brand="ava-admin"
          items={items}
          activeId="dashboard"
          variant="navigation"
          showCollapseToggle={false}
        />
      }
    >
      {children}
    </AppLayout>
  );
}
```

`AppLayout` props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `navbar`, `sidebar`, `aside`, `children` | `ReactNode` | Slot layout. |
| `sidebarOpen`, `defaultSidebarOpen`, `onSidebarOpenChange` | controlled/uncontrolled | State sidebar. |
| `asideOpen`, `defaultAsideOpen`, `onAsideOpenChange` | controlled/uncontrolled | State aside. |
| `sidebarWidth`, `asideWidth`, `navbarHeight` | `string` | Ukuran track layout. |
| `AppLayout.MenuToggle` | component | Toggle sidebar via context. |
| `AppLayout.AsideTrigger` | component | Toggle aside via context. |

`Sidebar` props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `items`, `footerItems` | `SidebarItem[]` | Menu utama dan footer. |
| `activeId`, `defaultActiveId`, `onActiveChange` | controlled/uncontrolled | Item aktif. |
| `openIds`, `defaultOpenIds`, `onOpenChange` | controlled/uncontrolled | Branch nested terbuka. |
| `collapsed`, `defaultCollapsed`, `onCollapsedChange` | controlled/uncontrolled | Collapse sidebar. |
| `variant` | `"shell" \| "navigation"` | Gunakan `navigation` saat sidebar dipasang di `AppLayout`. |
| `Sidebar.Trigger` | component | Toggle sidebar `AppLayout`. |
| `Sidebar.Mobile` | component | Wrapper khusus mobile. |

### BottomNavigation

```tsx
import { BottomNavigation } from "ava-ui";

<BottomNavigation
  placement="fixed"
  defaultActiveId="home"
  items={[
    { id: "home", name: "Home", href: "/" },
    { id: "orders", name: "Orders", href: "/orders" },
    { id: "profile", name: "Profile", href: "/profile" }
  ]}
  onActiveChange={(activeId) => console.log(activeId)}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `items` | `BottomNavigationItem[]` | Item navigasi. |
| `activeId`, `defaultActiveId`, `onActiveChange` | controlled/uncontrolled | Item aktif. |
| `showLabels` | `boolean` | Tampilkan label item nonaktif. Default `true`. |
| `placement` | `"inline" \| "fixed"` | Posisi nav. |
| `maxWidth`, `background`, `activeColor`, `activeTextColor` | `string` | Token visual. |

### FileTree

```tsx
import { FileTree } from "ava-ui";

<FileTree
  title="Project"
  defaultOpenIds={["src"]}
  nodes={[
    {
      id: "src",
      label: "src",
      children: [
        { id: "index", label: "index.ts", href: "/src/index.ts" },
        { id: "styles", label: "styles.css" }
      ]
    }
  ]}
  onSelectedChange={(id, node) => console.log(id, node)}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `nodes` | `FileTreeNode[]` | Data tree recursive. |
| `openIds`, `defaultOpenIds`, `onOpenChange` | controlled/uncontrolled | Node terbuka. |
| `selectedId`, `defaultSelectedId`, `onSelectedChange` | controlled/uncontrolled | Node terpilih. |
| `showLines` | `boolean` | Garis tree. Default `true`. |
| `density` | `"comfortable" \| "compact"` | Kepadatan row. |
| `indent` | `number` | Indent per level. |
| `renderLabel`, `renderIcon` | function | Custom label/icon per node. |

## Media Components

### Carousel

```tsx
import { Carousel } from "ava-ui";

<Carousel
  items={[
    {
      id: "one",
      imageSrc: "/images/product-1.jpg",
      imageAlt: "Produk 1",
      title: "Produk 1",
      description: "Produk unggulan"
    },
    {
      id: "two",
      content: <div>Konten custom</div>,
      thumbnailContent: <span>Custom</span>
    }
  ]}
  autoPlay
  autoPlayInterval={5000}
  aspectRatio="16 / 9"
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `items` | `CarouselItem[]` | Slide carousel. |
| `activeIndex`, `initialIndex`, `onSlideChange` | controlled/uncontrolled | State slide. |
| `loop`, `autoPlay`, `autoPlayInterval`, `pauseOnHover` | `boolean` / `number` | Behavior slide. |
| `showArrows`, `showDots`, `showThumbnails` | `boolean` | Kontrol navigasi. |
| `aspectRatio` | `string` | Rasio viewport. Default `1 / 1`. |

### HeroSlider

```tsx
import { HeroSlider } from "ava-ui";

<HeroSlider
  slides={[
    {
      id: 1,
      image: "/images/banner.jpg",
      badge: "Promo",
      discountBadge: "Diskon 30%",
      tagline: "Vendor terverifikasi",
      title: "Paket Wedding Premium",
      subtitle: "Untuk acara yang rapi dan berkesan",
      description: "Lengkap dengan dekorasi, catering, dan dokumentasi.",
      ctaText: "Lihat paket",
      targetPage: "/packages",
      targetParams: { category: "wedding" }
    }
  ]}
  onNavigate={({ url }) => router.push(url)}
  autoPlay
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `slides` | `SlideData[]` | Data hero. |
| `activeIndex`, `initialIndex`, `onSlideChange` | controlled/uncontrolled | State slide. |
| `onNavigate` | `({ slide, url }) => void` | Integrasi router. Jika kosong, CTA memakai `window.location.assign`. |
| `highlights` | `HeroSliderHighlight[]` | Highlight di konten. |
| `autoPlay`, `loop`, `pauseOnHover`, `showArrows`, `showDots` | `boolean` | Behavior slider. |
| `height`, `minHeight`, `imagePosition`, `overlay` | `string` / `"soft" \| "strong"` | Visual hero. |

### ImageHeroCard

```tsx
import { ImageHeroCard } from "ava-ui";

<ImageHeroCard
  imageSrc="/images/venue.jpg"
  imageAlt="Ballroom"
  badge="Venue"
  title="Grand Ballroom Jakarta"
  meta={[
    { id: "capacity", label: "500 pax" },
    { id: "location", label: "Jakarta Selatan" }
  ]}
>
  Paket venue untuk wedding dan corporate event.
</ImageHeroCard>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `imageSrc`, `imageAlt` | `string` | Gambar hero. |
| `badge`, `title`, `meta`, `children` | `ReactNode` / array | Konten overlay. |
| `width`, `height`, `aspectRatio`, `minHeight`, `contentWidth` | `string` | Ukuran. |
| `titleFontSize`, `badgeFontSize`, `metaFontSize`, `bodyFontSize` | `string` | Typography. |
| `imagePosition`, `overlay` | `string` / `"soft" \| "strong"` | Posisi gambar dan overlay. |

## Data Components

### DataGrid Local

```tsx
import { DataGrid, Chip, type DataGridColumn } from "ava-ui";

type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

const columns: DataGridColumn<User>[] = [
  { id: "name", header: "Nama", accessorKey: "name", allowsSorting: true, isRowHeader: true },
  { id: "email", header: "Email", accessorKey: "email" },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (row) => (
      <Chip color={row.status === "active" ? "success" : "default"}>
        {row.status}
      </Chip>
    )
  }
];

export function UsersTable({ users }: { users: User[] }) {
  return (
    <DataGrid
      title="Users"
      description="Daftar user aplikasi"
      columns={columns}
      data={users}
      searchable
      selectable
      filters={[
        {
          id: "status",
          label: "Status",
          accessorKey: "status",
          options: [
            { id: "active", label: "Active", value: "active" },
            { id: "inactive", label: "Inactive", value: "inactive" }
          ]
        }
      ]}
      actions={[
        { id: "edit", name: "Edit", color: "primary", onClick: (row) => console.log(row) }
      ]}
    />
  );
}
```

### DataGrid API

```tsx
<DataGrid<User>
  columns={columns}
  endpoint={{
    url: "/api/users",
    dataPath: "data.items",
    totalPath: "data.total",
    auth: { type: "bearer", token: accessToken },
    queryParams: (query) => ({
      page: query.page,
      limit: query.pageSize,
      q: query.search,
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      status: query.filters?.status
    })
  }}
  pageSize={10}
/>;
```

Atau dengan fetcher sendiri:

```tsx
<DataGrid<User>
  columns={columns}
  fetchData={async (query) => {
    const res = await fetch(`/api/users?page=${query.page}&limit=${query.pageSize}`);
    const json = await res.json();

    return {
      data: json.data.items,
      total: json.data.total
    };
  }}
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `columns` | `DataGridColumn<T>[]` | Definisi kolom. |
| `data` | `T[]` | Mode local. |
| `endpoint` | `string \| DataGridEndpointConfig<T>` | Mode API via fetch internal. |
| `fetchData` | `(query) => Promise<DataGridResponse<T> \| T[]>` | Mode API custom. |
| `pageSize`, `pageSizeOptions` | `number` / `number[]` | Pagination. |
| `searchable`, `initialSearch`, `onSearchChange` | search props | Search local/API. |
| `filters`, `initialFilters`, `onFiltersChange` | filter props | Filter multi-select. |
| `columnVisibility`, `defaultVisibleColumns`, `visibleColumns`, `onVisibleColumnsChange` | visibility props | Show/hide kolom. |
| `selectable`, `selectedKeys`, `defaultSelectedKeys`, `onSelectionChange` | selection props | Checkbox row. |
| `actions` | `DataGridAction<T>[]` | Menu aksi row. |
| `mobileMode` | `"table" \| "card" \| "auto"` | Mode responsif. |
| `renderCard` | `(row, rowIndex) => ReactNode` | Card custom untuk mobile. |
| `tone` | `"light" \| "dark"` | Tema tabel. Default `dark`. |

`DataGridQuery` yang dikirim ke API/custom fetcher:

```ts
type DataGridQuery = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: "ascending" | "descending";
  search?: string;
  filters?: Record<string, string[]>;
  visibleColumns?: string[];
};
```

## Chart Components

Semua chart memakai data dasar:

```ts
type ChartDatum = {
  label: string;
  value: number;
  color?: string;
};
```

Contoh data:

```tsx
const chartData = [
  { label: "Jan", value: 120, color: "#2563eb" },
  { label: "Feb", value: 180 },
  { label: "Mar", value: 90 }
];
```

### AreaChart

```tsx
import { AreaChart } from "ava-ui";

<AreaChart data={chartData} width={640} height={260} color="#2563eb" ariaLabel="Revenue area chart" />;
```

Props: `data`, `width`, `height`, `color`, `ariaLabel`.

### LineChart

```tsx
import { LineChart } from "ava-ui";

<LineChart data={chartData} width={640} height={260} color="#16a34a" />;
```

Props: `data`, `width`, `height`, `color`, `ariaLabel`.

### BarChart

```tsx
import { BarChart } from "ava-ui";

<BarChart data={chartData} width={640} height={260} />;
```

Props: `data`, `width`, `height`, `ariaLabel`.

### PieChart

```tsx
import { PieChart } from "ava-ui";

<PieChart data={chartData} size={280} showLegend />;
```

Props: `data`, `size`, `ariaLabel`, `showLegend`.

### RadarChart

```tsx
import { RadarChart } from "ava-ui";

<RadarChart
  data={[
    { label: "UX", value: 80 },
    { label: "Perf", value: 70 },
    { label: "A11y", value: 90 }
  ]}
  size={320}
  levels={5}
  color="#7c3aed"
/>;
```

Props: `data`, `size`, `color`, `levels`, `ariaLabel`.

### RadialChart

Nilai `value` diperlakukan sebagai persentase `0-100`.

```tsx
import { RadialChart } from "ava-ui";

<RadialChart
  data={[
    { label: "Storage", value: 68 },
    { label: "Bandwidth", value: 42 }
  ]}
  size={280}
  strokeWidth={14}
/>;
```

Props: `data`, `size`, `strokeWidth`, `ariaLabel`.

### ChartTooltip

```tsx
import { ChartTooltip } from "ava-ui";

<ChartTooltip
  title="Maret"
  items={[
    { label: "Revenue", value: 12000000, color: "#2563eb" },
    { label: "Orders", value: "128 order", color: "#16a34a" }
  ]}
  footer="Naik 12% dari bulan lalu"
/>;
```

Props penting:

| Prop | Tipe | Keterangan |
| --- | --- | --- |
| `title` | `ReactNode` | Judul tooltip. |
| `items` | `{ label; value; color? }[]` | Item tooltip. |
| `footer` | `ReactNode` | Footer opsional. |

## Type Exports

Semua tipe props utama diexport dari package, jadi bisa dipakai untuk typing di aplikasi:

```tsx
import type {
  ButtonProps,
  DataGridColumn,
  DataGridQuery,
  FormFieldConfig,
  SelectOption,
  SidebarItem,
  SlideData
} from "ava-ui";
```

## Catatan Integrasi FE

- Selalu import `ava-ui/styles.css` satu kali di entry aplikasi, misalnya `main.tsx`, `App.tsx`, atau layout root.
- Untuk form library seperti React Hook Form atau Formik, komponen input menerima prop native seperti `name`, `value`, `defaultValue`, `onChange`, `onBlur`, dan `ref` jika membungkus input native.
- Untuk router SPA, komponen yang punya `href` bisa dipakai biasa, atau gunakan callback seperti `onNavigate`, `onActiveChange`, dan `onClick` untuk integrasi router sendiri.
- Untuk DataGrid API, samakan kontrak backend dengan `DataGridQuery`. Gunakan `queryParams`, `dataPath`, dan `totalPath` agar mapping response tetap eksplisit.
