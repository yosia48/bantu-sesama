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

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer">
        <div className="h-48 bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center">
          <span className="text-6xl">
            {getCategoryIcon(campaign.category)}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-sky-50 text-sky-700 px-2 py-1 rounded-full">
              {campaign.category}
            </span>
            <span className="text-xs text-gray-400">📍 {campaign.location}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {campaign.title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {campaign.story}
          </p>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-emerald-600">
                {formatCurrency(campaign.currentAmount)}
              </span>
              <span className="text-gray-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="progress-bar h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              dari {formatCurrency(campaign.targetAmount)}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {campaign.badges.slice(0, 3).map((badge) => (
              <span
                key={badge}
                className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(badge)}`}
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
