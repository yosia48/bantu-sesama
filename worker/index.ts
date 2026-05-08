/**
 * BantuSesama API - Cloudflare Worker
 *
 * Security: CORS restriction, Bearer token auth, input validation,
 * rate limiting, security headers on all responses.
 */

interface Env {
  DB: D1Database;
  ADMIN_TOKEN: string;
  ALLOWED_ORIGINS: string;
}

interface CampaignRow {
  id: string;
  title: string;
  story: string;
  category: string;
  location: string;
  target_amount: number;
  recipient_name: string;
  recipient_bank: string;
  recipient_account: string;
  recipient_qris: string | null;
  payment_link: string | null;
  contact_phone: string;
  contact_email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const VALID_CATEGORIES = [
  "Kesehatan",
  "Tempat Tinggal",
  "Pendidikan",
  "Bencana",
  "Ekonomi",
  "Lainnya",
];

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  ip: string,
  limit = 30,
  windowMs = 60000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= limit;
}

function getCorsOrigin(request: Request, env: Env): string {
  if (env.ALLOWED_ORIGINS) {
    const origins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const reqOrigin = request.headers.get("Origin") || "";
    if (origins.includes(reqOrigin)) return reqOrigin;
    return origins[0] || "";
  }
  return "*";
}

function securityHeaders(
  request: Request,
  env: Env
): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": getCorsOrigin(request, env),
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };
}

function jsonResponse(
  data: unknown,
  status: number,
  request: Request,
  env: Env
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...securityHeaders(request, env),
    },
  });
}

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[0-9+\-\s()]{8,20}$/.test(phone);
}

function maskAccount(account: string): string {
  if (account.length <= 4) return "****";
  return "*".repeat(account.length - 4) + account.slice(-4);
}

function isAdmin(request: Request, env: Env): boolean {
  const auth = request.headers.get("Authorization");
  if (!auth || !env.ADMIN_TOKEN) return false;
  return auth.replace("Bearer ", "") === env.ADMIN_TOKEN;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: securityHeaders(request, env),
      });
    }

    const clientIp =
      request.headers.get("CF-Connecting-IP") || "unknown";
    if (!checkRateLimit(clientIp)) {
      return jsonResponse(
        {
          success: false,
          message: "Terlalu banyak request. Coba lagi nanti.",
        },
        429,
        request,
        env
      );
    }

    try {
      // === PUBLIC: GET /api/campaigns ===
      if (path === "/api/campaigns" && request.method === "GET") {
        const category = url.searchParams.get("category");
        const search = url.searchParams.get("search");

        let query =
          "SELECT * FROM campaigns WHERE status = 'approved'";
        const params: string[] = [];

        if (category && VALID_CATEGORIES.includes(category)) {
          query += " AND category = ?";
          params.push(category);
        }
        if (search) {
          const s = sanitize(search).substring(0, 100);
          query +=
            " AND (title LIKE ? OR story LIKE ? OR location LIKE ?)";
          const term = `%${s}%`;
          params.push(term, term, term);
        }
        query += " ORDER BY created_at DESC LIMIT 50";

        const campaigns = await env.DB.prepare(query)
          .bind(...params)
          .all<CampaignRow>();

        const results = await Promise.all(
          (campaigns.results || []).map(async (c) => {
            const badges = await env.DB.prepare(
              "SELECT badge FROM campaign_badges WHERE campaign_id = ?"
            )
              .bind(c.id)
              .all<{ badge: string }>();
            const updates = await env.DB.prepare(
              "SELECT id, campaign_id, title, description, created_at FROM campaign_updates WHERE campaign_id = ? ORDER BY created_at DESC LIMIT 10"
            )
              .bind(c.id)
              .all();
            return {
              id: c.id,
              title: c.title,
              story: c.story,
              category: c.category,
              location: c.location,
              targetAmount: c.target_amount,
              recipientName: c.recipient_name,
              recipientBank: c.recipient_bank,
              recipientAccount: maskAccount(c.recipient_account),
              recipientQris: c.recipient_qris,
              paymentLink: c.payment_link,
              badges: (badges.results || []).map((b) => b.badge),
              updates: updates.results || [],
              status: c.status,
              createdAt: c.created_at,
              updatedAt: c.updated_at,
            };
          })
        );

        return jsonResponse(
          { success: true, data: results, total: results.length },
          200,
          request,
          env
        );
      }

      // === PUBLIC: GET /api/campaigns/:id ===
      if (
        path.match(/^\/api\/campaigns\/[\w-]+$/) &&
        request.method === "GET"
      ) {
        const id = path.split("/").pop()!;
        const c = await env.DB.prepare(
          "SELECT * FROM campaigns WHERE id = ? AND status = 'approved'"
        )
          .bind(id)
          .first<CampaignRow>();
        if (!c) {
          return jsonResponse(
            { success: false, message: "Campaign tidak ditemukan" },
            404,
            request,
            env
          );
        }
        const badges = await env.DB.prepare(
          "SELECT badge FROM campaign_badges WHERE campaign_id = ?"
        )
          .bind(id)
          .all<{ badge: string }>();
        const updates = await env.DB.prepare(
          "SELECT id, campaign_id, title, description, created_at FROM campaign_updates WHERE campaign_id = ? ORDER BY created_at DESC"
        )
          .bind(id)
          .all();
        return jsonResponse(
          {
            success: true,
            data: {
              id: c.id,
              title: c.title,
              story: c.story,
              category: c.category,
              location: c.location,
              targetAmount: c.target_amount,
              recipientName: c.recipient_name,
              recipientBank: c.recipient_bank,
              recipientAccount: maskAccount(c.recipient_account),
              recipientQris: c.recipient_qris,
              paymentLink: c.payment_link,
              badges: (badges.results || []).map((b) => b.badge),
              updates: updates.results || [],
              status: c.status,
              createdAt: c.created_at,
              updatedAt: c.updated_at,
            },
          },
          200,
          request,
          env
        );
      }

      // === PUBLIC: POST /api/campaigns ===
      if (path === "/api/campaigns" && request.method === "POST") {
        if (!checkRateLimit(clientIp + ":submit", 5, 3600000)) {
          return jsonResponse(
            {
              success: false,
              message: "Batas pengajuan tercapai. Coba lagi nanti.",
            },
            429,
            request,
            env
          );
        }
        const body = (await request.json()) as Record<string, string>;
        const required = [
          "title",
          "story",
          "category",
          "location",
          "targetAmount",
          "recipientName",
          "recipientBank",
          "recipientAccount",
          "contactPhone",
          "contactEmail",
        ];
        for (const field of required) {
          if (!body[field] || !String(body[field]).trim()) {
            return jsonResponse(
              {
                success: false,
                message: `Field '${field}' wajib diisi`,
              },
              400,
              request,
              env
            );
          }
        }
        if (!VALID_CATEGORIES.includes(body.category)) {
          return jsonResponse(
            { success: false, message: "Kategori tidak valid" },
            400,
            request,
            env
          );
        }
        const targetAmount = Number(body.targetAmount);
        if (
          isNaN(targetAmount) ||
          targetAmount < 100000 ||
          targetAmount > 10000000000
        ) {
          return jsonResponse(
            {
              success: false,
              message: "Target dana tidak valid (min Rp100.000)",
            },
            400,
            request,
            env
          );
        }
        if (!validateEmail(body.contactEmail)) {
          return jsonResponse(
            { success: false, message: "Format email tidak valid" },
            400,
            request,
            env
          );
        }
        if (!validatePhone(body.contactPhone)) {
          return jsonResponse(
            {
              success: false,
              message: "Format nomor telepon tidak valid",
            },
            400,
            request,
            env
          );
        }
        if (
          body.paymentLink &&
          !/^https?:\/\/.+/.test(body.paymentLink)
        ) {
          return jsonResponse(
            {
              success: false,
              message:
                "Link pembayaran harus URL valid (https://...)",
            },
            400,
            request,
            env
          );
        }
        const id = `campaign-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        await env.DB.prepare(
          `INSERT INTO campaigns (id, title, story, category, location, target_amount, recipient_name, recipient_bank, recipient_account, recipient_qris, payment_link, contact_phone, contact_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            id,
            sanitize(body.title).substring(0, 200),
            sanitize(body.story).substring(0, 5000),
            body.category,
            sanitize(body.location).substring(0, 100),
            targetAmount,
            sanitize(body.recipientName).substring(0, 100),
            sanitize(body.recipientBank).substring(0, 50),
            body.recipientAccount
              .replace(/[^0-9]/g, "")
              .substring(0, 30),
            body.recipientQris || null,
            body.paymentLink || null,
            body.contactPhone
              .replace(/[^0-9+\-\s()]/g, "")
              .substring(0, 20),
            body.contactEmail.substring(0, 100)
          )
          .run();
        return jsonResponse(
          {
            success: true,
            message:
              "Campaign berhasil diajukan dan menunggu review",
            data: { id },
          },
          201,
          request,
          env
        );
      }

      // === PUBLIC: POST /api/reports ===
      if (path === "/api/reports" && request.method === "POST") {
        if (!checkRateLimit(clientIp + ":report", 10, 3600000)) {
          return jsonResponse(
            {
              success: false,
              message: "Batas laporan tercapai. Coba lagi nanti.",
            },
            429,
            request,
            env
          );
        }
        const body = (await request.json()) as Record<string, string>;
        if (!body.campaignId || !body.reason) {
          return jsonResponse(
            {
              success: false,
              message: "campaignId dan reason wajib diisi",
            },
            400,
            request,
            env
          );
        }
        const id = `report-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        await env.DB.prepare(
          `INSERT INTO reports (id, campaign_id, reason, description, reporter_email) VALUES (?, ?, ?, ?, ?)`
        )
          .bind(
            id,
            sanitize(body.campaignId),
            sanitize(body.reason).substring(0, 200),
            body.description
              ? sanitize(body.description).substring(0, 1000)
              : null,
            body.email && validateEmail(body.email)
              ? body.email
              : null
          )
          .run();
        return jsonResponse(
          { success: true, message: "Laporan berhasil dikirim" },
          201,
          request,
          env
        );
      }

      // === ADMIN: GET /api/admin/campaigns ===
      if (
        path === "/api/admin/campaigns" &&
        request.method === "GET"
      ) {
        if (!isAdmin(request, env)) {
          return jsonResponse(
            { success: false, message: "Unauthorized" },
            401,
            request,
            env
          );
        }
        const status = url.searchParams.get("status");
        let query = "SELECT * FROM campaigns";
        const params: string[] = [];
        if (
          status &&
          ["pending", "approved", "rejected", "completed"].includes(
            status
          )
        ) {
          query += " WHERE status = ?";
          params.push(status);
        }
        query += " ORDER BY created_at DESC LIMIT 100";
        const campaigns = await env.DB.prepare(query)
          .bind(...params)
          .all<CampaignRow>();
        const results = await Promise.all(
          (campaigns.results || []).map(async (c) => {
            const badges = await env.DB.prepare(
              "SELECT badge FROM campaign_badges WHERE campaign_id = ?"
            )
              .bind(c.id)
              .all<{ badge: string }>();
            const updates = await env.DB.prepare(
              "SELECT * FROM campaign_updates WHERE campaign_id = ? ORDER BY created_at DESC"
            )
              .bind(c.id)
              .all();
            return {
              id: c.id,
              title: c.title,
              story: c.story,
              category: c.category,
              location: c.location,
              targetAmount: c.target_amount,
              recipientName: c.recipient_name,
              recipientBank: c.recipient_bank,
              recipientAccount: c.recipient_account,
              recipientQris: c.recipient_qris,
              paymentLink: c.payment_link,
              contactPhone: c.contact_phone,
              contactEmail: c.contact_email,
              badges: (badges.results || []).map((b) => b.badge),
              updates: updates.results || [],
              status: c.status,
              createdAt: c.created_at,
              updatedAt: c.updated_at,
            };
          })
        );
        return jsonResponse(
          { success: true, data: results, total: results.length },
          200,
          request,
          env
        );
      }

      // === ADMIN: PUT /api/admin/campaigns/:id ===
      if (
        path.match(/^\/api\/admin\/campaigns\/[\w-]+$/) &&
        request.method === "PUT"
      ) {
        if (!isAdmin(request, env)) {
          return jsonResponse(
            { success: false, message: "Unauthorized" },
            401,
            request,
            env
          );
        }
        const id = path.split("/").pop()!;
        const body = (await request.json()) as Record<string, string>;
        if (
          !body.status ||
          !["approved", "rejected", "completed"].includes(
            body.status
          )
        ) {
          return jsonResponse(
            { success: false, message: "Status tidak valid" },
            400,
            request,
            env
          );
        }
        const existing = await env.DB.prepare(
          "SELECT id FROM campaigns WHERE id = ?"
        )
          .bind(id)
          .first();
        if (!existing) {
          return jsonResponse(
            {
              success: false,
              message: "Campaign tidak ditemukan",
            },
            404,
            request,
            env
          );
        }
        await env.DB.prepare(
          "UPDATE campaigns SET status = ?, updated_at = datetime('now') WHERE id = ?"
        )
          .bind(body.status, id)
          .run();
        if (body.status === "approved") {
          await env.DB.prepare(
            "INSERT OR IGNORE INTO campaign_badges (campaign_id, badge) VALUES (?, 'active_campaign')"
          )
            .bind(id)
            .run();
        }
        return jsonResponse(
          {
            success: true,
            message: `Campaign berhasil di-${body.status}`,
          },
          200,
          request,
          env
        );
      }

      // === ADMIN: GET /api/admin/reports ===
      if (
        path === "/api/admin/reports" &&
        request.method === "GET"
      ) {
        if (!isAdmin(request, env)) {
          return jsonResponse(
            { success: false, message: "Unauthorized" },
            401,
            request,
            env
          );
        }
        const reports = await env.DB.prepare(
          "SELECT r.*, c.title as campaign_title FROM reports r LEFT JOIN campaigns c ON r.campaign_id = c.id ORDER BY r.created_at DESC LIMIT 100"
        ).all();
        return jsonResponse(
          { success: true, data: reports.results || [] },
          200,
          request,
          env
        );
      }

      // === ADMIN: POST /api/admin/campaigns/:id/update ===
      if (
        path.match(
          /^\/api\/admin\/campaigns\/[\w-]+\/update$/
        ) &&
        request.method === "POST"
      ) {
        if (!isAdmin(request, env)) {
          return jsonResponse(
            { success: false, message: "Unauthorized" },
            401,
            request,
            env
          );
        }
        const parts = path.split("/");
        const campaignId = parts[parts.length - 2];
        const body = (await request.json()) as Record<
          string,
          string
        >;
        if (!body.title || !body.description) {
          return jsonResponse(
            {
              success: false,
              message: "title dan description wajib diisi",
            },
            400,
            request,
            env
          );
        }
        const id = `update-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        await env.DB.prepare(
          `INSERT INTO campaign_updates (id, campaign_id, title, description) VALUES (?, ?, ?, ?)`
        )
          .bind(
            id,
            campaignId,
            sanitize(body.title).substring(0, 200),
            sanitize(body.description).substring(0, 2000)
          )
          .run();
        await env.DB.prepare(
          "INSERT OR IGNORE INTO campaign_badges (campaign_id, badge) VALUES (?, 'active_update')"
        )
          .bind(campaignId)
          .run();
        await env.DB.prepare(
          "UPDATE campaigns SET updated_at = datetime('now') WHERE id = ?"
        )
          .bind(campaignId)
          .run();
        return jsonResponse(
          { success: true, message: "Update berhasil ditambahkan" },
          201,
          request,
          env
        );
      }

      // === ADMIN: POST /api/admin/campaigns/:id/badge ===
      if (
        path.match(
          /^\/api\/admin\/campaigns\/[\w-]+\/badge$/
        ) &&
        request.method === "POST"
      ) {
        if (!isAdmin(request, env)) {
          return jsonResponse(
            { success: false, message: "Unauthorized" },
            401,
            request,
            env
          );
        }
        const parts = path.split("/");
        const campaignId = parts[parts.length - 2];
        const body = (await request.json()) as Record<
          string,
          string
        >;
        const validBadges = [
          "docs_available",
          "verified",
          "active_update",
          "active_campaign",
        ];
        if (!body.badge || !validBadges.includes(body.badge)) {
          return jsonResponse(
            { success: false, message: "Badge tidak valid" },
            400,
            request,
            env
          );
        }
        await env.DB.prepare(
          "INSERT OR IGNORE INTO campaign_badges (campaign_id, badge) VALUES (?, ?)"
        )
          .bind(campaignId, body.badge)
          .run();
        return jsonResponse(
          { success: true, message: "Badge berhasil ditambahkan" },
          200,
          request,
          env
        );
      }

      return jsonResponse(
        { success: false, message: "Route not found" },
        404,
        request,
        env
      );
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan server";
      console.error("API Error:", msg);
      return jsonResponse(
        {
          success: false,
          message: "Terjadi kesalahan. Silakan coba lagi.",
        },
        500,
        request,
        env
      );
    }
  },
};
