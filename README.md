# ava-ui

`ava-ui` adalah library komponen React reusable yang bisa dipakai di project lain lewat npm.

## Install

```bash
npm install ava-ui
```

Kalau pakai langsung dari GitHub, gunakan:

```bash
npm install git+https://github.com/295fajarsetiawan/ava-ui.git
```

## Cara Pakai

```tsx
import { Button, Card, Input } from "ava-ui";
import "ava-ui/styles.css";

export function App() {
  return (
    <Card>
      <Input label="Nama" name="name" />
      <Button>Kirim</Button>
    </Card>
  );
}
```

Kalau kamu render dari Next.js Server Component, pakai komponen yang server-safe dari `ava-ui/server`.

```tsx
import { Card, SectionHeading } from "ava-ui/server";
```

Komponen interaktif seperti `Header`, `Select`, `DataGrid`, `Modal`, `Sidebar`, dan `Carousel` tetap dipakai di Client Component lewat `ava-ui`.

Dokumentasi penggunaan semua komponen tersedia di [docs/components.md](docs/components.md).

## Development

```bash
npm install
npm run dev
```

## Demo Deploy

Demo lokal dibangun dari `src/demo.tsx`. Untuk deploy ke GitHub Pages:

```bash
npm run build:demo
```

GitHub Actions akan otomatis membangun demo dan push hasilnya ke branch `gh-pages`.
Setelah GitHub Pages di repo settings diaktifkan ke branch `gh-pages`, demo akan tersedia di:

```text
https://295fajarsetiawan.github.io/ava-ui/
```

## Build

```bash
npm run typecheck
npm run build
```

Build output ada di folder `dist`.

## Publish

```bash
npm login
npm run build
npm publish
```

## Catatan

- React dan React DOM harus tetap sebagai `peerDependencies`.
- Style utama dibundle lewat `ava-ui/styles.css`.
- Public export ada di `src/index.ts`.
- Saat package di-install dari GitHub, `dist/` sudah ikut di repo jadi langsung bisa dipakai.
