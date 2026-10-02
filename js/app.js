/**
 * ZevairaLifestyle - Master Application Engine
 * --------------------------------------------------------------------------
 * Handles:
 * 1. Global Business Configuration (WhatsApp, Email, Video, Payment Accounts)
 * 2. Header, Footer, and Floating Action Injection
 * 3. Shopping Cart (localStorage)
 * 4. Wishlist (localStorage)
 * 5. Search Modal and Quick Suggestions
 * 6. Dark / Light Mode Toggle
 * 7. Toast Notifications
 * 8. Order Processing & WhatsApp Dispatch Integration
 * --------------------------------------------------------------------------
 */

/* ==========================================================================
   1. EDITABLE BUSINESS CONFIGURATION (EDIT YOUR DETAILS HERE)
   ========================================================================== */

// Official Instagram Profile - ONLY social media link anywhere on the site
const INSTAGRAM_URL = "https://www.instagram.com/zevairalifestyle";

// WhatsApp Number for customer orders and support (format: country code + number without plus or dashes)
// SAMPLE: Replace with your actual WhatsApp number, e.g., "923001234567"
const WHATSAPP_NUMBER = "923001234567";

// Store Support Email
// SAMPLE: Replace with your actual email
const STORE_EMAIL = "zevairalifestyle@gmail.com";

// Store Phone for standard telephone calls
const STORE_PHONE = "+92 300 1234567";

// Hero Video path (set to an mp4 file in your site; if missing or empty, the animated flacon is shown)
const HERO_VIDEO_SRC = "videos/hero.mp4";

// Free Delivery Threshold in PKR (Rs)
const FREE_DELIVERY_THRESHOLD = 6000;

// Standard Delivery Fee under threshold in PKR (Rs)
const STANDARD_DELIVERY_FEE = 250;

// Luxury Gift Wrap Fee in PKR (Rs)
const GIFT_WRAP_FEE = 200;

// Active Discount Voucher Codes
const DISCOUNT_CODES = {
  "ZEVAIRA10": { rate: 0.10, label: "10% Off Sitewide (ZEVAIRA10)" },
  "WELCOME5": { rate: 0.05, label: "5% Welcome Discount (WELCOME5)" }
};

// SAMPLE PAYMENT ACCOUNT DETAILS (Edit these once, used everywhere)
const PAYMENT_ACCOUNTS = {
  cod: {
    name: "Cash on Delivery (COD)",
    desc: "Pay in cash directly to the courier rider upon delivery at your doorstep anywhere in Pakistan."
  },
  easypaisa: {
    name: "EasyPaisa",
    title: "Zevaira Lifestyle",
    accountNumber: "0300 1234567",
    instructions: "Transfer to EasyPaisa Mobile Account: 0300 1234567 (Title: Zevaira Lifestyle). Send screenshot on WhatsApp for instant confirmation."
  },
  jazzcash: {
    name: "JazzCash",
    title: "Zevaira Lifestyle",
    accountNumber: "0300 1234567",
    instructions: "Transfer to JazzCash Mobile Account: 0300 1234567 (Title: Zevaira Lifestyle). Send screenshot on WhatsApp for instant confirmation."
  },
  upaisa: {
    name: "UPaisa",
    title: "Zevaira Lifestyle",
    accountNumber: "0300 1234567",
    instructions: "Transfer to UPaisa Wallet: 0300 1234567 (Title: Zevaira Lifestyle). Share receipt on WhatsApp."
  },
  bank: {
    name: "Bank Transfer",
    bankName: "Meezan Bank Ltd",
    title: "Zevaira Lifestyle",
    accountNumber: "01020304050607",
    iban: "PK64MEZN0001020304050607",
    instructions: "Transfer to Meezan Bank Ltd (Title: Zevaira Lifestyle | Account: 01020304050607 | IBAN: PK64MEZN0001020304050607). Share transfer receipt on WhatsApp."
  }
};

/* ==========================================================================
   2. FORMATTERS & UTILITIES
   ========================================================================== */
function formatPKR(num) {
  return "Rs " + Math.round(num || 0).toLocaleString("en-PK");
}

function getProductById(id) {
  if (typeof PRODUCTS === "undefined") return null;
  return PRODUCTS.find(p => p.id === id) || null;
}

/* ==========================================================================
   3. CART & WISHLIST STORAGE
   ========================================================================== */
const CART_STORAGE_KEY = "zevaira_cart";
const WISHLIST_STORAGE_KEY = "zevaira_wishlist";
const THEME_STORAGE_KEY = "zevaira_theme";
const RECENT_STORAGE_KEY = "zevaira_recent";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateHeaderBadges();
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
}

function addToCart(productId, size, qty = 1) {
  const product = getProductById(productId);
  if (!product) return false;

  const sizeObj = product.sizes.find(s => s.size === size) || product.sizes[0];
  const price = sizeObj.price;
  const cart = getCart();

  const existingIndex = cart.findIndex(item => item.id === productId && item.size === sizeObj.size);

  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      size: sizeObj.size,
      price: price,
      qty: qty
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name} (${sizeObj.size})" to cart.`);
  return true;
}

function updateCartQty(productId, size, newQty) {
  let cart = getCart();
  if (newQty <= 0) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
  } else {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (item) item.qty = newQty;
  }
  saveCart(cart);
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  showToast("Item removed from your cart.");
}

function getCartTotalCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateHeaderBadges();
}

// Wishlist
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const product = getProductById(productId);
  const name = product ? product.name : "Fragrance";

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Removed "${name}" from your wishlist.`);
  } else {
    wishlist.push(productId);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Added "${name}" to your wishlist.`);
  }
  updateHeaderBadges();
  window.dispatchEvent(new CustomEvent("wishlist-updated", { detail: { wishlist } }));
  return wishlist.includes(productId);
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// Recently Viewed
function trackRecentlyViewed(productId) {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY)) || [];
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    recent = recent.slice(0, 5); // Keep latest 5
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent));
  } catch (e) {}
}

function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

/* ==========================================================================
   4. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : ""}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === "error" ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   5. HEADER & FOOTER INJECTION
   ========================================================================== */
function injectHeaderAndFooter() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Check active state helper
  const isActive = (page) => {
    if (page === "index.html" && (currentPath === "" || currentPath === "index.html")) return 'class="active" aria-current="page"';
    return currentPath === page ? 'class="active" aria-current="page"' : "";
  };

  // Header HTML Template
  const headerMarkup = `
    <!-- Top Announcement Bar -->
    <div class="announcement-bar" role="region" aria-label="Store announcement">
      <div class="container">
        <div class="announcement-content">
          <span>Free delivery above Rs 6,000</span>
          <span>Cash on delivery across Pakistan</span>
          <span>100% Authentic Extrait de Parfum</span>
        </div>
      </div>
    </div>

    <!-- Sticky Header -->
    <header class="site-header" role="banner">
      <div class="container">
        <div class="header-inner">
          
          <!-- Left: Mobile Menu Trigger + Brand Logo -->
          <div class="header-left">
            <button class="hamburger-btn" id="openMobileMenuBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileDrawer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <a href="index.html" class="logo-brand" aria-label="ZevairaLifestyle Home">
              <svg viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="14" fill="#1F4A33"/>
                <path d="M28 14h8v4h-8zM25 18h14v3H25z" fill="#D9B15A"/>
                <path d="M20 25h24l-18 19h18v5H19l18-19H20v-5z" fill="#D9B15A"/>
              </svg>
              <div>
                ZevairaLifestyle
                <span class="tagline-sub">Maison de Parfum</span>
              </div>
            </a>
          </div>

          <!-- Center: Desktop Navigation -->
          <nav class="desktop-nav" aria-label="Primary navigation">
            <a href="shop.html" ${isActive("shop.html")}>Shop</a>
            <a href="shop.html?category=For+Him">For Him</a>
            <a href="shop.html?category=For+Her">For Her</a>
            <a href="shop.html?category=Unisex">Unisex</a>
            <a href="about.html" ${isActive("about.html")}>Our Story</a>
            <a href="delivery-returns.html" ${isActive("delivery-returns.html")}>Delivery</a>
            <a href="faq.html" ${isActive("faq.html")}>FAQ</a>
            <a href="contact.html" ${isActive("contact.html")}>Contact</a>
          </nav>

          <!-- Right: Search, Wishlist, Cart, Theme -->
          <div class="header-right">
            <!-- Theme Toggle -->
            <button class="icon-btn theme-toggle-btn" id="themeToggleBtn" aria-label="Switch Dark/Light Theme">
              <svg id="themeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>

            <!-- Search Modal Trigger -->
            <button class="icon-btn" id="openSearchBtn" aria-label="Search fragrances">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            <!-- Wishlist Link -->
            <a href="shop.html?filter=wishlist" class="icon-btn" aria-label="View wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="icon-badge" id="wishlistBadge" style="display:none">0</span>
            </a>

            <!-- Cart Pill Button -->
            <a href="cart.html" class="cart-pill-btn" aria-label="View Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>Cart (<span id="cartCountBadge">0</span>)</span>
            </a>
          </div>

        </div>
      </div>
    </header>

    <!-- Mobile Slide-In Navigation Drawer -->
    <div class="drawer-scrim" id="mobileScrim"></div>
    <div class="mobile-menu" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div class="mobile-menu-header">
        <a href="index.html" class="logo-brand" style="font-size:20px;">ZevairaLifestyle</a>
        <button class="icon-btn" id="closeMobileMenuBtn" aria-label="Close navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="mobile-menu-links">
        <a href="index.html" ${isActive("index.html")}>Home</a>
        <a href="shop.html" ${isActive("shop.html")}>All Fragrances</a>
        <a href="shop.html?category=For+Him">For Him</a>
        <a href="shop.html?category=For+Her">For Her</a>
        <a href="shop.html?category=Unisex">Unisex</a>
        <a href="shop.html?category=Gift+Sets">Gift Sets</a>
        <a href="about.html" ${isActive("about.html")}>Our Story</a>
        <a href="delivery-returns.html" ${isActive("delivery-returns.html")}>Delivery & Returns</a>
        <a href="faq.html" ${isActive("faq.html")}>FAQ</a>
        <a href="contact.html" ${isActive("contact.html")}>Contact Us</a>
        <a href="cart.html" ${isActive("cart.html")}>My Cart (<span class="mobile-cart-count">0</span>)</a>
      </div>
      <div class="mobile-menu-footer">
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="instagram-link-badge" aria-label="ZevairaLifestyle on Instagram" style="justify-content:center;margin-bottom:10px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>@zevairalifestyle</span>
        </a>
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm btn-block">
          Order via WhatsApp
        </a>
        <div style="font-size:12px;color:var(--muted);text-align:center;">
          Pakistan's Premier Heat-Resistant Extrait Perfumes
        </div>
      </div>
    </div>

    <!-- Quick Search Modal -->
    <div class="search-modal-backdrop" id="searchModal" role="dialog" aria-modal="true" aria-label="Search Fragrances">
      <div class="search-modal-box">
        <div class="search-modal-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" id="modalSearchInput" placeholder="Search by name, scent family, or note (e.g. Vetiver, Mogra, Oud)..." autocomplete="off">
          <button class="icon-btn" id="closeSearchBtn" aria-label="Close search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="search-modal-results" id="modalSearchResults">
          <div style="padding:24px;text-align:center;color:var(--muted);font-size:14px;">
            Type a fragrance name, note, or scent family to find your signature scent.
          </div>
        </div>
      </div>
    </div>
  `;

  // Footer HTML Template
  const footerMarkup = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          
          <!-- Col 1: Brand Info -->
          <div class="footer-col">
            <h3 style="color:#F5EFDC;margin-bottom:12px;font-size:24px;">ZevairaLifestyle</h3>
            <p style="color:#A9BBA9;font-size:14px;line-height:1.6;margin-bottom:18px;">
              Formulated specifically for Pakistan’s climate. High-concentration Extrait de Parfum handcrafted to stay fresh through scorching summer days and humid monsoons.
            </p>
            <div style="margin-top:16px;">
              <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="instagram-link-badge" aria-label="ZevairaLifestyle on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@zevairalifestyle</span>
              </a>
            </div>
          </div>

          <!-- Col 2: Fragrance Collection -->
          <div class="footer-col">
            <h4>Collections</h4>
            <ul class="footer-links">
              <li><a href="shop.html">All Fragrances</a></li>
              <li><a href="shop.html?category=For+Him">For Him</a></li>
              <li><a href="shop.html?category=For+Her">For Her</a></li>
              <li><a href="shop.html?category=Unisex">Unisex</a></li>
              <li><a href="shop.html?category=Gift+Sets">Discovery Sample Sets</a></li>
              <li><a href="shop.html?family=Fresh">Monsoon & Fresh Notes</a></li>
            </ul>
          </div>

          <!-- Col 3: Customer Care -->
          <div class="footer-col">
            <h4>Customer Care</h4>
            <ul class="footer-links">
              <li><a href="about.html">Our Craft & Story</a></li>
              <li><a href="delivery-returns.html">Delivery Across Pakistan</a></li>
              <li><a href="delivery-returns.html#returns">7-Day Exchange Policy</a></li>
              <li><a href="faq.html">Frequently Asked Questions</a></li>
              <li><a href="contact.html">Track Order via WhatsApp</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Col 4: Newsletter & Inquiries -->
          <div class="footer-col">
            <h4>Stay Connected</h4>
            <p style="font-size:13.5px;color:#A9BBA9;margin-bottom:12px;">
              Join the Zevaira private circle for exclusive launch invites and 10% off your first flacon.
            </p>
            <form onsubmit="handleNewsletterSubmit(event)" style="display:flex;gap:6px;margin-bottom:14px;">
              <input type="email" required placeholder="Enter your email" style="background:#172F21;border:1px solid #26402F;color:#F5EFDC;padding:10px 12px;border-radius:4px;font-size:13px;flex:1;">
              <button type="submit" class="btn btn-primary btn-sm" style="padding:10px 14px;">Join</button>
            </form>
            <div style="font-size:13px;color:#A9BBA9;">
              <div>WhatsApp: <strong>+${WHATSAPP_NUMBER}</strong></div>
              <div>Email: <strong>${STORE_EMAIL}</strong></div>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div>
            © 2026 ZevairaLifestyle. All rights reserved. Handcrafted in Pakistan.
          </div>
          <div class="payment-badges-row">
            <span class="payment-pill">Cash on Delivery</span>
            <span class="payment-pill">EasyPaisa</span>
            <span class="payment-pill">JazzCash</span>
            <span class="payment-pill">UPaisa</span>
            <span class="payment-pill">Direct Bank</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Floating Actions Container: WhatsApp & Back to Top -->
    <div class="floating-actions-container" aria-label="Quick Actions">
      <button class="btn-back-to-top" id="backToTopBtn" aria-label="Back to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20ZevairaLifestyle!%20I'm%20interested%20in%20your%20perfumes." target="_blank" rel="noopener" class="btn-floating-whatsapp" aria-label="Chat with ZevairaLifestyle on WhatsApp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </a>
    </div>
  `;

  // Replace placeholders if present, else prepend/append
  const headerMount = document.getElementById("site-header");
  if (headerMount) {
    headerMount.outerHTML = headerMarkup;
  } else if (!document.querySelector("header.site-header")) {
    document.body.insertAdjacentHTML("afterbegin", headerMarkup);
  }

  const footerMount = document.getElementById("site-footer");
  if (footerMount) {
    footerMount.outerHTML = footerMarkup;
  } else if (!document.querySelector("footer.site-footer")) {
    document.body.insertAdjacentHTML("beforeend", footerMarkup);
  }

  // Inject Organization Schema with Instagram sameAs
  if (!document.getElementById("organizationSchema")) {
    const orgScript = document.createElement("script");
    orgScript.id = "organizationSchema";
    orgScript.type = "application/ld+json";
    orgScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZevairaLifestyle",
      "url": "https://www.instagram.com/zevairalifestyle",
      "sameAs": [INSTAGRAM_URL]
    });
    document.head.appendChild(orgScript);
  }

  // Setup Header Interactivity
  initHeaderInteractions();
  updateHeaderBadges();
  initTheme();
  initScrollTop();
}

function updateHeaderBadges() {
  const cartCount = getCartTotalCount();
  const wishlistCount = getWishlist().length;

  const cartBadges = document.querySelectorAll("#cartCountBadge, .mobile-cart-count");
  cartBadges.forEach(b => b.textContent = cartCount);

  const wishlistBadge = document.getElementById("wishlistBadge");
  if (wishlistBadge) {
    if (wishlistCount > 0) {
      wishlistBadge.textContent = wishlistCount;
      wishlistBadge.style.display = "flex";
    } else {
      wishlistBadge.style.display = "none";
    }
  }
}

/* ==========================================================================
   6. HEADER INTERACTIONS (Mobile Drawer, Search, Theme)
   ========================================================================== */
function initHeaderInteractions() {
  const openBtn = document.getElementById("openMobileMenuBtn");
  const closeBtn = document.getElementById("closeMobileMenuBtn");
  const drawer = document.getElementById("mobileDrawer");
  const scrim = document.getElementById("mobileScrim");

  if (openBtn && drawer && scrim) {
    openBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      scrim.classList.add("open");
      openBtn.setAttribute("aria-expanded", "true");
    });

    const closeDrawer = () => {
      drawer.classList.remove("open");
      scrim.classList.remove("open");
      openBtn.setAttribute("aria-expanded", "false");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    scrim.addEventListener("click", closeDrawer);
  }

  // Search Modal
  const openSearch = document.getElementById("openSearchBtn");
  const closeSearch = document.getElementById("closeSearchBtn");
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("modalSearchInput");
  const searchResults = document.getElementById("modalSearchResults");

  if (openSearch && searchModal) {
    openSearch.addEventListener("click", () => {
      searchModal.classList.add("open");
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
    });

    const closeSearchModal = () => {
      searchModal.classList.remove("open");
    };

    if (closeSearch) closeSearch.addEventListener("click", closeSearchModal);
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) closeSearchModal();
    });

    // Handle Search Typing
    if (searchInput && searchResults) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          searchResults.innerHTML = `
            <div style="padding:24px;text-align:center;color:var(--muted);font-size:14px;">
              Type a fragrance name, note, or scent family to find your signature scent.
            </div>
          `;
          return;
        }

        if (typeof PRODUCTS === "undefined") return;

        const matches = PRODUCTS.filter(p => {
          const notesStr = (p.notes.top.join(" ") + " " + p.notes.heart.join(" ") + " " + p.notes.base.join(" ")).toLowerCase();
          return p.name.toLowerCase().includes(query) ||
                 p.tagline.toLowerCase().includes(query) ||
                 p.scentFamily.toLowerCase().includes(query) ||
                 p.category.toLowerCase().includes(query) ||
                 notesStr.includes(query);
        });

        if (matches.length === 0) {
          searchResults.innerHTML = `
            <div style="padding:24px;text-align:center;color:var(--muted);font-size:14px;">
              No fragrances found matching "<strong>${query}</strong>". Try searching for <em>Vetiver, Mogra, Oud,</em> or <em>Citrus</em>.
            </div>
          `;
        } else {
          searchResults.innerHTML = matches.map(p => `
            <a href="product.html?id=${p.id}" class="search-result-item" style="display:flex;align-items:center;gap:12px;padding:10px;border-bottom:1px solid var(--line);">
              <div style="width:48px;height:48px;background:var(--surface-alt);border-radius:4px;display:grid;place-items:center;flex-shrink:0;">
                <div style="transform:scale(0.28);transform-origin:center;">${getBottleSvg(p, "60px")}</div>
              </div>
              <div style="flex:1;">
                <div style="font-weight:600;font-size:15px;color:var(--ink);">${p.name}</div>
                <div style="font-size:12px;color:var(--muted);">${p.category} • ${p.scentFamily} • From ${formatPKR(p.sizes[0].price)}</div>
              </div>
              <span class="badge" style="font-size:10px;">${p.badge || 'Extrait'}</span>
            </a>
          `).join("");
        }
      });
    }
  }
}

/* ==========================================================================
   7. THEME MANAGER (Dark / Light Palette)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(activeTheme);
      localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
      showToast(`Switched to ${activeTheme} mode.`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.getElementById("themeIcon");
  if (icon) {
    if (theme === "dark") {
      // Show sun icon
      icon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`;
    } else {
      // Show moon icon
      icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    }
  }
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initScrollTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   9. NEWSLETTER SUBMIT
   ========================================================================== */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector("input[type=email]");
  if (input) {
    showToast("Welcome to Zevaira circle! Use code ZEVAIRA10 for 10% off.");
    input.value = "";
  }
}

/* ==========================================================================
   10. WHATSAPP ORDER URL GENERATOR
   ========================================================================== */
function generateWhatsAppOrderUrl(order) {
  const { orderId, customer, items, subtotal, discount, giftWrap, deliveryFee, total, paymentMethod } = order;

  let msg = `*NEW ORDER - ZEVAIRA LIFESTYLE*\n`;
  msg += `--------------------------------------\n`;
  msg += `*Order Number:* ${orderId}\n`;
  msg += `*Customer:* ${customer.name}\n`;
  msg += `*Phone:* ${customer.phone}\n`;
  if (customer.email) msg += `*Email:* ${customer.email}\n`;
  msg += `*City:* ${customer.city}\n`;
  msg += `*Address:* ${customer.address}\n`;
  if (customer.postal) msg += `*Postal Code:* ${customer.postal}\n`;
  if (customer.notes) msg += `*Special Notes:* ${customer.notes}\n`;
  msg += `--------------------------------------\n`;
  msg += `*ITEMS ORDERED:*\n`;

  items.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}* (${item.size})\n   Qty: ${item.qty} × ${formatPKR(item.price)} = ${formatPKR(item.price * item.qty)}\n`;
  });

  msg += `--------------------------------------\n`;
  msg += `*Subtotal:* ${formatPKR(subtotal)}\n`;
  if (discount > 0) msg += `*Discount:* -${formatPKR(discount)}\n`;
  if (giftWrap > 0) msg += `*Gift Wrap:* +${formatPKR(giftWrap)}\n`;
  msg += `*Delivery Fee:* ${deliveryFee === 0 ? "FREE" : formatPKR(deliveryFee)}\n`;
  msg += `*TOTAL AMOUNT:* *${formatPKR(total)}*\n`;
  msg += `--------------------------------------\n`;
  msg += `*Payment Method:* ${paymentMethod}\n`;
  msg += `\nPlease confirm dispatch of my order. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// WhatsApp product query generator
function generateWhatsAppInquiryUrl(productName, size = "") {
  let text = `Hi ZevairaLifestyle! I would like to inquire about *${productName}*`;
  if (size) text += ` (${size})`;
  text += `. Could you please share more details regarding delivery and fragrance performance?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ==========================================================================
   AUTO-INITIALIZE ON DOM CONTENT LOADED
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  injectHeaderAndFooter();
});

// Export globally
if (typeof window !== "undefined") {
  window.INSTAGRAM_URL = INSTAGRAM_URL;
  window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
  window.STORE_EMAIL = STORE_EMAIL;
  window.STORE_PHONE = STORE_PHONE;
  window.HERO_VIDEO_SRC = HERO_VIDEO_SRC;
  window.FREE_DELIVERY_THRESHOLD = FREE_DELIVERY_THRESHOLD;
  window.STANDARD_DELIVERY_FEE = STANDARD_DELIVERY_FEE;
  window.GIFT_WRAP_FEE = GIFT_WRAP_FEE;
  window.DISCOUNT_CODES = DISCOUNT_CODES;
  window.PAYMENT_ACCOUNTS = PAYMENT_ACCOUNTS;

  window.formatPKR = formatPKR;
  window.getProductById = getProductById;
  window.getCart = getCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.updateCartQty = updateCartQty;
  window.removeFromCart = removeFromCart;
  window.getCartTotalCount = getCartTotalCount;
  window.getCartSubtotal = getCartSubtotal;
  window.clearCart = clearCart;

  window.getWishlist = getWishlist;
  window.toggleWishlist = toggleWishlist;
  window.isInWishlist = isInWishlist;
  window.trackRecentlyViewed = trackRecentlyViewed;
  window.getRecentlyViewed = getRecentlyViewed;

  window.showToast = showToast;
  window.generateWhatsAppOrderUrl = generateWhatsAppOrderUrl;
  window.generateWhatsAppInquiryUrl = generateWhatsAppInquiryUrl;
  window.handleNewsletterSubmit = handleNewsletterSubmit;
}
