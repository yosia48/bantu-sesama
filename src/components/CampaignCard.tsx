import Link from "next/link";
import { Campaign } from "@/types/campaign";
import {
  formatCurrency,
  getBadgeLabel,
  getBadgeColor,
  getCategoryColor,
  getCategoryBg,
} from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Link href={`/campaign/${campaign.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer group">
        <div className={`h-44 bg-gradient-to-br ${getCategoryBg(campaign.category)} flex flex-col justify-between p-5 relative`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(campaign.category)} shadow-sm`}>
              {campaign.category}
            </span>
            <span className="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-600 px-3 py-1.5 rounded-full shadow-sm">
              {campaign.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {campaign.badges.includes("verified") && (
              <span className="text-xs font-semibold bg-white/90 backdrop-blur-sm text-green-700 px-2.5 py-1 rounded-full border border-green-200">
                Terverifikasi
              </span>
            )}
            {campaign.updates.length > 0 && (
              <span className="text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-600 px-2.5 py-1 rounded-full">
                {campaign.updates.length} update
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-base leading-snug group-hover:text-sky-700 transition-colors">
            {campaign.title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {campaign.story}
          </p>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Target Dana</p>
              <p className="font-bold text-gray-900">
                {formatCurrency(campaign.targetAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Donasi Langsung</p>
              <p className="text-sm font-semibold text-emerald-600">
                Transfer ke penerima
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {campaign.badges.slice(0, 3).map((badge) => (
              <span
                key={badge}
                className={`text-xs px-2 py-0.5 rounded-md font-medium ${getBadgeColor(badge)}`}
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
