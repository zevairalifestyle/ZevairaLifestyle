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

const firebaseConfig = {
  apiKey:            "AIzaSyCq1VV3Ut_WngX63TTEp0BlCsrSGT5NELw",
  authDomain:        "zevairalifestyle-212ed.firebaseapp.com",
  projectId:         "zevairalifestyle-212ed",
  storageBucket:     "zevairalifestyle-212ed.firebasestorage.app",
  messagingSenderId: "832478949535",
  appId:             "1:832478949535:web:d967a0bce5a970c605b2aa",
  measurementId:     "G-RH2Q53WT2Y"
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
