# AGENTS.md

Panduan untuk agent/developer yang mengerjakan project `ava-ui`.

## Tujuan Project

`ava-ui` adalah library komponen React reusable yang akan dipublish ke npm. Project ini memakai Vite library mode, TypeScript, dan CSS biasa.

Package harus bisa dipakai dari project lain seperti ini:

```tsx
import { Button, Card, Input } from "ava-ui";
import "ava-ui/styles.css";
```

## Struktur Project

```text
.
├── src/
│   ├── components/
│   │   ├── data/
│   │   │   └── DataGrid.tsx
│   │   ├── charts/
│   │   │   ├── AreaChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── ChartTooltip.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── RadialChart.tsx
│   │   │   └── chartUtils.ts
│   │   ├── foundation/
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── HoverCard.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── ThemeRoot.tsx
│   │   │   └── Input.tsx
│   │   ├── forms/
│   │   │   ├── Choices.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── FormBuilder.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── UploadArea.tsx
│   │   │   └── formUtils.ts
│   │   ├── navigation/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── FileTree.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   └── media/
│   │       ├── Carousel.tsx
│   │       ├── HeroSlider.tsx
│   │       └── ImageHeroCard.tsx
│   ├── demo.tsx
│   ├── demo.css
│   ├── index.ts
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── vite.config.ts
```

## Peran File Penting

- `src/components/`: tempat semua komponen reusable, dipisah berdasarkan fungsi UI.
- `src/components/foundation/`: komponen dasar seperti button, card, dan input.
- `src/components/forms/`: komponen form seperti input, textarea, checkbox, radio, switch, date picker, select, multi select, dan upload area.
- `src/components/charts/`: komponen grafik dan utility khusus chart.
- `src/components/data/`: komponen tabel, data grid, dan komponen data terstruktur.
- `src/components/navigation/`: komponen navigasi seperti header, tree, explorer, dan menu bertingkat.
- `src/components/media/`: komponen media seperti carousel dan galeri.
- `src/index.ts`: public API package. Semua komponen yang ingin dipakai user harus diexport dari sini.
- `src/styles.css`: style utama komponen yang ikut dibundle menjadi `dist/styles.css`.
- `src/demo.tsx`: halaman demo lokal untuk preview komponen.
- `src/demo.css`: style khusus demo, tidak dianggap sebagai API utama package.
- `vite.config.ts`: konfigurasi build library ESM/CJS dan type declaration.
- `dist/`: output build. Jangan edit manual file di folder ini.

## Komponen Saat Ini

- `Button`: tombol dengan variant `primary`, `secondary`, dan `ghost`.
- `Card`: wrapper konten sederhana.
- `HoverCard`: card profil/promo dengan avatar, handle, deskripsi, dan statistik.
- `SectionHeading`: heading section reusable dengan posisi left/center/right, shortcut eyebrow/title/description, dan konfigurasi style per line.
- `Chip`: label kecil untuk status, kategori, atau penanda visual.
- `ThemeRoot`: wrapper theme global untuk token warna, radius, shadow, dan mode light/dark.
- `Input`: field teks dengan label, helper text, error, required, prefix/suffix, dan type text/search/url/tel/email/password.
- `InputNumber`: field angka dengan min, max, step, increment/decrement, optional format number, dan error state.
- `InputEmail`: field email dengan validasi native format email, helper text, dan error state.
- `InputPassword`: field password dengan tombol show/hide password, icon eye/eye off, helper text, dan strength indicator.
- `TextArea`: textarea dengan auto resize, character counter, max length, helper text, dan error state.
- `Checkbox`: single checkbox dengan label, description, helper text, disabled, required, dan error state.
- `CheckboxGroup`: group checkbox multi-select dengan layout horizontal/vertical dan controlled/uncontrolled value.
- `RadioGroup`: group radio dengan layout horizontal/vertical, disabled state, dan controlled/uncontrolled value.
- `Switch`: toggle on/off dengan label, description, disabled, required, dan error state.
- `DatePicker`: input tanggal dengan popup calendar, manual input, min/max date, disabledDate, dan clear value.
- `Select`: single select local atau remote endpoint, searchable, clearable, loading/error state, dan load more pagination sederhana.
- `MultiSelect`: multiple select local atau remote endpoint, searchable, removable selected item, clear all, dan load more pagination sederhana.
- `UploadArea`: upload drag/drop dan click upload dengan preview file/image, multiple files, file size/type validation, remove file, dan upload progress.
- `FormBuilder`: form generator berbasis `FormFieldConfig<TValues>[]` dengan row grouping, default/controlled values, submit/reset, async select, OTP, range, rating, date range, dan upload.
- `Carousel`: galeri responsif dengan arrows, dots, thumbnails, keyboard, swipe, controlled/uncontrolled state, dan autoplay opsional.
- `HeroSlider`: slider hero promosi berbasis `SlideData[]` dengan image background, tagline, badge, discount badge, title, subtitle, description, CTA redirect, arrows, dots, keyboard, swipe, dan autoplay opsional.
- `ImageHeroCard`: kartu hero gambar untuk venue, event, produk, atau promo dengan overlay, badge, title, dan metadata.
- `Header`: navbar responsif dengan brand, nav item, search, action icon, login/register, dan profile menu saat sudah login.
- `Navbar`: navigation bar primitive dengan compound component `Navbar.Header`, `Navbar.Brand`, `Navbar.Section`, dan `Navbar.Spacer`.
- `AppLayout`: admin app shell dengan slot `navbar`, `sidebar`, `aside`, content area, overlay mobile, dan trigger `AppLayout.MenuToggle` / `AppLayout.AsideTrigger`.
- `Sidebar`: app shell/sidebar responsif dengan brand, menu bertingkat, footer action, sheet mobile, dan toggle hide/show.
- `BottomNavigation`: bottom dock responsif dengan item icon, label opsional, active state berbentuk tombol plus, dan dukungan href/url atau onClick.
- `FileTree`: tree navigasi/file explorer dengan expand/collapse, selection, dan anak node bertingkat.
- `DataGrid`: tabel data responsif dengan sorting, pagination, local data, dan mode fetch API.
- `AreaChart`: grafik area SVG custom.
- `BarChart`: grafik bar SVG custom.
- `ChartTooltip`: UI tooltip statis/reusable untuk chart.
- `LineChart`: grafik garis SVG custom.
- `PieChart`: grafik pie SVG custom.
- `RadarChart`: grafik radar SVG custom.
- `RadialChart`: grafik radial/progress ring SVG custom.

## Aturan Membuat Komponen Baru

1. Buat file komponen di group yang sesuai, misalnya `src/components/foundation/NamaKomponen.tsx`, `src/components/charts/NamaChart.tsx`, `src/components/data/NamaKomponen.tsx`, atau `src/components/media/NamaKomponen.tsx`.
2. Export props interface/type dari file komponen.
3. Tambahkan class CSS dengan prefix `rpc-` di `src/styles.css`.
4. Export komponen dan props dari `src/index.ts`.
5. Tambahkan contoh penggunaan di `src/demo.tsx` jika perlu preview.
6. Jalankan `npm run typecheck` dan `npm run build`.

Contoh export di `src/index.ts`:

```ts
export { Badge } from "./components/foundation/Badge";
export type { BadgeProps } from "./components/foundation/Badge";
```

## Pola Kode Komponen

- Gunakan function component.
- Gunakan TypeScript props interface.
- Extend atribut HTML bawaan jika komponen membungkus elemen native.
- Jangan hardcode style inline kecuali benar-benar diperlukan.
- Gabungkan `className` dari user dengan class internal.
- Pertahankan aksesibilitas dasar seperti `disabled`, `id`, `name`, `aria-*`, dan event handler native.

Contoh pola:

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ExampleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ExampleButton({ children, className = "", ...props }: ExampleButtonProps) {
  return (
    <button className={["rpc-example-button", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </button>
  );
}
```

## Styling

- Style komponen ada di `src/styles.css`.
- Gunakan prefix class `rpc-` untuk mengurangi risiko bentrok dengan aplikasi pengguna.
- Token global boleh ditaruh di `:root`, contohnya warna, radius, dan shadow.
- Jangan menaruh style demo ke `src/styles.css`; style demo masuk ke `src/demo.css`.

## Aturan Demo dan Dokumentasi

- Halaman demo memakai sidebar, pengelompokan UI, deskripsi, preview, dan tombol `Show code`.
- Data dokumentasi demo berada di `demoGroups` dalam `src/demo.tsx`.
- Setiap komponen visual yang ditampilkan di demo harus punya `title`, `description`, `preview`, dan `code`.
- Jika menambah komponen baru, masukkan ke group yang sesuai atau buat group baru di `demoGroups`.
- Style khusus halaman demo tetap di `src/demo.css`, bukan di `src/styles.css`.

## Aturan Chart

- Chart dibuat dengan SVG dan CSS sendiri, tanpa dependency chart eksternal.
- Tipe data chart dasar ada di `ChartDatum` dari `src/components/charts/chartUtils.ts`.
- Utility hitung koordinat, arc, warna default, dan formatter angka ada di `chartUtils.ts`.
- Komponen chart visual harus tetap menerima `className`, `ariaLabel`, dan props ukuran jika relevan.
- Warna dinamis boleh diberikan dari prop data `color`, tetapi styling umum tetap di `src/styles.css`.
- Jika menambah chart baru, export komponen dan props dari `src/index.ts`, lalu tambahkan contoh di `src/demo.tsx`.

## Aturan Data Grid

- `DataGrid` harus mendukung dua mode utama: local `data` dan API mode lewat `endpoint` atau `fetchData`.
- `endpoint` boleh berupa string URL atau object `DataGridEndpointConfig` dengan `url`, `dataPath`, `totalPath`, `queryParams`, `headers`, `auth`, `method`, dan optional `body`.
- Struktur response API dibaca lewat dot path, misalnya `data.items` untuk rows dan `data.total` atau `meta.total` untuk total.
- Auth API harus didukung lewat `auth` dengan tipe `bearer`, `basic`, `apiKey`, atau `custom` headers.
- Search, filter, dan column visibility harus bekerja untuk local data dan ikut terkirim dalam `DataGridQuery` untuk API mode.
- Filter memakai prop `filters`; setiap filter punya `id`, `label`, optional `accessorKey`, dan `options`.
- Filter UI bersifat multi-select; `DataGridQuery.filters` berbentuk `Record<string, string[]>`.
- `queryParams` boleh mengembalikan array value agar filter bisa dikirim sebagai query param berulang.
- Column show/hide memakai `columnVisibility`, `defaultVisibleColumns`, `visibleColumns`, dan `onVisibleColumnsChange`.
- Pagination default harus tetap ada, dengan `pageSize`, `pageSizeOptions`, dan footer status halaman.
- Sorting harus bekerja lewat `allowsSorting`, `accessorKey`, atau fallback ke `column.id` bila masuk akal.
- Kolom boleh memakai `header` sebagai string atau function yang menerima konteks sort.
- Sel status atau kategori boleh memakai `Chip`, tetapi `Chip` tetap komponen terpisah yang juga diexport.
- `DataGrid` mendukung tampilan `tone="dark"` seperti payment table, serta `tone="light"` untuk mode terang.
- Selection checkbox diaktifkan dengan `selectable`; jaga agar klik checkbox tidak memicu `onRowClick`.
- Row action menu memakai prop `actions`, dengan setiap action punya `id`, `name`, optional `icon`, optional `color`, dan `onClick`.
- Responsive card mode diatur lewat `mobileMode`, `cardBreakpoint`, dan optional `renderCard`.
- Default card mode harus bisa menyesuaikan field kolom tabel; custom card bisa dibuat dengan `renderCard`.
- Data grid harus responsif: tabel boleh scroll horizontal di layar kecil, tetapi wrapper dan footer tetap rapi.
- Jika menambah fitur API baru, update contoh local dan contoh API di `src/demo.tsx`.

## Aturan Carousel

- `Carousel` harus tetap responsif dan tidak bergantung pada library eksternal.
- Item carousel mendukung `imageSrc`, `thumbnailSrc`, `content`, dan `thumbnailContent` supaya bisa dipakai untuk produk, banner, atau konten custom.
- Pertahankan dukungan arrows, dots, thumbnails, keyboard navigation, pointer swipe, controlled/uncontrolled state, dan autoplay opsional.
- Jika mengubah API carousel, update type `CarouselItem` dan `CarouselProps`, lalu update contoh di `src/demo.tsx`.
- Jangan hardcode gambar demo ke komponen; gambar hanya contoh pemakaian di demo atau dari data user.

## Aturan Hero Slider

- `HeroSlider` berada di `src/components/media/HeroSlider.tsx` dan dipakai untuk banner/hero promosi dengan data JSON `SlideData[]`.
- `SlideData` wajib mendukung `id`, `image`, `badge`, `title`, `subtitle`, `description`, `tagline`, `ctaText`, dan optional `discountBadge`, `endpoint`, `targetPage`, serta `targetParams`.
- CTA redirect memakai prioritas `endpoint`; jika tidak ada, gunakan `targetPage` + query string dari `targetParams`.
- Komponen harus menyediakan `onNavigate` supaya aplikasi pengguna bisa integrasi router sendiri tanpa dipaksa memakai `window.location`.
- Pertahankan dukungan arrows, dots, keyboard arrow navigation, pointer swipe, controlled/uncontrolled `activeIndex`, dan autoplay opsional.
- Style utama tetap di `src/styles.css` dengan prefix `rpc-hero-slider`; gambar hanya berasal dari props/demo data.
- Jika mengubah API `HeroSlider`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan Image Hero Card

- `ImageHeroCard` dipakai untuk hero visual venue, event, produk, hotel, atau konten promosi.
- Komponen harus menerima `imageSrc`, `imageAlt`, `badge`, `title`, dan `meta` agar tetap reusable.
- Overlay, radius, typography, dan metadata harus tetap responsif.
- Jangan hardcode gambar di komponen; gambar hanya datang dari props atau data demo.

## Aturan Theme Root

- `ThemeRoot` dipakai sebagai wrapper theme global untuk mengatur warna utama, warna sekunder, surface, border, text, radius, shadow, dan mode light/dark.
- Project pengguna boleh override token lewat CSS `:root` atau lewat prop `ThemeRoot`.
- Jika mengubah token global, pastikan komponen lain tetap memakai variabel CSS, bukan hardcoded color.
- Jika mengubah API `ThemeRoot`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan Section Heading

- `SectionHeading` berada di `src/components/foundation/SectionHeading.tsx` dan dipakai untuk judul section, heading kategori, atau intro konten.
- Komponen harus mendukung `align="left" | "center" | "right"` dan tetap responsif di layar kecil.
- Shortcut `eyebrow`, `title`, dan `description` boleh dipakai untuk kebutuhan umum seperti heading landing page.
- Untuk kebutuhan custom, gunakan prop `lines`; setiap line harus bisa mengatur `as`, `content`, `color`, `fontSize`, `fontWeight`, `fontStyle`, `fontFamily`, `letterSpacing`, `lineHeight`, `textTransform`, `className`, dan `style`.
- Style utama tetap di `src/styles.css` dengan prefix `rpc-section-heading`; style contoh khusus demo tetap di `src/demo.css`.
- Jika mengubah API `SectionHeading`, update export di `src/index.ts`, style di `src/styles.css`, contoh di `src/demo.tsx`, dan dokumentasi ini.

## Aturan Group Komponen

- Pertahankan pengelompokan berdasarkan fungsi UI:
- `foundation`: komponen dasar dan primitive UI.
- `forms`: komponen input dan kontrol form yang reusable.
- `charts`: semua komponen visualisasi data dan helper khusus chart.
- `data`: tabel, grid, list, atau komponen data terstruktur.
- `navigation`: tree, explorer, sidebar item, atau komponen navigasi bertingkat.
- `media`: carousel, galeri, viewer, atau komponen display media.
- Jika komponen baru tidak cocok dengan group yang ada, buat group baru yang jelas namanya, lalu update struktur di dokumen ini.
- Jangan membuat cross-import antar group kecuali memang berupa public composition. Utility spesifik group tetap berada di group tersebut.
- Public import untuk user tetap lewat `src/index.ts`; jangan minta user import langsung dari path internal group.

## Aturan Hover Card

- `HoverCard` dipakai untuk profile snippet, promo card, atau highlight konten yang terasa interaktif saat hover.
- Default tampilannya gelap, rounded, dan responsif.
- Komponen boleh menerima avatar custom, avatar image, handle, deskripsi, stats, dan konten tambahan.
- Jika prop `isOpen` dikirim, `children` dipakai sebagai trigger/content luar dan panel card hanya tampil saat `isOpen` bernilai `true`.

## Aturan File Tree

- `FileTree` dipakai untuk struktur folder, daftar file, atau navigasi bertingkat.
- Node tree harus mendukung expand/collapse, selection, dan children recursive.
- Tampilan default harus responsif dan tetap terbaca di layar kecil.
- Jika mengubah API `FileTree`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan Header

- `Header` dipakai untuk navigasi utama aplikasi dengan brand, nav item, search, action icon, dan auth area.
- Jika `isAuthenticated` bernilai `false`, tampilkan login/register; jika `true`, tampilkan profile menu.
- Komponen harus fleksibel lewat props `brand`, `navItems`, `search`, `actions`, `profile`, `profileMenuItems`, dan token style seperti warna, tinggi, dan max width.
- Header harus responsif: desktop tampil horizontal, mobile punya menu toggle.
- Jika mengubah API `Header`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan Sidebar

- `Sidebar` dipakai untuk app shell dengan brand, menu utama, nested menu, badge, footer actions, dan area content.
- `Sidebar.Trigger` boleh dipakai di dalam `AppLayout` untuk toggle sidebar lewat context layout.
- `Sidebar.Mobile` dipakai sebagai wrapper konten sidebar khusus mobile saat sidebar dirender sebagai slot di `AppLayout`.
- Saat memakai `Sidebar` di slot `AppLayout.sidebar`, gunakan `variant="navigation"` supaya `Sidebar` hanya merender panel navigasi, bukan app shell penuh dengan area content.
- Sidebar harus mendukung hide/show atau collapsed state lewat `collapsed`, `defaultCollapsed`, dan `onCollapsedChange`.
- Sidebar harus bisa diberi tinggi tetap lewat `height`; jika konten panjang, scroll hanya terjadi di `nav` sidebar dan content body, bukan membuat panel sidebar ikut memanjang.
- Toggle sidebar harus tetap bisa diakses dari content header; mobile memakai sheet sidebar dengan overlay.
- Semua warna default Sidebar harus mengikuti token `ThemeRoot` / CSS variable `--rpc-color-*`.
- Jika mengubah API `Sidebar`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan App Layout dan Navbar

- `AppLayout` berada di `src/components/navigation/AppLayout.tsx` dan dipakai untuk admin shell dengan slot `navbar`, `sidebar`, `aside`, dan `children`.
- `AppLayout` harus mendukung controlled/uncontrolled state untuk sidebar dan aside lewat `sidebarOpen`, `defaultSidebarOpen`, `onSidebarOpenChange`, `asideOpen`, `defaultAsideOpen`, dan `onAsideOpenChange`. Sidebar default terbuka jika slot `sidebar` tersedia, dan toggle harus benar-benar menutup kolom sidebar di desktop.
- `navbar` di `AppLayout` dirender di area workspace/content, bukan di atas sidebar. Header/brand kiri sebaiknya dipasang di `Sidebar` melalui prop `brand`, `brandIcon`, atau header milik sidebar.
- `AppLayout.MenuToggle` atau `Sidebar.Trigger` membuka/menutup sidebar melalui context layout. `AppLayout.AsideTrigger` membuka/menutup aside/details panel melalui context layout.
- `Navbar` berada di `src/components/navigation/Navbar.tsx` dan dipakai sebagai primitive header ringan. Compound component yang tersedia: `Navbar.Header`, `Navbar.Brand`, `Navbar.Section`, dan `Navbar.Spacer`.
- `Navbar maxWidth="full"` dipakai ketika navbar harus memenuhi lebar app shell. Pilihan maxWidth lain: `sm`, `md`, `lg`, dan `xl`.
- Style `AppLayout` dan `Navbar` harus memakai prefix `rpc-` dan mengikuti token `ThemeRoot`.
- Contoh penggunaan:

```tsx
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
    <>
      <Sidebar
        brand="ava-admin"
        items={items}
        showCollapseToggle={false}
        variant="navigation"
      />
      <Sidebar.Mobile>{/* mobile sidebar */}</Sidebar.Mobile>
    </>
  }
>
  {children}
</AppLayout>
```
- Jika mengubah API `AppLayout` atau `Navbar`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Aturan Form Components

- Komponen form berada di `src/components/forms/`, kecuali `src/components/foundation/Input.tsx` tetap menjadi re-export untuk menjaga kompatibilitas import lama.
- Semua komponen form harus export props interface/type dan public export dari `src/index.ts`.
- Semua style form memakai prefix `rpc-` di `src/styles.css` dan wajib mengikuti token `ThemeRoot` seperti `--rpc-color-primary`, `--rpc-color-surface`, `--rpc-color-border`, `--rpc-color-text`, dan `--rpc-color-muted`.
- Semua field visual harus mendukung `label`, `helperText`, `error`, `disabled`, `required`, dan `fullWidth` jika relevan.
- Komponen harus tetap kompatibel dengan React Hook Form/Formik dengan menerima prop native seperti `name`, `value`, `defaultValue`, `onChange`, `onBlur`, dan `ref` jika membungkus elemen input native.
- Untuk React Hook Form controlled component, gunakan pattern `Controller`:

```tsx
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
```

- `Select` dan `MultiSelect` mendukung `options` untuk data local dan `endpoint` untuk remote API. Endpoint boleh string URL atau object `SelectEndpointConfig` dengan `url`, `dataPath`, `searchParam`, `pageParam`, `limitParam`, `pageSize`, `queryParams`, `headers`, dan `mapOption`.
- Default mapping remote select membaca `value`, `id`, `key`, atau `slug` sebagai value dan `label`, `name`, `title`, atau value sebagai label. Untuk response custom gunakan `mapOption`.
- `DatePicker` harus membuka kalender saat field/focus atau tombol calendar diklik, tetap mengizinkan manual input, dan mendukung `minDate`, `maxDate`, serta `disabledDate`.
- `UploadArea` harus mendukung drag/drop, click upload, preview file/image, multiple file, validasi `accept` dan `maxFileSize`, remove file, serta `progress`.
- `FormBuilder` dipakai saat user ingin membuat form langsung dari config array. Config utama adalah `FormFieldConfig<TValues>[]` dengan `kind`, `name`, `label`, optional `row`, optional `options`, optional `loadOptions`, dan optional `props`.
- `FormBuilder` harus mendukung kind `text`, `textarea`, `otp`, `checkbox`, `switch`, `radio`, `range`, `rating`, `color`, `date`, `time`, `date-range`, `select`, `datetime`, dan `file`.
- `row` pada `FormFieldConfig` dipakai untuk mengelompokkan beberapa field dalam satu baris responsif. Field tanpa `row` tampil sebagai row penuh sendiri.
- `props.hint` pada `FormFieldConfig` dipetakan ke helper text. `props.inputClassName` dipakai untuk override class input internal tanpa mengganti wrapper field.
- `Select` dan `MultiSelect` juga boleh menerima `loadOptions(query, page)` untuk async search dari route handler/API selain `endpoint`.
- Contoh FormBuilder:

```tsx
interface FormValues extends Record<string, unknown> {
  fullName: string;
  email: string;
  skills: string[];
}

const formFields: FormFieldConfig<FormValues>[] = [
  {
    kind: "text",
    name: "fullName",
    label: "Full name",
    row: "identity",
    props: {
      placeholder: "Nama lengkap",
      required: true
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
    kind: "select",
    name: "skills",
    label: "Skills",
    loadOptions: searchSkills,
    props: {
      multiple: true,
      searchable: true
    }
  }
];

<FormBuilder<FormValues>
  fields={formFields}
  onSubmit={(values) => console.log(values)}
/>;
```
- Tambahkan demo setiap komponen form ke group `Forms UI` di `src/demo.tsx` dengan title, description, preview, dan Show code.

## Aturan Bottom Navigation

- `BottomNavigation` dipakai untuk navigasi bawah aplikasi, terutama mobile atau app shell.
- Item mendukung `name`, `href` atau `url`, `icon`, `activeIcon`, `onClick`, dan state `disabled`.
- Item aktif tampil sebagai tombol plus yang menonjol; item lain bisa tetap menampilkan icon dan label opsional.
- Komponen harus responsif dan mendukung mode inline maupun fixed bila diperlukan.
- Jika mengubah API `BottomNavigation`, update export di `src/index.ts`, style di `src/styles.css`, dan contoh di `src/demo.tsx`.

## Command Utama

Gunakan Node 18+ atau Node 20.

```bash
nvm use 20
npm install
npm run dev
npm run typecheck
npm run build
```

Fungsi command:

- `npm run dev`: menjalankan demo lokal dengan Vite.
- `npm run typecheck`: cek TypeScript tanpa emit file.
- `npm run build`: build package ke folder `dist`.
- `npm run preview`: preview hasil Vite.

## Build dan Output

Build menghasilkan:

```text
dist/index.js
dist/index.cjs
dist/index.d.ts
dist/styles.css
```

Package export dikontrol dari `package.json`:

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

## Publish ke npm

Sebelum publish:

1. Pastikan `package.json` punya nama package final.
2. Naikkan `version`.
3. Jalankan `npm run typecheck`.
4. Jalankan `npm run build`.
5. Jalankan `npm publish`.

Jika package memakai scope, contoh `@username/ava-ui`, biarkan:

```json
"publishConfig": {
  "access": "public"
}
```

## Larangan

- Jangan edit manual file di `dist/`; ubah source di `src/`, lalu build ulang.
- Jangan memasukkan `react` dan `react-dom` ke `dependencies`; keduanya harus tetap di `peerDependencies`.
- Jangan mengubah public export tanpa mempertimbangkan breaking change.
- Jangan menambahkan dependency besar tanpa kebutuhan jelas.
- Jangan menambahkan library chart eksternal untuk komponen grafik dasar; gunakan SVG/CSS internal.
- Jangan menghapus `className`, event handler, atau atribut native dari props komponen.

## Checklist Sebelum Selesai

```bash
npm run typecheck
npm run build
```

Pastikan juga komponen baru sudah:

- Ada di `src/components`.
- Diletakkan di group fungsi UI yang tepat.
- Diexport dari `src/index.ts`.
- Memiliki type props yang diexport.
- Memiliki style di `src/styles.css` jika perlu.
- Bisa dicoba dari `src/demo.tsx` jika komponen visual.
