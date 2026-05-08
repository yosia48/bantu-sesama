import { getBadgeLabel, getBadgeColor } from "@/lib/utils";

interface BadgeProps {
  badge: string;
}

export default function Badge({ badge }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-sm px-3 py-1 rounded-full font-medium ${getBadgeColor(badge)}`}
    >
      {getBadgeLabel(badge)}
    </span>
  );
}
