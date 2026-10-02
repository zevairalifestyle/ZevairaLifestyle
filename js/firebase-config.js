/**
 * ZevairaLifestyle — Firebase Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  REPLACE the firebaseConfig object below with YOUR actual config.
 *      Firebase Console → Project Settings → Your Apps → Web App → SDK snippet
 * ─────────────────────────────────────────────────────────────────────────────
 * This file uses the Firebase Modular SDK (v10) loaded from the official CDN.
 * It exposes `window.db` (Firestore) and `window.auth` (Firebase Auth) so that
 * the rest of the site (classic <script> tags) can call them.
 * ─────────────────────────────────────────────────────────────────────────────
 * Pinned SDK version: 10.12.2  (safe, well-tested, no build tools required)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initializeApp }     from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore }      from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth }           from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ⚠️ REPLACE EVERY VALUE BELOW WITH YOUR OWN — copy from Firebase Console
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",          // e.g. "your-project.firebaseapp.com"
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",           // e.g. "zevairalifestyle"
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",       // e.g. "your-project.appspot.com"
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",  // e.g. "123456789012"
  appId:             "PASTE_YOUR_APP_ID_HERE"                // e.g. "1:123456789012:web:abc123def456"
};

// Initialise
const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

// Expose on window so classic (non-module) scripts can import them
window._zevairaFirebaseApp  = app;
window._zevairaFirestoreDb  = db;
window._zevairaFirebaseAuth = auth;

// Signal that Firebase is ready — public scripts listen for this event
window.dispatchEvent(new CustomEvent('zevaira-firebase-ready', { detail: { db, auth } }));
