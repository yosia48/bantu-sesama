import Link from "next/link";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/lib/mock-data";

export default function Home() {
  const featuredCampaigns = mockCampaigns.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Mempertemukan Kebaikan
            <br />
            dengan yang Membutuhkan
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Platform bantuan transparan untuk Indonesia. Donasi langsung ke
            penerima, tanpa perantara. Setiap rupiah sampai ke yang berhak.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaigns"
              className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors text-lg"
            >
              Lihat Campaign
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              Ajukan Bantuan
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-sky-600">
                {mockCampaigns.length}
              </p>
              <p className="text-gray-500 text-sm mt-1">Campaign Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">100%</p>
              <p className="text-gray-500 text-sm mt-1">Donasi Langsung</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">Rp 0</p>
              <p className="text-gray-500 text-sm mt-1">Biaya Platform</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">Transparan</p>
              <p className="text-gray-500 text-sm mt-1">Dokumentasi Terbuka</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                icon: "📝",
                title: "Pengajuan",
                desc: "Ajukan campaign dengan cerita dan dokumen pendukung",
              },
              {
                step: "2",
                icon: "🔍",
                title: "Review",
                desc: "Tim admin melakukan verifikasi dasar",
              },
              {
                step: "3",
                icon: "📢",
                title: "Publish",
                desc: "Campaign dipublikasikan dengan badge transparansi",
              },
              {
                step: "4",
                icon: "💳",
                title: "Donasi",
                desc: "Donatur transfer langsung ke rekening penerima",
              },
              {
                step: "5",
                icon: "📊",
                title: "Update",
                desc: "Penerima memberikan update berkala",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-sky-500 mb-1">
                  LANGKAH {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Campaign Terbaru</h2>
            <Link
              href="/campaigns"
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Prinsip Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔍",
                title: "Transparansi",
                desc: "Cerita nyata, bukti, timeline, dan update berkala dari setiap campaign.",
              },
              {
                icon: "💳",
                title: "Donasi Langsung",
                desc: "Donasi langsung ke rekening atau QRIS penerima. Tanpa perantara.",
              },
              {
                icon: "🤝",
                title: "Human-Friendly",
                desc: "Tanpa wawancara panjang, tanpa verifikasi rumit. Mudah digunakan.",
              },
              {
                icon: "📋",
                title: "Open Documentation",
                desc: "Update nyata, bukti perkembangan, transparansi publik.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anti Scam */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">🛡️ Pendekatan Anti-Scam</h2>
          <p className="text-gray-600 mb-8">
            Kami tidak menjamin 100%, tapi kami berusaha maksimal untuk
            melindungi donatur dan penerima.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "✅", label: "Verifikasi Dasar" },
              { icon: "🔎", label: "Deteksi Duplikat" },
              { icon: "👥", label: "Review Manual" },
              { icon: "🚨", label: "Sistem Laporan" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-gray-700">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 gradient-hero text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Membantu Sesama?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Setiap bantuan sekecil apapun sangat berarti. Mari bersama-sama
            memberi harapan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaigns"
              className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
            >
              Donasi Sekarang
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Butuh Bantuan?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
