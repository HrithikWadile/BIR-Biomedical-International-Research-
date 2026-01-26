const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
// Trust proxy headers (Cloud Run / Cloudflare) so req.secure works
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

// ---- Rate limiter and request logging ----
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '') || 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '') || 200; // max requests per window per IP
const rateLimitMap = new Map(); // ip -> { count, start }
const alertedIPs = new Set(); // avoid alerting repeatedly for same IP

async function sendAlert(payload) {
  try {
    const webhook = process.env.ALERT_WEBHOOK_URL;
    const message = { ts: new Date().toISOString(), ...payload };
    if (webhook) {
      // best-effort POST to webhook
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      }).catch((e) => console.error('Alert webhook error', e));
    } else {
      // fallback to console warning
      console.warn('ALERT:', JSON.stringify(message));
    }
  } catch (e) {
    console.error('sendAlert failed', e);
  }
}

// Cleanup old entries periodically to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of rateLimitMap.entries()) {
    if (now - info.start > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(ip);
      alertedIPs.delete(ip);
    }
  }
}, Math.max(60_000, Math.floor(RATE_LIMIT_WINDOW_MS / 2)));

const rateLimiter = (req, res, next) => {
  try {
    const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown').toString();
    const now = Date.now();
    let entry = rateLimitMap.get(ip);
    if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
      entry = { count: 1, start: now };
    } else {
      entry.count += 1;
    }
    rateLimitMap.set(ip, entry);

    if (entry.count > RATE_LIMIT_MAX) {
      const retryAfter = Math.ceil((entry.start + RATE_LIMIT_WINDOW_MS - now) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      // alert once per IP
      if (!alertedIPs.has(ip)) {
        alertedIPs.add(ip);
        sendAlert({ level: 'warning', reason: 'rate_limit_exceeded', ip, path: req.path, count: entry.count });
      }
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  } catch (e) {
    console.error('rateLimiter error', e);
    next();
  }
};

// simple request logger that records duration and status, and alerts on 5xx
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown').toString();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const msg = `${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms) from ${ip}`;
    if (res.statusCode >= 500) {
      console.error(msg);
      sendAlert({ level: 'error', reason: 'server_error', status: res.statusCode, method: req.method, path: req.originalUrl, ip, duration });
    } else if (res.statusCode >= 400) {
      console.warn(msg);
    } else {
      console.log(msg);
    }
  });
  next();
};

app.use(rateLimiter);
app.use(requestLogger);

// Basic health/root endpoints (useful on Cloud Run)
app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('OK');
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, ts: new Date().toISOString() });
});


const PORT = process.env.PORT || 4000;

// ---- Admin session (cookie) auth ----
// Configure these on the server (Cloud Run):
// - ADMIN_PASSWORD: the admin password
// - SESSION_SECRET: random long secret used to sign session tokens
// Optional: keep using ADMIN_API_TOKEN (header) for automation/worker usage.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || '';
const SESSION_COOKIE_NAME = 'bir_admin_session';
const SESSION_TTL_MS = parseInt(process.env.SESSION_TTL_MS || '') || 7 * 24 * 60 * 60 * 1000; // 7 days

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(input) {
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, 'base64').toString('utf8');
}

function signHmac(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function createSessionToken() {
  if (!SESSION_SECRET) return null;
  const data = { v: 1, exp: Date.now() + SESSION_TTL_MS };
  const payload = base64UrlEncode(JSON.stringify(data));
  const sig = signHmac(payload, SESSION_SECRET);
  return `${payload}.${sig}`;
}

function parseCookies(req) {
  const header = req.headers && req.headers.cookie;
  const out = {};
  if (!header) return out;
  const parts = header.split(';');
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  }
  return out;
}

function verifySessionToken(token) {
  if (!token || !SESSION_SECRET) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = signHmac(payload, SESSION_SECRET);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!crypto.timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const decoded = JSON.parse(base64UrlDecode(payload));
    if (!decoded || typeof decoded.exp !== 'number') return false;
    return Date.now() < decoded.exp;
  } catch {
    return false;
  }
}

function isHttps(req) {
  if (req.secure) return true;
  const proto = (req.headers['x-forwarded-proto'] || '').toString().toLowerCase();
  return proto === 'https';
}

function requireAdmin(req, res, next) {
  const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;

  // 1) Header token (useful for internal tooling / workers)
  if (ADMIN_API_TOKEN) {
    const provided = req.headers['x-admin-token'] || req.headers['x-admin-token'.toLowerCase()];
    if (provided && provided === ADMIN_API_TOKEN) return next();
  }

  // 2) Signed session cookie
  const cookies = parseCookies(req);
  const session = cookies[SESSION_COOKIE_NAME];
  if (verifySessionToken(session)) return next();

  // 3) If no server-side protection configured at all, allow (simple setups)
  if (!ADMIN_API_TOKEN && !ADMIN_PASSWORD) return next();

  return res.status(401).json({ error: 'Unauthorized' });
}

// Admin auth endpoints
app.post('/api/admin/login', (req, res) => {
  try {
    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ error: 'ADMIN_PASSWORD not configured on server' });
    }
    if (!SESSION_SECRET) {
      return res.status(500).json({ error: 'SESSION_SECRET not configured on server' });
    }
    const { password } = req.body || {};
    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credential' });
    }

    const token = createSessionToken();
    if (!token) {
      return res.status(500).json({ error: 'Unable to create session' });
    }

    const secure = isHttps(req);
    const cookie = `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure ? '; Secure' : ''}`;
    res.setHeader('Set-Cookie', cookie);
    return res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/admin/login error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  const secure = isHttps(req);
  const cookie = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookie);
  res.json({ ok: true });
});

const fs = require('fs');
const path = require('path');
const DB_FILE = path.resolve(__dirname, 'db.json');
let firestore = null;

// Support either JSON string in FIREBASE_SERVICE_ACCOUNT_JSON or a file path in FIREBASE_SERVICE_ACCOUNT_PATH
const saJsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const saPathEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
let useFirebase = false;
let credJson = null;

if (saJsonEnv) {
  try {
    credJson = JSON.parse(saJsonEnv);
    useFirebase = true;
  } catch (err) {
    console.error('FIREBASE_SERVICE_ACCOUNT_JSON is set but invalid JSON:', err);
  }
} else if (saPathEnv) {
  try {
    const resolved = path.isAbsolute(saPathEnv) ? saPathEnv : path.resolve(process.cwd(), saPathEnv);
    const raw = fs.readFileSync(resolved, 'utf8');
    credJson = JSON.parse(raw);
    useFirebase = true;
  } catch (err) {
    console.error('FIREBASE_SERVICE_ACCOUNT_PATH is set but file could not be read or parsed:', err);
  }
}

if (useFirebase && credJson) {
  try {
    const admin = require('firebase-admin');
    admin.initializeApp({ credential: admin.credential.cert(credJson) });
    firestore = admin.firestore();
    console.log('Firebase Admin initialized - using Firestore for CMS persistence.');
  } catch (err) {
    console.error('Failed to initialize Firebase Admin:', err);
  }
}

// If Firestore wasn't initialized with an explicit service account JSON/path,
// attempt Application Default Credentials (ADC). This allows the server to
// run on Cloud Run / GCE with an attached service account without shipping
// a JSON key file into the repository or environment.
if (!firestore) {
  try {
    const admin = require('firebase-admin');
    // initializeApp() without explicit credentials will use ADC when available
    admin.initializeApp();
    firestore = admin.firestore();
    console.log('Firebase Admin initialized using Application Default Credentials (ADC).');
  } catch (err) {
    console.log('Firebase Admin ADC init skipped or failed:', err && err.message ? err.message : err);
  }
}

// Read config from environment for Gemini proxy
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL; // e.g. https://api.example.com/v1/endpoint

if (!GEMINI_API_KEY || !GEMINI_API_URL) {
  console.warn('Warning: GEMINI_API_KEY or GEMINI_API_URL not configured. Proxy may return 500 until configured.');
}

// Basic proxy endpoint. Expects POST { input: { ... } } and forwards to GEMINI_API_URL
app.post('/api/gemini-proxy', async (req, res) => {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    return res.status(500).json({ error: 'Server not configured with GEMINI_API_KEY or GEMINI_API_URL' });
  }

  try {
    const upstreamResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const text = await upstreamResponse.text();
    try {
      const json = JSON.parse(text);
      res.status(upstreamResponse.status).json(json);
    } catch (e) {
      res.status(upstreamResponse.status).send(text);
    }
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Proxy error' });
  }
});

// CMS persistence endpoints
app.get('/api/cms', async (req, res) => {
  try {
    if (firestore) {
      const doc = await firestore.collection('site').doc('cmsData').get();
      if (!doc.exists) return res.status(404).json({ error: 'No CMS data available' });
      return res.json(doc.data());
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      return res.json(JSON.parse(raw));
    }

    return res.status(404).json({ error: 'No CMS data available' });
  } catch (err) {
    console.error('GET /api/cms error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/cms', requireAdmin, async (req, res) => {
  console.log('PUT /api/cms called from', req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  try {
    const payload = req.body;
    if (firestore) {
      await firestore.collection('site').doc('cmsData').set(payload, { merge: false });
      console.log('Saved CMS data to Firestore: site/cmsData');
      return res.json({ ok: true });
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
    console.log('Saved CMS data to local DB file:', DB_FILE);
    return res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/cms error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server proxy listening on port ${PORT}`);
});
