const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Read config from environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL; // e.g. https://api.example.com/v1/endpoint
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

if (!GEMINI_API_KEY || !GEMINI_API_URL) {
  console.warn('Warning: GEMINI_API_KEY or GEMINI_API_URL not configured. Proxy will return 500 until configured.');
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
    // Try to parse JSON, otherwise return raw text
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

    // Fallback to file-based DB
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

app.put('/api/cms', async (req, res) => {
  try {
    const payload = req.body;
    if (firestore) {
      await firestore.collection('site').doc('cmsData').set(payload, { merge: false });
      return res.json({ ok: true });
    }

    // Fallback: write to disk
    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf8');
    return res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/cms error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server proxy listening on port ${PORT}`);
});
