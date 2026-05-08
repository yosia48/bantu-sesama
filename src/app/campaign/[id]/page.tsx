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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-sky-600">
              Beranda
            </Link>
            <span className="mx-2">›</span>
            <Link href="/campaigns" className="hover:text-sky-600">
              Campaign
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{campaign.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="bg-gradient-to-br from-sky-100 to-emerald-100 rounded-xl h-64 flex items-center justify-center">
              <span className="text-8xl">
                {getCategoryIcon(campaign.category)}
              </span>
            </div>

            {/* Title & Badges */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium bg-sky-50 text-sky-700 px-3 py-1 rounded-full">
                  {campaign.category}
                </span>
                <span className="text-sm text-gray-400">
                  📍 {campaign.location}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {campaign.badges.map((badge) => (
                  <Badge key={badge} badge={badge} />
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">📖 Cerita</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {campaign.story}
              </p>
            </div>

            {/* Timeline / Updates */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">📊 Update Terkini</h2>
              {campaign.updates.length > 0 ? (
                <div className="space-y-4">
                  {campaign.updates.map((update) => (
                    <div
                      key={update.id}
                      className="border-l-4 border-sky-400 pl-4 py-2"
                    >
                      <div className="text-xs text-gray-400 mb-1">
                        {formatDate(update.date)}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {update.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {update.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  Belum ada update untuk campaign ini.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar - Donation Info */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">💰 Info Donasi</h2>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(campaign.currentAmount)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div
                    className="progress-bar h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{progress}% tercapai</span>
                  <span>Target: {formatCurrency(campaign.targetAmount)}</span>
                </div>
              </div>

              {/* Direct Donation Info */}
              <div className="space-y-4">
                <div className="bg-sky-50 rounded-lg p-4">
                  <h3 className="font-semibold text-sky-800 mb-2">
                    🏦 Transfer Bank
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-500">Bank:</span>{" "}
                      <span className="font-semibold">
                        {campaign.recipientBank}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">No. Rekening:</span>{" "}
                      <span className="font-mono font-semibold">
                        {campaign.recipientAccount}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Atas Nama:</span>{" "}
                      <span className="font-semibold">
                        {campaign.recipientName}
                      </span>
                    </p>
                  </div>
                </div>

                {campaign.recipientQris && (
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-emerald-800 mb-2">
                      📱 QRIS
                    </h3>
                    <div className="bg-white rounded-lg p-4 inline-block">
                      <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        QR Code
                      </div>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">
                      Scan QRIS di atas untuk donasi
                    </p>
                  </div>
                )}

                {campaign.paymentLink && (
                  <a
                    href={campaign.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-sky-500 hover:bg-sky-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    🔗 Link Pembayaran
                  </a>
                )}
              </div>

              {/* Important Notice */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-800">
                  ⚠️ <strong>Penting:</strong> Donasi dikirim langsung ke
                  rekening penerima. Platform BantuSesama tidak menyimpan atau
                  mengelola dana donasi.
                </p>
              </div>

              {/* Campaign Info */}
              <div className="mt-4 pt-4 border-t text-xs text-gray-400 space-y-1">
                <p>Dibuat: {formatDate(campaign.createdAt)}</p>
                <p>Update terakhir: {formatDate(campaign.updatedAt)}</p>
              </div>
            </div>

            {/* Report Button */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <button className="text-sm text-red-500 hover:text-red-600 font-medium">
                🚨 Laporkan Campaign Ini
              </button>
              <p className="text-xs text-gray-400 mt-1">
                Jika Anda menemukan indikasi penipuan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
