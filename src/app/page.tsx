import Link from "next/link";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/lib/mock-data";

export default function Home() {
  const featuredCampaigns = mockCampaigns.slice(0, 3);

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

      {/* Trust Indicators */}
      <section className="py-6 relative z-20">
        <div className="max-w-4xl mx-auto px-4 -mt-14">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Verifikasi Admin", desc: "Setiap campaign direview" },
                { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", label: "Donasi Langsung", desc: "Transfer ke penerima" },
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Data Dilindungi", desc: "Privasi terjaga aman" },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: "Update Berkala", desc: "Transparansi progres" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
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
              { step: "1", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", title: "Pengajuan", desc: "Ajukan campaign dengan cerita dan dokumen pendukung", color: "from-sky-50 to-sky-100 border-sky-200" },
              { step: "2", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "Review", desc: "Tim admin melakukan verifikasi dasar", color: "from-purple-50 to-purple-100 border-purple-200" },
              { step: "3", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", title: "Publish", desc: "Campaign dipublikasikan dengan badge transparansi", color: "from-emerald-50 to-emerald-100 border-emerald-200" },
              { step: "4", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", title: "Donasi", desc: "Donatur transfer langsung ke rekening penerima", color: "from-amber-50 to-amber-100 border-amber-200" },
              { step: "5", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", title: "Update", desc: "Penerima memberikan update berkala", color: "from-rose-50 to-rose-100 border-rose-200" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <svg className="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
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
              { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", title: "Transparansi", desc: "Cerita nyata, bukti, timeline, dan update berkala dari setiap campaign.", gradient: "from-sky-500 to-blue-600" },
              { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", title: "Donasi Langsung", desc: "Donasi langsung ke rekening atau QRIS penerima. Tanpa perantara.", gradient: "from-emerald-500 to-green-600" },
              { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", title: "Human-Friendly", desc: "Tanpa wawancara panjang, tanpa verifikasi rumit. Mudah digunakan.", gradient: "from-purple-500 to-violet-600" },
              { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Open Documentation", desc: "Update nyata, bukti perkembangan, transparansi publik.", gradient: "from-amber-500 to-orange-600" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 text-center card-hover group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
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
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Pendekatan Anti-Scam</h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Kami tidak menjamin 100%, tapi kami berusaha maksimal untuk
                melindungi donatur dan penerima.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Verifikasi Dasar", desc: "Cek data & dokumen", bg: "bg-emerald-50 border-emerald-100", iconColor: "text-emerald-600" },
                { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Deteksi Duplikat", desc: "Cegah campaign ganda", bg: "bg-blue-50 border-blue-100", iconColor: "text-blue-600" },
                { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Review Manual", desc: "Tim admin review", bg: "bg-purple-50 border-purple-100", iconColor: "text-purple-600" },
                { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", label: "Sistem Laporan", desc: "Laporkan kecurigaan", bg: "bg-red-50 border-red-100", iconColor: "text-red-600" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`${item.bg} border p-5 rounded-2xl text-center card-hover`}
                >
                  <div className="flex justify-center mb-3">
                    <svg className={`w-8 h-8 ${item.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                  </div>
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
