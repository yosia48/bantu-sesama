"use client";

import { useState } from "react";
import { mockCampaigns, pendingCampaigns } from "@/lib/mock-data";
import { Campaign } from "@/types/campaign";
import {
  formatCurrency,
  formatDate,
  calculateProgress,
  getBadgeLabel,
  getBadgeColor,
} from "@/lib/utils";

type Tab = "pending" | "approved" | "all";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const allCampaigns = [...pendingCampaigns, ...mockCampaigns];

  const getFilteredCampaigns = (): Campaign[] => {
    switch (activeTab) {
      case "pending":
        return pendingCampaigns;
      case "approved":
        return mockCampaigns;
      case "all":
        return allCampaigns;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    }
  };

  const handleAction = (campaignId: string, action: string) => {
    setActionMessage(
      `Campaign ${campaignId} telah di-${action}. (Demo - tidak ada perubahan nyata)`
    );
    setTimeout(() => setActionMessage(""), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1.5">
              Masuk untuk mengelola campaign
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary text-white py-3 rounded-xl font-bold shadow-md"
            >
              Masuk
            </button>
            <p className="text-xs text-gray-400 text-center">
              Demo password: admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-2xl">🔐</span>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Kelola dan review campaign yang masuk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl border border-gray-200 hover:border-red-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Message */}
        {actionMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-xl mb-6 font-medium text-sm flex items-center gap-2">
            <span>✅</span> {actionMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaign", value: allCampaigns.length, icon: "📊", gradient: "from-gray-50 to-slate-50", border: "border-gray-200", color: "text-gray-900" },
            { label: "Menunggu Review", value: pendingCampaigns.length, icon: "⏳", gradient: "from-amber-50 to-orange-50", border: "border-amber-200", color: "text-amber-600" },
            { label: "Disetujui", value: mockCampaigns.length, icon: "✅", gradient: "from-emerald-50 to-green-50", border: "border-emerald-200", color: "text-emerald-600" },
            { label: "Dana Terkumpul", value: formatCurrency(mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0)), icon: "💰", gradient: "from-sky-50 to-blue-50", border: "border-sky-200", color: "text-sky-600", isText: true },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 border ${stat.border}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className={`text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "pending" as Tab, label: "Menunggu Review", count: pendingCampaigns.length, icon: "⏳" },
            { key: "approved" as Tab, label: "Disetujui", count: mockCampaigns.length, icon: "✅" },
            { key: "all" as Tab, label: "Semua", count: allCampaigns.length, icon: "📋" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab.key
                  ? "btn-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span className={`px-2 py-0.5 rounded-lg text-xs ${
                activeTab === tab.key ? "bg-white/20" : "bg-gray-100"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Campaign List */}
        <div className="space-y-4">
          {getFilteredCampaigns().map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-lg font-semibold ${
                        campaign.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : campaign.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {campaign.status === "pending"
                        ? "Pending"
                        : campaign.status === "approved"
                          ? "Approved"
                          : "Rejected"}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {campaign.category} · {campaign.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-base">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                    {campaign.story}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>👤</span> {campaign.recipientName} ({campaign.recipientBank})
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🎯</span> {formatCurrency(campaign.targetAmount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📅</span> {formatDate(campaign.createdAt)}
                    </span>
                  </div>
                  {campaign.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {campaign.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getBadgeColor(badge)}`}
                        >
                          {getBadgeLabel(badge)}
                        </span>
                      ))}
                    </div>
                  )}
                  {campaign.status === "approved" && (
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="progress-bar h-1.5 rounded-full"
                            style={{ width: `${calculateProgress(campaign.currentAmount, campaign.targetAmount)}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {formatCurrency(campaign.currentAmount)} ({calculateProgress(campaign.currentAmount, campaign.targetAmount)}%) · {campaign.updates.length} update
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 lg:flex-col">
                  {campaign.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(campaign.id, "approve")}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => handleAction(campaign.id, "reject")}
                        className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                  <a
                    href={`/campaign/${campaign.id}`}
                    className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold transition-colors border border-gray-200 text-center"
                  >
                    Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
