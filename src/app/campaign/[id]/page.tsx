import { notFound } from "next/navigation";
import Link from "next/link";
import { mockCampaigns } from "@/lib/mock-data";
import {
  formatCurrency,
  formatDate,
  calculateProgress,
  getCategoryIcon,
} from "@/lib/utils";
import Badge from "@/components/Badge";

export function generateStaticParams() {
  return mockCampaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    notFound();
  }

  const progress = calculateProgress(
    campaign.currentAmount,
    campaign.targetAmount
  );

  const categoryGradients: Record<string, string> = {
    Kesehatan: "from-rose-100 via-pink-50 to-sky-100",
    "Tempat Tinggal": "from-amber-100 via-orange-50 to-emerald-100",
    Pendidikan: "from-blue-100 via-indigo-50 to-purple-100",
    Bencana: "from-sky-100 via-cyan-50 to-teal-100",
    Ekonomi: "from-emerald-100 via-green-50 to-lime-100",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className={`bg-gradient-to-br ${categoryGradients[campaign.category] || "from-sky-100 to-emerald-100"} relative`}>
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-24">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Beranda
            </Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/campaigns" className="hover:text-sky-600 transition-colors">
              Campaign
            </Link>
            <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-700 font-medium truncate max-w-xs">{campaign.title}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-1.5 rounded-full shadow-sm">
              {getCategoryIcon(campaign.category)} {campaign.category}
            </span>
            <span className="text-sm font-medium text-gray-500">{campaign.location}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 max-w-3xl">
            {campaign.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {campaign.badges.map((badge) => (
              <Badge key={badge} badge={badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Story */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📖</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Cerita</h2>
              </div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                {campaign.story}
              </p>
            </div>

            {/* Timeline / Updates */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Update Terkini</h2>
              </div>
              {campaign.updates.length > 0 ? (
                <div className="space-y-5">
                  {campaign.updates.map((update, index) => (
                    <div
                      key={update.id}
                      className="relative pl-6"
                    >
                      {index < campaign.updates.length - 1 && (
                        <div className="absolute left-2 top-8 bottom-0 w-0.5 timeline-line" />
                      )}
                      <div className="absolute left-0 top-1 w-4 h-4 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full border-2 border-white shadow-sm" />
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="text-xs text-gray-400 font-medium mb-1.5">
                          {formatDate(update.date)}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1.5">
                          {update.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <span className="text-3xl block mb-2">📭</span>
                  <p className="text-gray-400 text-sm">
                    Belum ada update untuk campaign ini.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Donation Info */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Info Donasi</h2>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-end justify-between mb-3">
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {formatCurrency(campaign.currentAmount)}
                  </span>
                  <span className="text-sm font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div
                    className="progress-bar h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Target: {formatCurrency(campaign.targetAmount)}
                </p>
              </div>

              {/* Direct Donation Info */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-bold text-sky-800 mb-3 text-sm flex items-center gap-2">
                    <span>🏦</span> Transfer Bank
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Bank</span>
                      <span className="font-bold text-gray-800">
                        {campaign.recipientBank}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">No. Rekening</span>
                      <span className="font-mono font-bold text-gray-800">
                        {campaign.recipientAccount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Atas Nama</span>
                      <span className="font-bold text-gray-800">
                        {campaign.recipientName}
                      </span>
                    </div>
                  </div>
                </div>

                {campaign.recipientQris && (
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100 text-center">
                    <h3 className="font-bold text-emerald-800 mb-3 text-sm">
                      📱 QRIS
                    </h3>
                    <div className="bg-white rounded-xl p-4 inline-block shadow-sm border border-emerald-100">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        QR Code
                      </div>
                    </div>
                    <p className="text-xs text-emerald-600 mt-3 font-medium">
                      Scan QRIS untuk donasi langsung
                    </p>
                  </div>
                )}

                {campaign.paymentLink && (
                  <a
                    href={campaign.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full btn-primary text-white text-center py-3.5 rounded-xl font-bold shadow-md text-sm"
                  >
                    🔗 Buka Link Pembayaran
                  </a>
                )}
              </div>

              {/* Important Notice */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Penting:</strong> Donasi dikirim langsung ke
                  rekening penerima. Platform BantuSesama tidak menyimpan atau
                  mengelola dana donasi.
                </p>
              </div>

              {/* Campaign Info */}
              <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1.5">
                <p>Dibuat: {formatDate(campaign.createdAt)}</p>
                <p>Update terakhir: {formatDate(campaign.updatedAt)}</p>
              </div>
            </div>

            {/* Report Button */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <button className="text-sm text-red-500 hover:text-red-600 font-semibold transition-colors">
                🚨 Laporkan Campaign Ini
              </button>
              <p className="text-xs text-gray-400 mt-1.5">
                Jika Anda menemukan indikasi penipuan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
