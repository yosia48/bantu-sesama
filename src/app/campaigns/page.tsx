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
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Semua Campaign
          </h1>
          <p className="text-gray-500">
            Temukan campaign yang membutuhkan bantuanmu
          </p>

          {/* Search */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Cari campaign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada campaign ditemukan
            </h3>
            <p className="text-gray-400">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
