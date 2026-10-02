/**
 * ZevairaLifestyle — Customer Auth Module
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixes:
 *  • Caches user in localStorage → no flash on page load
 *  • Header icon opens dropdown (My Account + Sign Out) — does NOT navigate
 *  • onSnapshot for real-time order updates
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
  getDocs, onSnapshot, orderBy
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* ── localStorage cache keys ─────────────────────────────────────────────── */
const CACHE_KEY = 'zevaira_auth_cache';

function cacheUser(user) {
  if (user) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      uid:         user.uid,
      displayName: user.displayName || '',
      email:       user.email || '',
      photoURL:    user.photoURL || ''
    }));
  } else {
    localStorage.removeItem(CACHE_KEY);
  }
}

function getCachedUser() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)); } catch { return null; }
}

/* ── Apply cached user immediately on load (prevents flash) ──────────────── */
const cachedUser = getCachedUser();
if (cachedUser) {
  window._zevairaCurrentUser = cachedUser; // interim
  window.dispatchEvent(new CustomEvent('zevaira-auth-changed', { detail: { user: cachedUser, cached: true } }));
}

/* ── Wait for Firebase ready ─────────────────────────────────────────────── */
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

/* ── Main setup ──────────────────────────────────────────────────────────── */
waitForFirebase().then(({ auth, db }) => {
  const googleProvider = new GoogleAuthProvider();

  /* ── Auth state change → update cache + header ───────────────────────── */
  onAuthStateChanged(auth, (user) => {
    window._zevairaCurrentUser = user || null;
    cacheUser(user); // save or clear cache
    updateHeaderAccountIcon(user);
    window.dispatchEvent(new CustomEvent('zevaira-auth-changed', { detail: { user, cached: false } }));
  });

  /* ── Header account icon → dropdown ─────────────────────────────────── */
  function updateHeaderAccountIcon(user) {
    const btn = document.getElementById('headerAccountBtn');
    if (!btn) return;

    if (user) {
      const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
      const photo   = user.photoURL;
      btn.innerHTML = photo
        ? `<img src="${photo}" alt="${user.displayName||'Account'}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);">`
        : `<span style="display:inline-flex;align-items:center;justify-content:center;
            width:28px;height:28px;border-radius:50%;
            background:var(--gold);color:#fff;font-size:12px;font-weight:700;
            border:2px solid #D9B15A;">${initial}</span>`;
      btn.setAttribute('aria-label', `Account menu for ${user.displayName || user.email}`);
      btn.setAttribute('data-logged-in', 'true');
    } else {
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`;
      btn.setAttribute('aria-label', 'Sign in to your account');
      btn.removeAttribute('data-logged-in');
    }
  }

  /* ── Inject dropdown into DOM once ──────────────────────────────────── */
  function ensureDropdown() {
    if (document.getElementById('accountDropdown')) return;
    const dropdown = document.createElement('div');
    dropdown.id = 'accountDropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.innerHTML = `
      <a href="account.html" role="menuitem" id="ddMyAccount"
         style="display:flex;align-items:center;gap:10px;padding:12px 18px;font-size:14px;
                color:var(--text);text-decoration:none;border-bottom:1px solid var(--line);
                font-weight:600;transition:background .15s;"
         onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background=''">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        My Account
      </a>
      <button id="ddSignOut" role="menuitem"
        style="display:flex;align-items:center;gap:10px;width:100%;padding:12px 18px;
               font-size:14px;font-family:inherit;background:none;border:none;
               color:var(--danger,#c0392b);cursor:pointer;font-weight:600;transition:background .15s;"
        onmouseover="this.style.background='#fff0f0'" onmouseout="this.style.background=''">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sign Out
      </button>`;

    Object.assign(dropdown.style, {
      position:    'absolute',
      top:         '100%',
      right:       '0',
      marginTop:   '8px',
      background:  'var(--surface, #FBF7EA)',
      border:      '1px solid var(--line)',
      borderRadius:'10px',
      boxShadow:   '0 8px 32px rgba(15,42,29,.18)',
      minWidth:    '190px',
      zIndex:      '9999',
      display:     'none',
      overflow:    'hidden'
    });

    // Attach to the btn's parent (position:relative needed)
    const btn = document.getElementById('headerAccountBtn');
    if (btn) {
      btn.style.position = 'relative';
      btn.parentElement.style.position = 'relative';
      btn.parentElement.appendChild(dropdown);
    }

    // Sign out click
    document.getElementById('ddSignOut').addEventListener('click', async () => {
      closeDropdown();
      await signOut(auth);
      if (typeof showToast === 'function') showToast('Signed out successfully.');
      // If on account page redirect home
      if (window.location.pathname.includes('account.html')) {
        window.location.href = 'index.html';
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!btn.parentElement.contains(e.target)) closeDropdown();
    });
  }

  function openDropdown() {
    const d = document.getElementById('accountDropdown');
    if (d) d.style.display = 'block';
  }
  function closeDropdown() {
    const d = document.getElementById('accountDropdown');
    if (d) d.style.display = 'none';
  }

  /* ── Wire the header account button click ────────────────────────────── */
  function wireAccountBtn() {
    const btn = document.getElementById('headerAccountBtn');
    if (!btn || btn._zAuthWired) return;
    btn._zAuthWired = true;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const loggedIn = btn.getAttribute('data-logged-in') === 'true';
      if (loggedIn) {
        ensureDropdown();
        const d = document.getElementById('accountDropdown');
        d.style.display = d.style.display === 'block' ? 'none' : 'block';
      } else {
        window.location.href = 'account.html';
      }
    });
  }

  // Wire immediately + after header injection
  wireAccountBtn();
  document.addEventListener('DOMContentLoaded', wireAccountBtn);
  window.addEventListener('zevaira-header-injected', wireAccountBtn);

  /* ── Kick off initial icon update if cached user was applied ─────────── */
  if (cachedUser) updateHeaderAccountIcon(cachedUser);

  /* ── Real-time orders subscription ──────────────────────────────────── */
  function subscribeToMyOrders(uid, callback) {
    try {
      return onSnapshot(
        query(collection(db, 'orders'), where('userId', '==', uid), orderBy('createdAt', 'desc')),
        (snap) => callback(snap.docs.map(d => ({ _id: d.id, ...d.data() }))),
        (err) => {
          console.warn('[Zevaira] Orders snapshot error:', err.message);
          callback([]);
        }
      );
    } catch (e) {
      console.warn('[Zevaira] Orders subscribe failed:', e.message);
      callback([]);
      return () => {};
    }
  }

  /* ── One-time order fetch (fallback) ─────────────────────────────────── */
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

  /* Google Sign-In */
  async function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  /* Email Sign-Up */
  async function signUpWithEmail(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    return cred.user;
  }

  /* Email Sign-In */
  async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /* ── Sign Out ────────────────────────────────────────────────────────── */
  async function signOutUser() {
    return signOut(auth);
  }

  /* ── Password Reset ──────────────────────────────────────────────────── */
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  /* ── Expose on window ────────────────────────────────────────────────── */
  window.zAuth = {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut: signOutUser,
    resetPassword,
    loadMyOrders,
    subscribeToMyOrders,
    getCurrentUser: () => window._zevairaCurrentUser || null,
    getCachedUser
  };

  window.dispatchEvent(new CustomEvent('zevaira-auth-ready'));
});

