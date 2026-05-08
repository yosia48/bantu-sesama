import { notFound } from "next/navigation";
import Link from "next/link";
import { mockCampaigns } from "@/lib/mock-data";
import {
  formatCurrency,
  formatDate,
  getCategoryColor,
  getCategoryBg,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className={`bg-gradient-to-br ${getCategoryBg(campaign.category)} relative`}>
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
            <span className={`text-sm font-bold text-white px-4 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(campaign.category)} shadow-sm`}>
              {campaign.category}
            </span>
            <span className="text-sm font-medium text-gray-600 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
              {campaign.location}
            </span>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Cerita
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                {campaign.story}
              </p>
            </div>

            {/* Timeline / Updates */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                Update Terkini
              </h2>
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
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  <p className="text-gray-400 text-sm">
                    Belum ada update untuk campaign ini.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Donation Info */}
          <div className="space-y-6">
            {/* Donation Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Informasi Donasi
              </h2>

              {/* Target */}
              <div className="mb-5 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Target Dana</p>
                <p className="text-2xl font-extrabold text-gray-900">
                  {formatCurrency(campaign.targetAmount)}
                </p>
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  Donasi langsung ke rekening penerima
                </p>
              </div>

              {/* Direct Donation Info */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-bold text-sky-800 mb-3 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Transfer Bank
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
                    <h3 className="font-bold text-emerald-800 mb-3 text-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                      QRIS
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
                    className="flex items-center justify-center gap-2 w-full btn-primary text-white text-center py-3.5 rounded-xl font-bold shadow-md text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Buka Link Pembayaran
                  </a>
                )}
              </div>

              {/* Important Notice */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Penting:</strong> Donasi dikirim langsung ke
                    rekening penerima. Platform BantuSesama tidak menyimpan atau
                    mengelola dana donasi.
                  </p>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1.5">
                <p>Dibuat: {formatDate(campaign.createdAt)}</p>
                <p>Update terakhir: {formatDate(campaign.updatedAt)}</p>
              </div>
            </div>

            {/* Report Button */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <button className="flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 font-semibold transition-colors mx-auto">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                Laporkan Campaign Ini
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
