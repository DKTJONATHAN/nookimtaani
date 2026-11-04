-- Nooki Mtaani backend expansion. Apply after 0001_initial_schema.sql.
PRAGMA foreign_keys = ON;

ALTER TABLE spaces ADD COLUMN exact_address TEXT NOT NULL DEFAULT '';
ALTER TABLE spaces ADD COLUMN capacity_m3 REAL;
ALTER TABLE spaces ADD COLUMN dimensions_json TEXT NOT NULL DEFAULT '{}';
ALTER TABLE spaces ADD COLUMN permitted_goods_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE spaces ADD COLUMN restrictions TEXT NOT NULL DEFAULT '';
ALTER TABLE spaces ADD COLUMN access_hours TEXT NOT NULL DEFAULT '';
ALTER TABLE spaces ADD COLUMN security_features_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE spaces ADD COLUMN host_verified_at TEXT;

ALTER TABLE bookings ADD COLUMN rate_type TEXT NOT NULL DEFAULT 'month';
ALTER TABLE bookings ADD COLUMN host_payout_amount REAL NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN platform_fee REAL NOT NULL DEFAULT 0;
ALTER TABLE bookings ADD COLUMN confirmed_at TEXT;
ALTER TABLE bookings ADD COLUMN cancelled_at TEXT;
ALTER TABLE bookings ADD COLUMN cancelled_by TEXT;
ALTER TABLE bookings ADD COLUMN checkin_at TEXT;
ALTER TABLE bookings ADD COLUMN checkout_at TEXT;

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  csrf_token TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  consumed_at TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS host_applications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  authority_type TEXT NOT NULL CHECK(authority_type IN ('owner','tenant','manager','other')),
  business_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  evidence_media_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','reviewing','approved','rejected')),
  review_notes TEXT NOT NULL DEFAULT '',
  reviewed_by TEXT,
  submitted_at TEXT NOT NULL,
  reviewed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_host_applications_status ON host_applications(status,submitted_at);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK(purpose IN ('listing','verification','checkin','checkout','dispute')),
  context_id TEXT NOT NULL DEFAULT '',
  r2_key TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  original_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected','private')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_media_context ON media_assets(purpose,context_id,status);

CREATE TABLE IF NOT EXISTS booking_events (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  actor_user_id TEXT REFERENCES users(id),
  detail_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_booking_events ON booking_events(booking_id,created_at);

CREATE TABLE IF NOT EXISTS payment_intents (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id),
  provider TEXT NOT NULL DEFAULT 'daraja',
  provider_transaction_id TEXT,
  checkout_request_id TEXT UNIQUE,
  merchant_request_id TEXT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  result_code TEXT,
  result_description TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  paid_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_payment_booking ON payment_intents(booking_id,created_at);

CREATE TABLE IF NOT EXISTS payment_callbacks (
  id TEXT PRIMARY KEY,
  payment_intent_id TEXT NOT NULL REFERENCES payment_intents(id),
  checkout_request_id TEXT NOT NULL,
  result_code TEXT NOT NULL,
  result_description TEXT NOT NULL DEFAULT '',
  receipt_number TEXT,
  amount REAL,
  raw_payload_json TEXT NOT NULL,
  processed_at TEXT NOT NULL,
  UNIQUE(checkout_request_id,result_code)
);

CREATE TABLE IF NOT EXISTS disputes (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id),
  raised_by_user_id TEXT NOT NULL REFERENCES users(id),
  reason TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','under_review','resolved','closed')),
  resolution_notes TEXT NOT NULL DEFAULT '',
  resolved_by TEXT,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status,created_at);

CREATE TABLE IF NOT EXISTS verification_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  verification_type TEXT NOT NULL CHECK(verification_type IN ('identity','property','authority')),
  media_id TEXT REFERENCES media_assets(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  notes TEXT NOT NULL DEFAULT '',
  submitted_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewer_id TEXT
);

CREATE TABLE IF NOT EXISTS upload_intents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  context_id TEXT NOT NULL DEFAULT '',
  media_id TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  window_started_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bookings_space_dates ON bookings(space_id,start_date,end_date,status);
CREATE INDEX IF NOT EXISTS idx_bookings_renter ON bookings(renter_user_id,created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_host_email ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_spaces_town ON spaces(town,neighbourhood,status);
