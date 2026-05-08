"use client";

import { useState } from "react";
import CampaignCard from "@/components/CampaignCard";
import { mockCampaigns } from "@/lib/mock-data";

const categories = [
  "Semua",
  "Kesehatan",
  "Tempat Tinggal",
  "Pendidikan",
  "Bencana",
  "Ekonomi",
];

export default function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchCategory =
      selectedCategory === "Semua" || campaign.category === selectedCategory;
    const matchSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-hero hero-pattern text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-200">Jelajahi</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3">
            Semua Campaign
          </h1>
          <p className="text-white/70 max-w-lg">
            Temukan campaign yang membutuhkan bantuanmu dan buat perbedaan hari ini
          </p>

          {/* Search */}
          <div className="mt-8">
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder="Cari campaign, lokasi, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 outline-none transition-all"
              />
              <svg className="absolute left-4 top-4 w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "btn-primary text-white shadow-md"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">
            {filteredCampaigns.length} campaign ditemukan
          </p>
        </div>
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Tidak ada campaign ditemukan
            </h3>
            <p className="text-gray-400 text-sm">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
