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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-sm w-full">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-2">🔐</span>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">
              Masuk untuk mengelola campaign
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🔐 Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Kelola dan review campaign yang masuk
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Action Message */}
        {actionMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            {actionMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Campaign</p>
            <p className="text-2xl font-bold text-gray-900">
              {allCampaigns.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Menunggu Review</p>
            <p className="text-2xl font-bold text-amber-500">
              {pendingCampaigns.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Disetujui</p>
            <p className="text-2xl font-bold text-emerald-500">
              {mockCampaigns.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Dana Terkumpul</p>
            <p className="text-2xl font-bold text-sky-600">
              {formatCurrency(
                mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0)
              )}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            {
              key: "pending" as Tab,
              label: "Menunggu Review",
              count: pendingCampaigns.length,
            },
            {
              key: "approved" as Tab,
              label: "Disetujui",
              count: mockCampaigns.length,
            },
            {
              key: "all" as Tab,
              label: "Semua",
              count: allCampaigns.length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-sky-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Campaign List */}
        <div className="space-y-4">
          {getFilteredCampaigns().map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        campaign.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : campaign.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {campaign.status === "pending"
                        ? "⏳ Pending"
                        : campaign.status === "approved"
                          ? "✅ Approved"
                          : "❌ Rejected"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {campaign.category} • {campaign.location}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {campaign.story}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span>
                      Penerima: {campaign.recipientName} (
                      {campaign.recipientBank})
                    </span>
                    <span>
                      Target: {formatCurrency(campaign.targetAmount)}
                    </span>
                    <span>Dibuat: {formatDate(campaign.createdAt)}</span>
                  </div>
                  {campaign.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {campaign.badges.map((badge) => (
                        <span
                          key={badge}
                          className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(badge)}`}
                        >
                          {getBadgeLabel(badge)}
                        </span>
                      ))}
                    </div>
                  )}
                  {campaign.status === "approved" && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>
                          Terkumpul:{" "}
                          {formatCurrency(campaign.currentAmount)} (
                          {calculateProgress(
                            campaign.currentAmount,
                            campaign.targetAmount
                          )}
                          %)
                        </span>
                        <span>• {campaign.updates.length} update</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {campaign.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(campaign.id, "approve")}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => handleAction(campaign.id, "reject")}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                  <a
                    href={`/campaign/${campaign.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
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
