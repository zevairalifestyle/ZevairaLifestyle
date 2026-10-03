import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.disable('x-powered-by');

// Security & caching headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  if (req.path.match(/\.(html)$/) || req.path === '/' || req.path === '') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else if (req.path.match(/\.(css|js|svg|jpg|jpeg|png|webp|mp4|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
  }
  next();
});

// Safe runtime Firebase configuration endpoint
app.get('/api/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyCq1VV3Ut_WngX63TTEp0BlCsrSGT5NELw',
    authDomain: 'zevairalifestyle-212ed.firebaseapp.com',
    projectId: 'zevairalifestyle-212ed',
    storageBucket: 'zevairalifestyle-212ed.firebasestorage.app',
    messagingSenderId: '832478949535',
    appId: '1:832478949535:web:d967a0bce5a970c605b2aa',
    measurementId: 'G-RH2Q53WT2Y'
  });
});

const publicDir = path.join(__dirname, 'public');

// Serve static files from public directory with HTML extension support
app.use(express.static(publicDir, {
  extensions: ['html', 'htm']
}));

// Route fallback: send 404.html if route not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`ZevairaLifestyle server running on http://${HOST}:${PORT}`);
});
