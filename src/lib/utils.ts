export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getBadgeLabel(badge: string): string {
  const labels: Record<string, string> = {
    docs_available: "Dokumen Tersedia",
    verified: "Terverifikasi",
    active_update: "Update Aktif",
    active_campaign: "Campaign Aktif",
  };
  return labels[badge] || badge;
}

export function getBadgeColor(badge: string): string {
  const colors: Record<string, string> = {
    docs_available: "bg-blue-50 text-blue-700 border border-blue-200",
    verified: "bg-green-50 text-green-700 border border-green-200",
    active_update: "bg-purple-50 text-purple-700 border border-purple-200",
    active_campaign: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };
  return colors[badge] || "bg-gray-50 text-gray-700 border border-gray-200";
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Kesehatan: "from-rose-500 to-pink-600",
    "Tempat Tinggal": "from-amber-500 to-orange-600",
    Pendidikan: "from-blue-500 to-indigo-600",
    Bencana: "from-cyan-500 to-teal-600",
    Ekonomi: "from-emerald-500 to-green-600",
  };
  return colors[category] || "from-gray-500 to-gray-600";
}

export function getCategoryBg(category: string): string {
  const colors: Record<string, string> = {
    Kesehatan: "from-rose-50 to-pink-50",
    "Tempat Tinggal": "from-amber-50 to-orange-50",
    Pendidikan: "from-blue-50 to-indigo-50",
    Bencana: "from-cyan-50 to-teal-50",
    Ekonomi: "from-emerald-50 to-green-50",
  };
  return colors[category] || "from-gray-50 to-gray-50";
}
