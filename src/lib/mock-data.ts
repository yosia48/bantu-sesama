import { Campaign } from "@/types/campaign";

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Bantu Biaya Operasi Anak Ibu Siti",
    story:
      "Ibu Siti adalah seorang ibu tunggal yang bekerja sebagai buruh cuci. Anaknya, Adi (7 tahun), membutuhkan operasi jantung yang mendesak. Biaya operasi sangat besar dan Ibu Siti tidak mampu menanggungnya sendiri. Adi adalah anak yang ceria dan bersemangat, namun kondisi jantungnya membuatnya sering kelelahan. Dokter menyarankan operasi segera dilakukan untuk menyelamatkan nyawanya.",
    category: "Kesehatan",
    location: "Jakarta Timur",
    targetAmount: 50000000,
    recipientName: "Siti Aminah",
    recipientBank: "BCA",
    recipientAccount: "******7890",
    recipientQris: "/qris-sample.png",
    paymentLink: "https://example.com/pay/siti",
    badges: ["docs_available", "verified", "active_update", "active_campaign"],
    status: "approved",
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-05-05T00:00:00Z",
    updates: [
      {
        id: "u1",
        date: "2026-05-05",
        title: "Update: Jadwal Operasi Sudah Ditentukan",
        description:
          "Alhamdulillah, jadwal operasi sudah ditentukan untuk tanggal 15 Mei 2026. Terima kasih untuk semua donatur yang sudah membantu.",
      },
      {
        id: "u2",
        date: "2026-04-20",
        title: "Update: Pemeriksaan Lanjutan",
        description:
          "Adi sudah menjalani pemeriksaan lanjutan di RS Harapan Kita. Dokter mengatakan kondisinya stabil dan siap untuk operasi.",
      },
    ],
  },
  {
    id: "2",
    title: "Renovasi Rumah Pak Budi yang Hampir Roboh",
    story:
      "Pak Budi (65 tahun) tinggal sendirian di rumah warisan orang tuanya yang sudah sangat rusak. Atap bocor di mana-mana, dinding retak, dan lantai sudah tidak rata. Saat musim hujan, Pak Budi harus mengungsi ke tetangga karena rumahnya kebanjiran. Beliau tidak memiliki penghasilan tetap dan hanya mengandalkan kebaikan tetangga.",
    category: "Tempat Tinggal",
    location: "Bandung",
    targetAmount: 30000000,
    recipientName: "Budi Santoso",
    recipientBank: "BRI",
    recipientAccount: "******4321",
    badges: ["docs_available", "active_campaign"],
    status: "approved",
    createdAt: "2026-04-15T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
    updates: [
      {
        id: "u3",
        date: "2026-05-01",
        title: "Survei Lokasi Selesai",
        description:
          "Tim relawan sudah melakukan survei lokasi. Estimasi biaya renovasi sekitar Rp 30 juta untuk perbaikan atap, dinding, dan lantai.",
      },
    ],
  },
  {
    id: "3",
    title: "Beasiswa Pendidikan untuk Adik Rahma",
    story:
      "Rahma (16 tahun) adalah siswi berprestasi di SMA Negeri 1 yang terancam putus sekolah karena kedua orang tuanya meninggal dalam kecelakaan. Saat ini ia tinggal bersama neneknya yang sudah tua. Rahma bermimpi menjadi dokter untuk membantu orang-orang di desanya. Nilai akademiknya selalu di peringkat 3 besar.",
    category: "Pendidikan",
    location: "Yogyakarta",
    targetAmount: 15000000,
    recipientName: "Rahma Putri",
    recipientBank: "Mandiri",
    recipientAccount: "******4455",
    paymentLink: "https://example.com/pay/rahma",
    badges: ["docs_available", "verified", "active_update", "active_campaign"],
    status: "approved",
    createdAt: "2026-03-20T00:00:00Z",
    updatedAt: "2026-05-03T00:00:00Z",
    updates: [
      {
        id: "u4",
        date: "2026-05-03",
        title: "Rahma Raih Juara 2 Olimpiade Sains",
        description:
          "Kabar bahagia! Rahma berhasil meraih Juara 2 di Olimpiade Sains Tingkat Provinsi. Prestasinya luar biasa meski dalam kondisi yang sulit.",
      },
      {
        id: "u5",
        date: "2026-04-15",
        title: "Pembayaran SPP Semester Ini",
        description:
          "SPP semester ini sudah terbayar dari dana donasi. Rahma bisa melanjutkan sekolahnya dengan tenang.",
      },
    ],
  },
  {
    id: "4",
    title: "Bantu Korban Banjir Desa Sukamaju",
    story:
      "Banjir besar melanda Desa Sukamaju pada tanggal 25 April 2026. Lebih dari 50 keluarga kehilangan tempat tinggal dan harta benda mereka. Saat ini mereka mengungsi di balai desa dengan kondisi yang sangat memprihatinkan. Mereka membutuhkan bantuan untuk kebutuhan pokok, pakaian, dan perbaikan rumah.",
    category: "Bencana",
    location: "Karawang",
    targetAmount: 100000000,
    recipientName: "Panitia Bencana Desa Sukamaju",
    recipientBank: "BNI",
    recipientAccount: "******8899",
    recipientQris: "/qris-sample.png",
    badges: ["docs_available", "verified", "active_update", "active_campaign"],
    status: "approved",
    createdAt: "2026-04-26T00:00:00Z",
    updatedAt: "2026-05-06T00:00:00Z",
    updates: [
      {
        id: "u6",
        date: "2026-05-06",
        title: "Distribusi Bantuan Tahap 2",
        description:
          "Bantuan tahap 2 sudah didistribusikan. 50 paket sembako dan 30 set pakaian sudah diterima oleh warga.",
      },
    ],
  },
  {
    id: "5",
    title: "Modal Usaha Ibu-Ibu PKK Desa Harapan",
    story:
      "Ibu-ibu PKK Desa Harapan ingin memulai usaha keripik singkong untuk meningkatkan pendapatan keluarga. Mereka sudah memiliki keahlian membuat keripik yang enak, namun kekurangan modal untuk membeli peralatan dan bahan baku. Dengan bantuan ini, 20 keluarga bisa memiliki penghasilan tambahan.",
    category: "Ekonomi",
    location: "Malang",
    targetAmount: 10000000,
    recipientName: "PKK Desa Harapan",
    recipientBank: "BCA",
    recipientAccount: "******9900",
    badges: ["active_campaign"],
    status: "approved",
    createdAt: "2026-05-01T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
    updates: [],
  },
];

export const pendingCampaigns: Campaign[] = [
  {
    id: "p1",
    title: "Bantuan Biaya Cuci Darah Pak Ahmad",
    story:
      "Pak Ahmad membutuhkan cuci darah rutin 2x seminggu. Biaya per sesi sangat memberatkan keluarga.",
    category: "Kesehatan",
    location: "Surabaya",
    targetAmount: 25000000,
    recipientName: "Ahmad Fauzi",
    recipientBank: "BRI",
    recipientAccount: "******9876",
    badges: [],
    status: "pending",
    createdAt: "2026-05-07T00:00:00Z",
    updatedAt: "2026-05-07T00:00:00Z",
    updates: [],
  },
];
