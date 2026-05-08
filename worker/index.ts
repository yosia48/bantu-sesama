/**
 * BantuSesama API - Cloudflare Worker
 * 
 * Deploy with: wrangler deploy
 * 
 * This worker handles all API requests for the BantuSesama platform.
 * It connects to Cloudflare D1 for data storage.
 */

interface Env {
  DB: D1Database;
}

interface Campaign {
  id: string;
  title: string;
  story: string;
  category: string;
  location: string;
  target_amount: number;
  current_amount: number;
  recipient_name: string;
  recipient_bank: string;
  recipient_account: string;
  recipient_qris?: string;
  payment_link?: string;
  photo_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // GET /api/campaigns - List approved campaigns
      if (path === "/api/campaigns" && request.method === "GET") {
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");

        let query = "SELECT * FROM campaigns WHERE status = 'approved'";
        const params: string[] = [];

        if (category) {
          query += " AND category = ?";
          params.push(category);
        }
        if (search) {
          query += " AND (title LIKE ? OR story LIKE ? OR location LIKE ?)";
          const searchTerm = `%${search}%`;
          params.push(searchTerm, searchTerm, searchTerm);
        }

        query += " ORDER BY created_at DESC";

        const campaigns = await env.DB.prepare(query).bind(...params).all<Campaign>();

        // Fetch badges for each campaign
        const results = await Promise.all(
          (campaigns.results || []).map(async (campaign) => {
            const badges = await env.DB.prepare(
              "SELECT badge FROM campaign_badges WHERE campaign_id = ?"
            ).bind(campaign.id).all<{ badge: string }>();

            const updates = await env.DB.prepare(
              "SELECT * FROM campaign_updates WHERE campaign_id = ? ORDER BY created_at DESC"
            ).bind(campaign.id).all();

            return {
              ...campaign,
              badges: (badges.results || []).map((b) => b.badge),
              updates: updates.results || [],
            };
          })
        );

        return jsonResponse({ success: true, data: results, total: results.length });
      }

      // GET /api/campaigns/:id - Get single campaign
      if (path.match(/^\/api\/campaigns\/[\w-]+$/) && request.method === "GET") {
        const id = path.split("/").pop()!;

        const campaign = await env.DB.prepare(
          "SELECT * FROM campaigns WHERE id = ?"
        ).bind(id).first<Campaign>();

        if (!campaign) {
          return jsonResponse({ success: false, message: "Campaign tidak ditemukan" }, 404);
        }

        const badges = await env.DB.prepare(
          "SELECT badge FROM campaign_badges WHERE campaign_id = ?"
        ).bind(id).all<{ badge: string }>();

        const updates = await env.DB.prepare(
          "SELECT * FROM campaign_updates WHERE campaign_id = ? ORDER BY created_at DESC"
        ).bind(id).all();

        return jsonResponse({
          success: true,
          data: {
            ...campaign,
            badges: (badges.results || []).map((b) => b.badge),
            updates: updates.results || [],
          },
        });
      }

      // POST /api/campaigns - Submit new campaign
      if (path === "/api/campaigns" && request.method === "POST") {
        const body = await request.json() as Record<string, string>;
        const id = `campaign-${Date.now()}`;

        await env.DB.prepare(
          `INSERT INTO campaigns (id, title, story, category, location, target_amount, recipient_name, recipient_bank, recipient_account, recipient_qris, payment_link, contact_phone, contact_email)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.title,
          body.story,
          body.category,
          body.location,
          Number(body.targetAmount),
          body.recipientName,
          body.recipientBank,
          body.recipientAccount,
          body.recipientQris || null,
          body.paymentLink || null,
          body.contactPhone,
          body.contactEmail
        ).run();

        return jsonResponse(
          { success: true, message: "Campaign berhasil diajukan", data: { id } },
          201
        );
      }

      // POST /api/reports - Report a campaign
      if (path === "/api/reports" && request.method === "POST") {
        const body = await request.json() as Record<string, string>;
        const id = `report-${Date.now()}`;

        await env.DB.prepare(
          `INSERT INTO reports (id, campaign_id, reason, description, reporter_email)
           VALUES (?, ?, ?, ?, ?)`
        ).bind(id, body.campaignId, body.reason, body.description || null, body.email || null).run();

        return jsonResponse(
          { success: true, message: "Laporan berhasil dikirim" },
          201
        );
      }

      // PUT /api/admin/campaigns/:id - Update campaign status (admin)
      if (path.match(/^\/api\/admin\/campaigns\/[\w-]+$/) && request.method === "PUT") {
        const id = path.split("/").pop()!;
        const body = await request.json() as Record<string, string>;

        await env.DB.prepare(
          "UPDATE campaigns SET status = ?, updated_at = datetime('now') WHERE id = ?"
        ).bind(body.status, id).run();

        if (body.status === "approved") {
          await env.DB.prepare(
            "INSERT OR IGNORE INTO campaign_badges (campaign_id, badge) VALUES (?, 'active_campaign')"
          ).bind(id).run();
        }

        return jsonResponse({ success: true, message: `Campaign ${body.status}` });
      }

      return jsonResponse({ success: false, message: "Route not found" }, 404);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return jsonResponse({ success: false, message }, 500);
    }
  },
};
