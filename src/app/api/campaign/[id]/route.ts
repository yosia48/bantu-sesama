import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return NextResponse.json(
      { success: false, message: "Campaign tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: campaign,
  });
}
