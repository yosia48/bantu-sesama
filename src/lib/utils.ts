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

export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function getBadgeLabel(badge: string): string {
  const labels: Record<string, string> = {
    docs_available: "📄 Dokumen Tersedia",
    verified: "✅ Terverifikasi",
    active_update: "🔄 Update Aktif",
    active_campaign: "🟢 Campaign Aktif",
  };
  return labels[badge] || badge;
}

export function getBadgeColor(badge: string): string {
  const colors: Record<string, string> = {
    docs_available: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    active_update: "bg-purple-100 text-purple-800",
    active_campaign: "bg-emerald-100 text-emerald-800",
  };
  return colors[badge] || "bg-gray-100 text-gray-800";
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Kesehatan: "🏥",
    "Tempat Tinggal": "🏠",
    Pendidikan: "📚",
    Bencana: "🌊",
    Ekonomi: "💼",
  };
  return icons[category] || "❤️";
}
