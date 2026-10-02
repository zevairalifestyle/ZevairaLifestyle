/**
 * ZevairaLifestyle — Firestore Public-Side Sync Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * Loaded as type="module" on public pages (index, shop, product, checkout).
 *
 * What it does:
 *  1. loadProductsFromFirestore()     → returns Array of product objects or null
 *  2. loadSettingsFromFirestore()     → returns settings object or null
 *  3. loadDiscountCodesFromFirestore()→ returns discount codes object or null
 *  4. saveOrderToFirestore(order)     → writes order document, returns doc ID
 *
 * If Firestore is unavailable or empty the callers fall back to the static data
 * already defined in js/products.js and js/app.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  collection, doc,
  getDocs, addDoc, query, orderBy, where,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* ─── Wait for Firebase to be ready ──────────────────────────────────────── */
function getDb() {
  return new Promise((resolve, reject) => {
    if (window._zevairaFirestoreDb) {
      resolve(window._zevairaFirestoreDb);
    } else {
      const onReady = (e) => {
        window.removeEventListener('zevaira-firebase-ready', onReady);
        resolve(e.detail.db);
      };
      window.addEventListener('zevaira-firebase-ready', onReady);
      // Timeout after 8 s — fall back to static data
      setTimeout(() => {
        window.removeEventListener('zevaira-firebase-ready', onReady);
        reject(new Error('Firebase not ready (timeout)'));
      }, 8000);
    }
  });
}

/* ─── 1. Load Products ────────────────────────────────────────────────────── */
/**
 * Fetch all products from the `products` collection ordered by `sortOrder`.
 * Returns an Array of product objects (same shape as window.PRODUCTS in products.js),
 * or null if Firestore is unavailable or the collection is empty.
 */
async function loadProductsFromFirestore() {
  try {
    const db = await getDb();
    const snap = await getDocs(query(collection(db, 'products'), orderBy('sortOrder', 'asc')));
    if (snap.empty) return null;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('[Zevaira] Firestore products load failed:', err.message);
    return null;
  }
}

/* ─── 2. Load Settings ────────────────────────────────────────────────────── */
/**
 * Fetch the single settings document `settings/store`.
 * Returns an object with whatsappNumber, freeDeliveryThreshold, deliveryFee,
 * giftWrapFee, paymentAccounts — or null on failure.
 */
async function loadSettingsFromFirestore() {
  try {
    const db = await getDb();
    const { getDoc } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
    const snap = await getDoc(doc(db, 'settings', 'store'));
    if (!snap.exists()) return null;
    return snap.data();
  } catch (err) {
    console.warn('[Zevaira] Firestore settings load failed:', err.message);
    return null;
  }
}

/* ─── 3. Load Discount Codes ─────────────────────────────────────────────── */
/**
 * Fetch all documents from the `discountCodes` collection.
 * Returns an object keyed by code (e.g. { "ZEVAIRA10": { rate, label, enabled, expiry } })
 * or null on failure.
 */
async function loadDiscountCodesFromFirestore() {
  try {
    const db = await getDb();
    const snap = await getDocs(collection(db, 'discountCodes'));
    if (snap.empty) return null;
    const codes = {};
    snap.docs.forEach(d => {
      const data = d.data();
      // Only use enabled codes that haven't expired
      if (data.enabled) {
        if (!data.expiry || new Date(data.expiry) > new Date()) {
          codes[d.id.toUpperCase()] = { rate: data.rate, label: data.label };
        }
      }
    });
    return Object.keys(codes).length ? codes : null;
  } catch (err) {
    console.warn('[Zevaira] Firestore discount codes load failed:', err.message);
    return null;
  }
}

/* ─── 4. Save Order ──────────────────────────────────────────────────────── */
/**
 * Write an order to Firestore `orders` collection.
 * The Firestore security rules allow anyone to create an order with valid fields.
 * Returns the Firestore document ID or null on failure.
 * NOTE: The WhatsApp redirect still happens regardless of this call's result.
 */
async function saveOrderToFirestore(orderData) {
  try {
    const db = await getDb();
    const payload = {
      orderId:       orderData.orderId       || '',
      createdAt:     serverTimestamp(),
      customerName:  orderData.customer?.name    || '',
      customerPhone: orderData.customer?.phone   || '',
      customerEmail: orderData.customer?.email   || '',
      city:          orderData.customer?.city    || '',
      address:       orderData.customer?.address || '',
      postal:        orderData.customer?.postal  || '',
      notes:         orderData.customer?.notes   || '',
      items:         orderData.items             || [],
      subtotal:      Number(orderData.subtotal)  || 0,
      discount:      Number(orderData.discount)  || 0,
      discountCode:  orderData.discountCode      || '',
      giftWrap:      Number(orderData.giftWrap)  || 0,
      deliveryFee:   Number(orderData.deliveryFee) || 0,
      total:         Number(orderData.total)     || 0,
      paymentMethod: orderData.paymentMethod     || '',
      status:        'New'  // default status — admin changes this in admin.html
    };
    const docRef = await addDoc(collection(db, 'orders'), payload);
    console.log('[Zevaira] Order saved to Firestore:', docRef.id);
    return docRef.id;
  } catch (err) {
    console.warn('[Zevaira] Firestore order save failed (WhatsApp still works):', err.message);
    return null;
  }
}

/* ─── Apply Firestore settings to the running app ───────────────────────── */
/**
 * Called once on page load. Reads settings from Firestore and overwrites the
 * app.js runtime globals (window.WHATSAPP_NUMBER, DISCOUNT_CODES, etc.) so
 * the admin can change these values without editing files.
 */
async function applyFirestoreSettings() {
  const settings = await loadSettingsFromFirestore();
  if (settings) {
    if (settings.whatsappNumber)       window.WHATSAPP_NUMBER          = settings.whatsappNumber;
    if (settings.freeDeliveryThreshold) window.FREE_DELIVERY_THRESHOLD = Number(settings.freeDeliveryThreshold);
    if (settings.deliveryFee !== undefined) window.STANDARD_DELIVERY_FEE = Number(settings.deliveryFee);
    if (settings.giftWrapFee !== undefined) window.GIFT_WRAP_FEE        = Number(settings.giftWrapFee);
    if (settings.paymentAccounts)      window.PAYMENT_ACCOUNTS         = settings.paymentAccounts;
  }

  const codes = await loadDiscountCodesFromFirestore();
  if (codes) {
    window.DISCOUNT_CODES = codes;
  }
}

/**
 * Load Firestore products and, if any exist, overwrite window.PRODUCTS so
 * the shop/product pages use live admin-managed data instead of the static file.
 */
async function applyFirestoreProducts() {
  const products = await loadProductsFromFirestore();
  if (products && products.length > 0) {
    window.PRODUCTS = products;
    // Dispatch event so any already-rendered page can refresh its grid
    window.dispatchEvent(new CustomEvent('zevaira-products-updated', { detail: { products } }));
  }
}

/* ─── Kick off on load ───────────────────────────────────────────────────── */
// Settings and products load in parallel; neither blocks page render
Promise.all([applyFirestoreSettings(), applyFirestoreProducts()])
  .then(() => {
    window.dispatchEvent(new CustomEvent('zevaira-store-ready'));
  });

/* ─── Expose functions for checkout.html ────────────────────────────────── */
window.saveOrderToFirestore        = saveOrderToFirestore;
window.loadProductsFromFirestore   = loadProductsFromFirestore;
window.loadSettingsFromFirestore   = loadSettingsFromFirestore;
window.loadDiscountCodesFromFirestore = loadDiscountCodesFromFirestore;
