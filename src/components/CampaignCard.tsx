import Link from "next/link";
import { Campaign } from "@/types/campaign";
import {
  formatCurrency,
  calculateProgress,
  getBadgeLabel,
  getBadgeColor,
  getCategoryIcon,
} from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
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
    <Link href={`/campaign/${campaign.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer group">
        <div className={`h-52 bg-gradient-to-br ${categoryGradients[campaign.category] || "from-sky-100 to-emerald-100"} flex items-center justify-center relative`}>
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
            {getCategoryIcon(campaign.category)}
          </span>
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full shadow-sm">
              {campaign.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-500 px-3 py-1.5 rounded-full shadow-sm">
              {campaign.location}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg leading-snug">
            {campaign.title}
          </h3>

          <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
            {campaign.story}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-emerald-600 text-base">
                {formatCurrency(campaign.currentAmount)}
              </span>
              <span className="font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md text-xs">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="progress-bar h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              dari {formatCurrency(campaign.targetAmount)}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-50">
            {campaign.badges.slice(0, 3).map((badge) => (
              <span
                key={badge}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getBadgeColor(badge)}`}
              >
                {getBadgeLabel(badge)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
