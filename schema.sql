-- BantuSesama Database Schema for Cloudflare D1
-- Run: wrangler d1 execute bantu-sesama-db --file=./schema.sql

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  target_amount INTEGER NOT NULL,
  current_amount INTEGER DEFAULT 0,
  recipient_name TEXT NOT NULL,
  recipient_bank TEXT NOT NULL,
  recipient_account TEXT NOT NULL,
  recipient_qris TEXT,
  payment_link TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'completed')),
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Campaign updates table
CREATE TABLE IF NOT EXISTS campaign_updates (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Campaign badges table
CREATE TABLE IF NOT EXISTS campaign_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id TEXT NOT NULL,
  badge TEXT NOT NULL CHECK(badge IN ('docs_available', 'verified', 'active_update', 'active_campaign')),
  granted_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
  UNIQUE(campaign_id, badge)
);

-- Reports table (anti-scam)
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  reporter_email TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'resolved')),
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaign_updates_campaign_id ON campaign_updates(campaign_id);
CREATE INDEX IF NOT EXISTS idx_reports_campaign_id ON reports(campaign_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
