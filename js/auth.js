/**
 * ZevairaLifestyle — Customer Auth Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles customer Google + Email/Password sign-in on public pages.
 * Exposes: window.zAuth (sign in, sign out, current user, onAuthChange)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

import {
  getFirestore,
  collection, query, where,
  getDocs, orderBy
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* ─── Wait for Firebase ready ────────────────────────────────────────────── */
function waitForFirebase() {
  return new Promise((resolve) => {
    if (window._zevairaFirebaseAuth) {
      resolve({ auth: window._zevairaFirebaseAuth, db: window._zevairaFirestoreDb });
    } else {
      window.addEventListener('zevaira-firebase-ready', (e) => {
        resolve({ auth: e.detail.auth, db: e.detail.db });
      }, { once: true });
    }
  });
}

/* ─── Main auth setup ────────────────────────────────────────────────────── */
waitForFirebase().then(({ auth, db }) => {
  const googleProvider = new GoogleAuthProvider();

  /* ── Listen for auth state changes → update header account icon ────────── */
  onAuthStateChanged(auth, (user) => {
    window._zevairaCurrentUser = user || null;
    updateHeaderAccountIcon(user);
    // Notify any page-level listeners
    window.dispatchEvent(new CustomEvent('zevaira-auth-changed', { detail: { user } }));
  });

  /* ── Update the header account icon based on login state ──────────────── */
  function updateHeaderAccountIcon(user) {
    const btn = document.getElementById('headerAccountBtn');
    if (!btn) return;
    if (user) {
      const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
      btn.innerHTML = `<span style="
        display:inline-flex;align-items:center;justify-content:center;
        width:28px;height:28px;border-radius:50%;
        background:var(--gold);color:#fff;font-size:12px;font-weight:700;
        border:2px solid var(--gold-lt, #D9B15A);">${initial}</span>`;
      btn.setAttribute('aria-label', `My Account (${user.displayName || user.email})`);
    } else {
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`;
      btn.setAttribute('aria-label', 'Sign in to your account');
    }
  }

  /* ── Google Sign-In ───────────────────────────────────────────────────── */
  async function signInWithGoogle() {
    const auth2 = getAuth();
    return signInWithPopup(auth2, googleProvider);
  }

  /* ── Email Sign-Up ────────────────────────────────────────────────────── */
  async function signUpWithEmail(name, email, password) {
    const auth2 = getAuth();
    const cred = await createUserWithEmailAndPassword(auth2, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    return cred.user;
  }

  /* ── Email Sign-In ────────────────────────────────────────────────────── */
  async function signInWithEmail(email, password) {
    const auth2 = getAuth();
    return signInWithEmailAndPassword(auth2, email, password);
  }

  /* ── Sign Out ─────────────────────────────────────────────────────────── */
  async function signOutUser() {
    const auth2 = getAuth();
    return signOut(auth2);
  }

  /* ── Password Reset ───────────────────────────────────────────────────── */
  async function resetPassword(email) {
    const auth2 = getAuth();
    return sendPasswordResetEmail(auth2, email);
  }

  /* ── Load Order History for current user ─────────────────────────────── */
  async function loadMyOrders(uid) {
    try {
      const snap = await getDocs(
        query(collection(db, 'orders'), where('userId', '==', uid), orderBy('createdAt', 'desc'))
      );
      return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
    } catch (e) {
      console.warn('[Zevaira Auth] Could not load orders:', e.message);
      return [];
    }
  }

  /* ── Expose on window ────────────────────────────────────────────────── */
  window.zAuth = {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut: signOutUser,
    resetPassword,
    loadMyOrders,
    getCurrentUser: () => window._zevairaCurrentUser || null
  };

  // Signal ready
  window.dispatchEvent(new CustomEvent('zevaira-auth-ready'));
});
