"use client";

import { useState } from "react";
import { mockCampaigns, pendingCampaigns } from "@/lib/mock-data";
import { Campaign } from "@/types/campaign";
import {
  formatCurrency,
  formatDate,
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
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {actionMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Campaign", value: allCampaigns.length, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", gradient: "from-gray-50 to-slate-50", border: "border-gray-200", color: "text-gray-900", iconColor: "text-gray-500" },
            { label: "Menunggu Review", value: pendingCampaigns.length, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-amber-50 to-orange-50", border: "border-amber-200", color: "text-amber-600", iconColor: "text-amber-500" },
            { label: "Disetujui", value: mockCampaigns.length, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-emerald-50 to-green-50", border: "border-emerald-200", color: "text-emerald-600", iconColor: "text-emerald-500" },
            { label: "Total Update", value: mockCampaigns.reduce((sum, c) => sum + c.updates.length, 0), icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", gradient: "from-sky-50 to-blue-50", border: "border-sky-200", color: "text-sky-600", iconColor: "text-sky-500" },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 border ${stat.border}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} /></svg>
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
            { key: "pending" as Tab, label: "Menunggu Review", count: pendingCampaigns.length, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { key: "approved" as Tab, label: "Disetujui", count: mockCampaigns.length, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { key: "all" as Tab, label: "Semua", count: allCampaigns.length, icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
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
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> {campaign.recipientName} ({campaign.recipientBank})
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> {formatCurrency(campaign.targetAmount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {formatDate(campaign.createdAt)}
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
                  {campaign.status === "approved" && campaign.updates.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <span className="text-xs text-gray-500 font-medium">
                        {campaign.updates.length} update diberikan
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
