# 🤝 BantuSesama

Platform bantuan transparan yang mempertemukan orang baik dengan yang membutuhkan. Dibuat untuk Indonesia.

## Tentang

BantuSesama adalah platform crowdfunding sosial yang berfokus pada:
- **Transparansi** - Cerita nyata, bukti, timeline, dan update berkala
- **Donasi Langsung** - Transfer langsung ke rekening/QRIS penerima, tanpa perantara
- **Human-Friendly** - Tanpa wawancara panjang, tanpa verifikasi rumit
- **Open Documentation** - Update nyata dan bukti perkembangan
- **Anti-Scam** - Verifikasi dasar, deteksi duplikat, review manual, sistem laporan

> Platform ini **tidak menyimpan dana donasi**. Semua donasi langsung ke penerima.

## Teknologi

| Layer | Teknologi | Biaya |
|-------|-----------|-------|
| Frontend | Next.js + Tailwind CSS | Free |
| Hosting | Cloudflare Pages | Free |
| Backend API | Cloudflare Workers | Free (100K req/hari) |
| Database | Cloudflare D1 | Free (5GB) |
| Storage | Cloudflare R2 | Free (10GB) |

**Total biaya: Rp 0 / bulan** (dalam free tier Cloudflare)

## Fitur

- Landing page dengan informasi platform
- Daftar campaign dengan filter dan pencarian
- Detail campaign dengan info donasi langsung
- Form pengajuan campaign baru
- Admin dashboard untuk review campaign
- Sistem badge transparansi
- Perlindungan privasi data sensitif
- API RESTful untuk integrasi

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy ke Cloudflare (100% Gratis)

### 1. Cloudflare Pages (Frontend)

```bash
# Login ke Cloudflare
npx wrangler login

# Build dan deploy
npm run build
npx wrangler pages deploy .next --project-name=bantu-sesama
```

Atau hubungkan GitHub repo di [Cloudflare Dashboard](https://dash.cloudflare.com):
1. Pages → Create a project → Connect to Git
2. Pilih repository ini
3. Build command: `npm run build`
4. Build output directory: `.next`

### 2. Cloudflare D1 (Database)

```bash
# Buat database
npx wrangler d1 create bantu-sesama-db

# Update database_id di wrangler.toml

# Jalankan schema
npx wrangler d1 execute bantu-sesama-db --file=./schema.sql
```

### 3. Cloudflare Workers (API)

```bash
# Deploy worker
npx wrangler deploy
```

## Struktur Project

```
bantu-sesama/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── campaigns/        # Campaign listing
│   │   ├── campaign/[id]/    # Campaign detail
│   │   ├── submit/           # Submit campaign form
│   │   ├── admin/            # Admin dashboard
│   │   └── api/              # API routes
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities & mock data
│   └── types/                # TypeScript types
├── worker/                   # Cloudflare Worker API
├── schema.sql                # D1 database schema
├── wrangler.toml             # Cloudflare config
└── README.md
```

## Sistem Badge Transparansi

| Badge | Keterangan |
|-------|------------|
| 📄 Dokumen Tersedia | Campaign memiliki dokumen pendukung |
| ✅ Terverifikasi | Sudah melalui verifikasi dasar |
| 🔄 Update Aktif | Penerima rutin memberikan update |
| 🟢 Campaign Aktif | Campaign masih aktif menerima donasi |

## Privasi & Keamanan

Data yang **TIDAK** ditampilkan:
- NIK
- Alamat lengkap
- Data medis detail
- Saldo / transaksi pribadi

Data yang ditampilkan:
- Nama penerima
- Cerita
- Foto kondisi
- Progress campaign

> *Cukup transparan untuk dipercaya, cukup aman untuk melindungi manusia.*

## Visi

Membangun platform bantuan yang ringan, transparan, dan dapat dipercaya untuk membantu orang di seluruh Indonesia.

## Lisensi

MIT License
