import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCampaigns,
    total: mockCampaigns.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(
    {
      success: true,
      message: "Campaign berhasil diajukan. Menunggu review admin.",
      data: {
        id: `new-${Date.now()}`,
        ...body,
        status: "pending",
        badges: [],
        currentAmount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updates: [],
      },
    },
    { status: 201 }
  );
}
