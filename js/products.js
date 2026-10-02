/**
 * ZevairaLifestyle - Master Product Catalog
 * -------------------------------------------------------------
 * Authentic handcrafted luxury perfumes formulated for Pakistan's climate.
 * Real high-resolution bottle and box photography in /images/.
 * -------------------------------------------------------------
 */

const PRODUCTS = [
  {
    id: "zevara",
    name: "ZEVARA",
    tagline: "Pristine Sambac Jasmine, Neroli Blossoms & White Amber",
    category: "For Her",
    scentFamily: "Floral",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 168,
    sizes: [
      { size: "50ml", price: 4800 },
      { size: "100ml", price: 7500 },
      { size: "10ml Travel", price: 1850 }
    ],
    description: "An ode to ethereal purity and luminous grace. ZEVARA opens with sparkling Calabrian neroli and morning sun-kissed bergamot, leading into an intoxicating heart of royal night-blooming Sambac jasmine and white gardenia petals. Anchored on Carrara marble-inspired white musk, warm cashmere woods, and crystalline amber that withstands extreme Pakistani heat with radiant poise.",
    notes: {
      top: ["Italian Neroli", "Sunlit Bergamot", "Dewy Green Stems"],
      heart: ["Royal Sambac Jasmine", "Orange Blossom", "White Gardenia"],
      base: ["Cashmere Wood", "Sheer White Musk", "Crystal Amber"]
    },
    longevity: "16+ Hours Tested Longevity",
    longevityScore: 94,
    projection: "2.5m Radiant Sillage",
    projectionScore: 89,
    season: "Spring, Summer, Monsoon & All-Season",
    occasion: "Daytime Elegance, Weddings, Signature Daily Scent",
    bottleTheme: {
      glassColor: "#F5EFDC",
      liquidColor: "#F0E8D0",
      capColor: "#D9B15A",
      tint: "gold",
      shape: "square"
    },
    image: "images/zevara.jpg"
  },
  {
    id: "noire",
    name: "NOIRÉ",
    tagline: "Tuscan Leather, Smoked Peppercorn & Madagascar Vanilla",
    category: "For Him",
    scentFamily: "Oriental",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Signature",
    rating: 5.0,
    reviewCount: 214,
    sizes: [
      { size: "50ml", price: 5200 },
      { size: "100ml", price: 8200 },
      { size: "10ml Travel", price: 1950 }
    ],
    description: "Seductive, commanding, and unapologetically bold. NOIRÉ captures the mystery of twilight in Lahore and Karachi's elite salons. Fiery cracked black pepper and green cardamom collide with rich, supple Tuscan leather, smoked frankincense, and dark Bourbon vanilla absolute. Crafted with dense resinous oils that project intensely in cool evenings and festive nights.",
    notes: {
      top: ["Cracked Black Pepper", "Green Cardamom", "Bitter Almond"],
      heart: ["Tuscan Leather", "Smoked Incense", "Nutmeg"],
      base: ["Madagascar Bourbon Vanilla", "Dark Amber Resin", "Smoked Cedar"]
    },
    longevity: "18+ Hours Ultra-Long Lasting",
    longevityScore: 98,
    projection: "3.0m Powerful Projection",
    projectionScore: 95,
    season: "Autumn, Winter & Evening Soirées",
    occasion: "Black-Tie Gala, Romantic Dinners, Festive Nights",
    bottleTheme: {
      glassColor: "#111111",
      liquidColor: "#1c1815",
      capColor: "#D9B15A",
      tint: "noir",
      shape: "heavy-square"
    },
    image: "images/noire.jpg"
  },
  {
    id: "elan",
    name: "ÉLAN",
    tagline: "Sun-drenched Bergamot, French Lavender & Atlas Cedar",
    category: "For Him",
    scentFamily: "Fresh",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Hot Weather Essential",
    rating: 4.8,
    reviewCount: 142,
    sizes: [
      { size: "50ml", price: 4600 },
      { size: "100ml", price: 7200 },
      { size: "10ml Travel", price: 1750 }
    ],
    description: "The quintessential antidote to 45°C subcontinental heatwaves. ÉLAN radiates aristocratic vitality, pairing crisp Sicilian limes and crushed spearmint with French alpine lavender and aromatic clary sage. Grounded in moisture-wicking Haitian vetiver and dry Atlas cedarwood that stays crisp, cooling, and undeniably sophisticated from dawn to dusk.",
    notes: {
      top: ["Crisp Sicilian Lime", "Calabrian Bergamot", "Crushed Spearmint"],
      heart: ["French Alpine Lavender", "Juniper Berries", "Clary Sage"],
      base: ["Haitian Vetiver", "Atlas Cedarwood", "Clean Ambergris"]
    },
    longevity: "15+ Hours Sweat-Resistant",
    longevityScore: 92,
    projection: "2.2m Refreshing Aura",
    projectionScore: 86,
    season: "Peak Summer, High Humidity & Daily Wear",
    occasion: "Boardroom Meetings, Golf Club, Daily Signature",
    bottleTheme: {
      glassColor: "#1F4A33",
      liquidColor: "#2A6344",
      capColor: "#D9B15A",
      tint: "emerald",
      shape: "square"
    },
    image: "images/elan.jpg"
  },
  {
    id: "velora",
    name: "VELORA",
    tagline: "Damask Rose Petals, Pink Lychee & Creamy Vanilla Orchid",
    category: "For Her",
    scentFamily: "Floral",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Romantic",
    rating: 4.9,
    reviewCount: 196,
    sizes: [
      { size: "50ml", price: 4900 },
      { size: "100ml", price: 7800 },
      { size: "10ml Travel", price: 1850 }
    ],
    description: "A hypnotic floral tapestry bathed in rose-gold warmth. VELORA celebrates delicate romance with juicy pink lychee, sparkling pear, and velvet Damask rose petals kissed with morning dew. The drydown unveils whipped vanilla orchid, silky praline, and warm sandalwood that leaves an unforgettable trail on silk and chiffon.",
    notes: {
      top: ["Pink Lychee", "Sparkling Pear", "Red Peony"],
      heart: ["Damask Rose Absolute", "Turkish Rose Water", "Vanilla Orchid"],
      base: ["Whipped Praline", "Soft Sandalwood", "Cashmere Musks"]
    },
    longevity: "16+ Hours Enduring Sillage",
    longevityScore: 93,
    projection: "2.4m Enveloping Sweetness",
    projectionScore: 88,
    season: "Spring, Autumn & Wedding Seasons",
    occasion: "Mehndi, Barat, Date Nights, Celebrations",
    bottleTheme: {
      glassColor: "#F4D7DB",
      liquidColor: "#EAB8BE",
      capColor: "#D9B15A",
      tint: "rose",
      shape: "square"
    },
    image: "images/velora.jpg"
  },
  {
    id: "auren",
    name: "AUREN",
    tagline: "Kashmiri Saffron, Glowing Ambergris & Royal Agarwood",
    category: "Unisex",
    scentFamily: "Oriental",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Bestseller",
    rating: 5.0,
    reviewCount: 238,
    sizes: [
      { size: "50ml", price: 5400 },
      { size: "100ml", price: 8600 },
      { size: "10ml Travel", price: 2100 }
    ],
    description: "Pure liquid gold distilled for royalty. AUREN opens with prized ruby Kashmiri saffron threads and sun-ripened blood orange, unfurling a regal heart of warm golden amber crystals and Egyptian star jasmine. Steeped in wild aged agarwood (oud) and molten resins, creating a warm, opulent presence that commands immediate reverence.",
    notes: {
      top: ["Kashmiri Saffron", "Blood Orange", "Golden Spices"],
      heart: ["Ambergris", "Egyptian Star Jasmine", "Golden Resin"],
      base: ["Wild Agarwood (Oud)", "Smoked Cedar", "Musk Imperial"]
    },
    longevity: "20+ Hours Unrivaled Tenacity",
    longevityScore: 99,
    projection: "3.2m Regal Sillage",
    projectionScore: 96,
    season: "Fall, Winter, Spring & Grand Festivities",
    occasion: "Royal Weddings, Eid Receptions, Formal Affairs",
    bottleTheme: {
      glassColor: "#4A2E12",
      liquidColor: "#B8862B",
      capColor: "#D9B15A",
      tint: "gold",
      shape: "square"
    },
    image: "images/auren.jpg"
  },
  {
    id: "seren",
    name: "SÉRÉN",
    tagline: "Marine Sea Salt Breeze, Wild Lavender & Driftwood",
    category: "For Him",
    scentFamily: "Fresh",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 119,
    sizes: [
      { size: "50ml", price: 4700 },
      { size: "100ml", price: 7400 },
      { size: "10ml Travel", price: 1800 }
    ],
    description: "The serenity of Karachi's Arabian Sea at twilight. SÉRÉN pairs invigorating oceanic sea-spray and crushed lavender with sun-bleached coastal driftwood and clean mineral amber. Clean, tranquil, and deeply refreshing, crafted to keep you energized through relentless summer heat and humidity.",
    notes: {
      top: ["Arabian Sea Salt", "Marine Ozone", "Zesty Grapefruit"],
      heart: ["Wild Coastal Lavender", "Clary Sage", "Crushed Rosemary"],
      base: ["Sun-bleached Driftwood", "White Amber", "Earthy Vetiver"]
    },
    longevity: "15+ Hours Fresh Performance",
    longevityScore: 91,
    projection: "2.3m Cooling Trail",
    projectionScore: 87,
    season: "Summer, Coastal Humidity & Everyday Wear",
    occasion: "Day Outings, Gym & Travel, Casual Chic",
    bottleTheme: {
      glassColor: "#1B3358",
      liquidColor: "#326296",
      capColor: "#D9B15A",
      tint: "sapphire",
      shape: "square"
    },
    image: "images/seren.jpg"
  },
  {
    id: "obsidian",
    name: "OBSIDIAN",
    tagline: "Black Amber, Smoked Frankincense Resin & Rare Dark Woods",
    category: "For Him",
    scentFamily: "Woody",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "Intense",
    rating: 4.9,
    reviewCount: 175,
    sizes: [
      { size: "50ml", price: 5600 },
      { size: "100ml", price: 8900 },
      { size: "10ml Travel", price: 2200 }
    ],
    description: "Forged in darkness and mystery. OBSIDIAN is an enigmatic nocturnal extract built around intense smoked frankincense, cracked black peppercorns, and midnight birch tar. Rich Indonesian patchouli and dark fossilized amber create an intense, magnetic aura that lingers like an immortal signature.",
    notes: {
      top: ["Smoked Black Pepper", "Guaiacwood", "Incense Tears"],
      heart: ["Black Birch Tar", "Dark Clove", "Smoked Leather"],
      base: ["Fossilized Black Amber", "Indonesian Patchouli", "Ebony Wood"]
    },
    longevity: "20+ Hours Extreme Longevity",
    longevityScore: 99,
    projection: "3.5m Heavy Sillage",
    projectionScore: 97,
    season: "Winter, Late Autumn & Nights Out",
    occasion: "VIP Galas, Night Out, Formal Receptions",
    bottleTheme: {
      glassColor: "#0D0D0D",
      liquidColor: "#1A1715",
      capColor: "#D9B15A",
      tint: "noir",
      shape: "heavy-square"
    },
    image: "images/obsidian.jpg"
  },
  {
    id: "lumea",
    name: "LUMÉA",
    tagline: "Juicy English Pear, White Freesia & Golden Cedarwood",
    category: "For Her",
    scentFamily: "Floral",
    concentration: "Eau de Parfum (50ml Extrait)",
    badge: "New Arrival",
    rating: 4.9,
    reviewCount: 131,
    sizes: [
      { size: "50ml", price: 4800 },
      { size: "100ml", price: 7500 },
      { size: "10ml Travel", price: 1850 }
    ],
    description: "A sunlit morning in a blossoming royal orchard. LUMÉA opens with mouthwatering golden pear nectar and mandarin zest, transitioning into a luminous bouquet of English white freesia, star magnolia, and delicate rosebuds. Grounded on golden cedarwood and sheer clean musks for all-day radiance.",
    notes: {
      top: ["Golden English Pear", "Mandarin Zest", "Green Melon"],
      heart: ["White Freesia", "Star Magnolia", "May Rose"],
      base: ["Golden Cedarwood", "Clean Amber", "Airy Musk"]
    },
    longevity: "15+ Hours Luminous Wear",
    longevityScore: 92,
    projection: "2.3m Radiant Trail",
    projectionScore: 88,
    season: "Spring, Summer & Daylight Occasions",
    occasion: "Sunday Brunches, Afternoon Teas, Garden Parties",
    bottleTheme: {
      glassColor: "#EBE3CD",
      liquidColor: "#E0CF9B",
      capColor: "#D9B15A",
      tint: "gold",
      shape: "square"
    },
    image: "images/lumea.jpg"
  },
  {
    id: "discovery-set",
    name: "The Discovery Vault (8 x 10ml)",
    tagline: "Experience All 8 Masterpieces with Full Flacon Voucher",
    category: "Gift Sets",
    scentFamily: "Discovery Flight",
    concentration: "8 Extrait de Parfum Atomizers (8 x 10ml)",
    badge: "Best Value",
    rating: 5.0,
    reviewCount: 382,
    sizes: [
      { size: "8 x 10ml Box", price: 4950 }
    ],
    description: "Immerse yourself in the complete ZevairaLifestyle olfactory universe. Includes deluxe 10ml travel sprayers of all 8 luxury creations: Zevara, Noiré, Élan, Velora, Auren, Sérén, Obsidian, and Luméa, encased in an emerald and gold keepsake box. Comes with an exclusive Rs 1,000 voucher redeemable against your first full 50ml or 100ml flacon.",
    notes: {
      top: ["All 8 Signature Creations", "Includes Rs 1,000 Voucher", "Deluxe Travel Cases"],
      heart: ["Zevara, Noiré, Élan, Velora", "Auren, Sérén, Obsidian, Luméa", "10ml Pocket Sprayers"],
      base: ["Handcrafted Presentation Box", "Ideal For Gifting", "Tested For Heat Resistance"]
    },
    longevity: "Explore All 8 Fragrances",
    longevityScore: 100,
    projection: "Full Spectrum Flight",
    projectionScore: 100,
    season: "All Seasons",
    occasion: "The Ultimate Gift, Scent Finding, Travel",
    bottleTheme: {
      glassColor: "#1F4A33",
      liquidColor: "#0F2A1D",
      capColor: "#D9B15A",
      tint: "gold",
      shape: "discovery-box"
    },
    image: "images/velora-alt.jpg"
  }
];

/**
 * Returns an image or inline SVG illustration of a luxury perfume flacon.
 * Prioritizes high-resolution real photography from the /images/ folder.
 * Gracefully falls back to handcrafted vector flacon if image is absent.
 */
function getBottleSvg(productOrId, width = "100%", height = "auto") {
  const product = typeof productOrId === "string"
    ? (PRODUCTS.find(p => p.id === productOrId) || { id: productOrId, name: productOrId, bottleTheme: {} })
    : (productOrId || {});

  // High-res photo render
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name || 'Zevaira Perfume'}" class="product-real-img" loading="lazy" style="width:${width};height:${height};max-width:100%;object-fit:cover;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.12);">`;
  }

  const { id, name, bottleTheme = {} } = product;
  const pId = id || "perfume";

  if (bottleTheme.shape === "discovery-box") {
    return `
      <svg class="flacon-svg flacon-box" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${width};height:${height};display:block;margin:0 auto;" aria-label="${name || 'Discovery Vault'}">
        <defs>
          <linearGradient id="boxGrad_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1F4A33"/>
            <stop offset="70%" stop-color="#0F2A1D"/>
            <stop offset="100%" stop-color="#07170F"/>
          </linearGradient>
          <linearGradient id="boxGold_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5EFDC"/>
            <stop offset="40%" stop-color="#D9B15A"/>
            <stop offset="100%" stop-color="#B8862B"/>
          </linearGradient>
        </defs>
        <rect x="25" y="45" width="190" height="205" rx="8" fill="url(#boxGrad_${pId})" stroke="url(#boxGold_${pId})" stroke-width="2"/>
        <rect x="33" y="53" width="174" height="189" rx="5" fill="none" stroke="#D9B15A" stroke-width="0.75" stroke-dasharray="4 2" stroke-opacity="0.7"/>
        <rect x="58" y="105" width="124" height="78" rx="4" fill="#0F2A1D" stroke="url(#boxGold_${pId})" stroke-width="1.5"/>
        <text x="120" y="132" fill="#D9B15A" font-family="'Bodoni Moda', serif" font-size="12" font-weight="600" text-anchor="middle" letter-spacing="3">ZEVAIRA</text>
        <text x="120" y="148" fill="#F5EFDC" font-family="'Hanken Grotesk', sans-serif" font-size="8" text-anchor="middle" letter-spacing="2">DISCOVERY VAULT</text>
        <text x="120" y="162" fill="#D9B15A" font-family="'Hanken Grotesk', sans-serif" font-size="7.5" text-anchor="middle">8 × 10ML EXTRAIT</text>
      </svg>
    `;
  }

  // Fallback vector flacon
  const capColor = bottleTheme.capColor || "#D9B15A";
  const liquidColor = bottleTheme.liquidColor || "#2D6A4F";
  const glassColor = bottleTheme.glassColor || "#1F4A33";

  return `
    <svg class="flacon-svg" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${width};height:${height};display:block;margin:0 auto;" aria-label="${name || 'Perfume'}">
      <defs>
        <linearGradient id="capGold_${pId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8A6318"/>
          <stop offset="30%" stop-color="#D9B15A"/>
          <stop offset="50%" stop-color="#FDFBF4"/>
          <stop offset="70%" stop-color="#B8862B"/>
          <stop offset="100%" stop-color="#6E4F14"/>
        </linearGradient>
        <linearGradient id="liquidGrad_${pId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${glassColor}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${liquidColor}" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <!-- Cap -->
      <rect x="66" y="24" width="68" height="48" rx="6" fill="url(#capGold_${pId})" stroke="#4A340C" stroke-width="1"/>
      <rect x="78" y="72" width="44" height="14" fill="url(#capGold_${pId})"/>
      <!-- Bottle Body -->
      <rect x="36" y="86" width="128" height="200" rx="14" fill="url(#liquidGrad_${pId})" stroke="url(#capGold_${pId})" stroke-width="2"/>
      <rect x="42" y="92" width="116" height="188" rx="10" fill="none" stroke="#F5EFDC" stroke-width="0.5" stroke-opacity="0.3"/>
      <!-- Label Plate -->
      <rect x="52" y="142" width="96" height="88" rx="4" fill="#0A1C13" stroke="url(#capGold_${pId})" stroke-width="1.2"/>
      <rect x="56" y="146" width="88" height="80" rx="2" fill="none" stroke="#D9B15A" stroke-width="0.5" stroke-opacity="0.6"/>
      <text x="100" y="176" fill="#D9B15A" font-family="'Bodoni Moda', serif" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="2">ZEVAIRA</text>
      <text x="100" y="196" fill="#F5EFDC" font-family="'Bodoni Moda', serif" font-size="9" text-anchor="middle" letter-spacing="1.5">${(name || "").toUpperCase()}</text>
      <text x="100" y="212" fill="#D9B15A" font-family="'Hanken Grotesk', sans-serif" font-size="6.5" text-anchor="middle" letter-spacing="1">EXTRAIT DE PARFUM</text>
    </svg>
  `;
}

// Global export
if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.getBottleSvg = getBottleSvg;
}
