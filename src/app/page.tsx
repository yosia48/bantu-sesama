import Link from "next/link";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const featuredCampaigns = mockCampaigns.slice(0, 3);
  const totalRaised = mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0);

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero hero-pattern text-white py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            Platform Donasi Transparan Indonesia
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Mempertemukan Kebaikan
            <br />
            <span className="text-emerald-300">dengan yang Membutuhkan</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Donasi langsung ke penerima, tanpa perantara.
            Setiap rupiah sampai ke yang berhak menerimanya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaigns"
              className="bg-white text-sky-700 px-8 py-3.5 rounded-xl font-bold hover:bg-sky-50 transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Lihat Campaign
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white/50 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all text-lg backdrop-blur-sm"
            >
              Ajukan Bantuan
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 relative z-20">
        <div className="max-w-4xl mx-auto px-4 -mt-14">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold stat-number">
                  {mockCampaigns.length}
                </p>
                <p className="text-gray-500 text-sm mt-1 font-medium">Campaign Aktif</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold stat-number">100%</p>
                <p className="text-gray-500 text-sm mt-1 font-medium">Donasi Langsung</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold stat-number">Rp 0</p>
                <p className="text-gray-500 text-sm mt-1 font-medium">Biaya Platform</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold stat-number">
                  {formatCurrency(totalRaised).replace('Rp', 'Rp ')}
                </p>
                <p className="text-gray-500 text-sm mt-1 font-medium">Dana Terkumpul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-sky-600 uppercase tracking-wider">Alur Sistem</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Lima langkah sederhana untuk menghubungkan kebaikan dengan yang membutuhkan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "1", icon: "📝", title: "Pengajuan", desc: "Ajukan campaign dengan cerita dan dokumen pendukung", color: "from-sky-50 to-sky-100 border-sky-200" },
              { step: "2", icon: "🔍", title: "Review", desc: "Tim admin melakukan verifikasi dasar", color: "from-purple-50 to-purple-100 border-purple-200" },
              { step: "3", icon: "📢", title: "Publish", desc: "Campaign dipublikasikan dengan badge transparansi", color: "from-emerald-50 to-emerald-100 border-emerald-200" },
              { step: "4", icon: "💳", title: "Donasi", desc: "Donatur transfer langsung ke rekening penerima", color: "from-amber-50 to-amber-100 border-amber-200" },
              { step: "5", icon: "📊", title: "Update", desc: "Penerima memberikan update berkala", color: "from-rose-50 to-rose-100 border-rose-200" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className={`w-18 h-18 bg-gradient-to-br ${item.color} border rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 bg-sky-100 text-sky-700 rounded-full text-xs font-bold mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <span className="text-sm font-bold text-sky-600 uppercase tracking-wider">Campaign Pilihan</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
                Campaign Terbaru
              </h2>
            </div>
            <Link
              href="/campaigns"
              className="group inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold transition-colors"
            >
              Lihat Semua
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold text-sky-600 uppercase tracking-wider">Nilai-Nilai Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
              Prinsip Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔍", title: "Transparansi", desc: "Cerita nyata, bukti, timeline, dan update berkala dari setiap campaign.", gradient: "from-sky-500 to-blue-600" },
              { icon: "💳", title: "Donasi Langsung", desc: "Donasi langsung ke rekening atau QRIS penerima. Tanpa perantara.", gradient: "from-emerald-500 to-green-600" },
              { icon: "🤝", title: "Human-Friendly", desc: "Tanpa wawancara panjang, tanpa verifikasi rumit. Mudah digunakan.", gradient: "from-purple-500 to-violet-600" },
              { icon: "📋", title: "Open Documentation", desc: "Update nyata, bukti perkembangan, transparansi publik.", gradient: "from-amber-500 to-orange-600" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 text-center card-hover group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="drop-shadow-sm">{item.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anti Scam */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-sky-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">🛡️</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Pendekatan Anti-Scam</h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Kami tidak menjamin 100%, tapi kami berusaha maksimal untuk
                melindungi donatur dan penerima.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "✅", label: "Verifikasi Dasar", desc: "Cek data & dokumen", bg: "bg-emerald-50 border-emerald-100" },
                { icon: "🔎", label: "Deteksi Duplikat", desc: "Cegah campaign ganda", bg: "bg-blue-50 border-blue-100" },
                { icon: "👥", label: "Review Manual", desc: "Tim admin review", bg: "bg-purple-50 border-purple-100" },
                { icon: "🚨", label: "Sistem Laporan", desc: "Laporkan kecurigaan", bg: "bg-red-50 border-red-100" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`${item.bg} border p-5 rounded-2xl text-center card-hover`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="font-bold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 gradient-hero hero-pattern text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Siap Membantu Sesama?
          </h2>
          <p className="text-white/80 mb-10 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Setiap bantuan sekecil apapun sangat berarti. Mari bersama-sama
            memberi harapan bagi mereka yang membutuhkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/campaigns"
              className="bg-white text-sky-700 px-8 py-3.5 rounded-xl font-bold hover:bg-sky-50 transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Donasi Sekarang
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white/50 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all text-lg backdrop-blur-sm"
            >
              Butuh Bantuan?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
