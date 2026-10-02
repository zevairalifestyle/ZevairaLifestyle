/**
 * ZevairaLifestyle - Master Product Catalog
 * -------------------------------------------------------------
 * SAMPLE DATA: Edit the perfumes below or replace with your own.
 * To change prices, names, sizes, or notes, simply modify the values in this file.
 * To use real product photos instead of SVGs, put photos in the /images/ folder
 * and set image: "images/your-photo.jpg" (or leave empty to use the luxury inline SVG).
 * -------------------------------------------------------------
 */

const PRODUCTS = [
  {
    id: "royal-vetiver",
    name: "Royal Vetiver",
    tagline: "Crisp Vetiver, Sparkling Bergamot & Salty Ambergris",
    category: "For Him",
    scentFamily: "Fresh",
    concentration: "Extrait de Parfum (35% Fragrance Oil)",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 184,
    sizes: [
      { size: "50ml", price: 4200 },
      { size: "100ml", price: 6800 },
      { size: "10ml Travel", price: 1650 }
    ],
    description: "Composed purposefully to outlast extreme subcontinental heat and humidity. Royal Vetiver opens with brisk sun-drenched Calabrian bergamot and cracked pink pepper, revealing a resilient heart of smoky Haitian vetiver before settling into velvety ambergris and Atlas cedarwood that clings to skin and cotton fabrics for over 16 hours.",
    notes: {
      top: ["Calabrian Bergamot", "Pink Peppercorn", "Bitter Orange"],
      heart: ["Smoky Haitian Vetiver", "Egyptian Geranium", "Green Cardamom"],
      base: ["Ambergris", "Atlas Cedarwood", "Iso E Super", "Clean Musk"]
    },
    longevity: "16+ Hours (Sweat & Humidity Resistant)",
    longevityScore: 95,
    projection: "2.5m (Radiant Sillage)",
    projectionScore: 88,
    season: "Summer, Monsoon & High Humidity",
    occasion: "Office, Daily Signature, Evening Receptions",
    bottleTheme: {
      glassColor: "#1B4332",
      liquidColor: "#2D6A4F",
      capColor: "#D9B15A",
      tint: "emerald",
      shape: "square"
    },
    image: "" /* SAMPLE: Set to "images/royal-vetiver.jpg" when you have photos */
  },
  {
    id: "jasmine-blanc",
    name: "Jasmine Blanc",
    tagline: "Dewy Mogra, White Peach, Neroli & Golden Sandalwood",
    category: "For Her",
    scentFamily: "Floral",
    concentration: "Extrait de Parfum (32% Fragrance Oil)",
    badge: "Most Loved",
    rating: 4.9,
    reviewCount: 215,
    sizes: [
      { size: "50ml", price: 4400 },
      { size: "100ml", price: 7200 },
      { size: "10ml Travel", price: 1700 }
    ],
    description: "An ode to the timeless elegance of Pakistani evening courtyards draped in freshly blooming night jasmine (Mogra). Elevated with delicate French neroli, crisp green pear, and rich cream Mysore sandalwood, Jasmine Blanc avoids heavy sweetness in favor of a crystalline, breezy floral that never turns cloying.",
    notes: {
      top: ["Tunisian Neroli", "Crisp Anjou Pear", "Morning Dew Accord"],
      heart: ["Sambac Jasmine (Mogra)", "White Tuberose", "Orange Blossom"],
      base: ["Mysore Sandalwood", "Cashmeran", "Velvety White Musk"]
    },
    longevity: "14+ Hours (Stays vibrant on dupattas and silks)",
    longevityScore: 90,
    projection: "2.0m (Graceful Halo)",
    projectionScore: 85,
    season: "All Year Round & Mild Summers",
    occasion: "Brunch, Weddings, High Tea, Romantic Dinners",
    bottleTheme: {
      glassColor: "#FBF7EA",
      liquidColor: "#EAD7A1",
      capColor: "#B8862B",
      tint: "cream-gold",
      shape: "cylindrical"
    },
    image: "" /* SAMPLE: Set to "images/jasmine-blanc.jpg" when you have photos */
  },
  {
    id: "amber-mirage",
    name: "Amber Mirage",
    tagline: "Golden Saffron, Smoked Oud, Vanilla Bourbon & Labdanum",
    category: "Unisex",
    scentFamily: "Oriental",
    concentration: "Extrait de Parfum (38% Fragrance Oil)",
    badge: "Bestseller",
    rating: 5.0,
    reviewCount: 310,
    sizes: [
      { size: "50ml", price: 4600 },
      { size: "100ml", price: 7500 },
      { size: "10ml Travel", price: 1800 }
    ],
    description: "Opulent, warm, and magnetic. Inspired by the twilight desert winds of the Cholistan dunes. Kashmiri saffron and warm cardamom lead into molten golden amber, roasted Tonka bean, and seasoned Cambodian agarwood. An irresistible winter and shaadi season heavyweight that leaves an unforgettable trail in air-conditioned halls.",
    notes: {
      top: ["Kashmiri Saffron", "Nutmeg", "Black Cardamom"],
      heart: ["Amber Resin", "Roasted Tonka Bean", "Cistus Labdanum"],
      base: ["Cambodian Oud", "Bourbon Vanilla", "Smoked Leather", "Benzoin"]
    },
    longevity: "18+ Hours (Beast Mode)",
    longevityScore: 98,
    projection: "3.5m (Room Filler)",
    projectionScore: 95,
    season: "Autumn, Winter & Shaadi Season",
    occasion: "Weddings, Black-Tie Galas, Winter Nights",
    bottleTheme: {
      glassColor: "#2B1A0E",
      liquidColor: "#A66D28",
      capColor: "#D9B15A",
      tint: "amber",
      shape: "octagonal"
    },
    image: "" /* SAMPLE: Set to "images/amber-mirage.jpg" when you have photos */
  },
  {
    id: "lahore-rain",
    name: "Lahore Rain",
    tagline: "Petrichor (Mitti Accord), Wet Cypress, Calamansi & Moss",
    category: "Unisex",
    scentFamily: "Fresh",
    concentration: "Extrait de Parfum (30% Fragrance Oil)",
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 92,
    sizes: [
      { size: "50ml", price: 3950 },
      { size: "100ml", price: 6400 },
      { size: "10ml Travel", price: 1550 }
    ],
    description: "The soul-stirring aroma of the very first drops of monsoon rain hitting parched baked earth. Crafted with genuine baked alluvial clay Mitti attar extracts, chilled green tea, crushed pine needles, and zesty calamansi lime. A cooling oasis in 42°C heat that instantly re-energizes your senses.",
    notes: {
      top: ["Calamansi Lime", "Crushed Mint", "Morning Ozone"],
      heart: ["Alluvial Clay Petrichor", "Green Tea Leaf", "Himalayan Cypress"],
      base: ["Oakmoss", "Wet Earth Accord", "Clean Vetiver", "White Amber"]
    },
    longevity: "13+ Hours (Refreshing and crisp throughout)",
    longevityScore: 86,
    projection: "2.0m (Airy & Inviting)",
    projectionScore: 82,
    season: "Monsoon & Peak Summer (40°C+)",
    occasion: "Post-Gym, Casual Outings, Humid Monsoon Days",
    bottleTheme: {
      glassColor: "#1B3B36",
      liquidColor: "#3F7D74",
      capColor: "#D9B15A",
      tint: "jade",
      shape: "faceted"
    },
    image: "" /* SAMPLE: Set to "images/lahore-rain.jpg" when you have photos */
  },
  {
    id: "velvet-rose-oud",
    name: "Velvet Rose & Oud",
    tagline: "Taif Rose Petals, Raspberry, Royal Oud & Dark Praline",
    category: "For Her",
    scentFamily: "Woody",
    concentration: "Extrait de Parfum (36% Fragrance Oil)",
    badge: "Signature",
    rating: 4.9,
    reviewCount: 167,
    sizes: [
      { size: "50ml", price: 4500 },
      { size: "100ml", price: 7400 },
      { size: "10ml Travel", price: 1750 }
    ],
    description: "Rich, intoxicating, and intensely aristocratic. Hand-picked Taif rose blooms steeped in sweet raspberry nectar, laced with smoky clove bud, and anchored by aged Assam oud and dark cocoa praline. A sultry gourmand-woody masterpiece that projects royal confidence.",
    notes: {
      top: ["Taif Rose Dew", "Wild Raspberry", "Spicy Clove Bud"],
      heart: ["Damascena Rose Absolute", "Dark Praline", "Patchouli Leaf"],
      base: ["Aged Assam Oud", "Sandalwood", "Amberwood", "Soft Musk"]
    },
    longevity: "16+ Hours (Extremely durable sillage)",
    longevityScore: 94,
    projection: "3.0m (Head-Turner)",
    projectionScore: 92,
    season: "Autumn, Winter & Evening Wear",
    occasion: "Dates, Receptions, Qawwali Nights, Formal Banquets",
    bottleTheme: {
      glassColor: "#351421",
      liquidColor: "#6B203B",
      capColor: "#D9B15A",
      tint: "ruby-rose",
      shape: "curved"
    },
    image: "" /* SAMPLE: Set to "images/velvet-rose-oud.jpg" when you have photos */
  },
  {
    id: "indus-citrus",
    name: "Indus Citrus",
    tagline: "Blood Orange, Bergamot, Pink Grapefruit & Sea Salt Cedar",
    category: "For Him",
    scentFamily: "Citrus",
    concentration: "Extrait de Parfum (32% Fragrance Oil)",
    badge: "Trending",
    rating: 4.8,
    reviewCount: 128,
    sizes: [
      { size: "50ml", price: 3950 },
      { size: "100ml", price: 6400 },
      { size: "10ml Travel", price: 1550 }
    ],
    description: "An invigorating blast of sparkling Sicilian blood orange, tart pink grapefruit, and coastal sea salt drifting across sun-warmed cedar. Unlike standard citrus colognes that fade within an hour, Indus Citrus uses molecular citrus fixatives that anchor the zesty punch to your skin until bedtime.",
    notes: {
      top: ["Sicilian Blood Orange", "Ruby Grapefruit", "Kaffir Lime"],
      heart: ["Pink Sea Salt", "Sage", "Juniper Berry", "Rosemary"],
      base: ["Sun-Warmed Cedar", "Haitian Vetiver", "Ambroxan", "White Musk"]
    },
    longevity: "14+ Hours (Unprecedented for a citrus formulation)",
    longevityScore: 89,
    projection: "2.2m (Energizing & Crisp)",
    projectionScore: 84,
    season: "Spring & Scorching Summer Days",
    occasion: "Work, Travel, Outdoor Sports, Weekend Brunches",
    bottleTheme: {
      glassColor: "#2A2A1A",
      liquidColor: "#8A6D1F",
      capColor: "#B8862B",
      tint: "sunlit-gold",
      shape: "square"
    },
    image: "" /* SAMPLE: Set to "images/indus-citrus.jpg" when you have photos */
  },
  {
    id: "discovery-set",
    name: "The Discovery Sample Set",
    tagline: "All 6 Signature Extrait Fragrances (6 x 5ml Deluxe Atomizers)",
    category: "Gift Sets",
    scentFamily: "Oriental",
    concentration: "Extrait de Parfum Boxed Presentation",
    badge: "Best Value",
    rating: 5.0,
    reviewCount: 420,
    sizes: [
      { size: "6 x 5ml Vials", price: 2450 }
    ],
    description: "Cannot decide your signature scent? Experience the complete ZevairaLifestyle luxury portfolio. Includes 5ml deluxe gold glass atomizers of Royal Vetiver, Jasmine Blanc, Amber Mirage, Lahore Rain, Velvet Rose & Oud, and Indus Citrus, presented in an embossed forest-green gift box with a Rs 1,000 voucher towards your first 50ml or 100ml flacon.",
    notes: {
      top: ["Curated 6-Scent Flight", "Deluxe Mini Mist Atomizers"],
      heart: ["Fresh, Woody, Floral, Oriental & Citrus"],
      base: ["Includes Rs 1,000 Full-Bottle Gift Voucher inside"]
    },
    longevity: "Each vial provides ~70 sprays (Over 400 sprays total)",
    longevityScore: 92,
    projection: "Explore all projections",
    projectionScore: 88,
    season: "All Seasons & Gifting",
    occasion: "Gifting, Blind Buying, Travel Essentials",
    bottleTheme: {
      glassColor: "#142D21",
      liquidColor: "#B8862B",
      capColor: "#D9B15A",
      tint: "gift-set",
      shape: "discovery-box"
    },
    image: "" /* SAMPLE: Set to "images/discovery-set.jpg" when you have photos */
  }
];

/**
 * Returns an inline SVG illustration of a luxury perfume flacon.
 * Different shape, tint, and cap detailing per product.
 * Easily swappable with a real JPG/PNG in images/.
 */
function getBottleSvg(product, width = "100%", height = "auto") {
  // If product has a custom image path specified and it exists, an img tag can be returned:
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" class="product-real-img" loading="lazy" style="width:${width};height:${height};object-fit:cover;border-radius:6px;">`;
  }

  const { id, name, bottleTheme } = product;
  const pId = id || "perfume";

  if (bottleTheme.shape === "discovery-box") {
    return `
      <!-- REAL IMAGE DROP-IN: Swap with <img src="images/discovery-set.jpg" alt="${name}"> -->
      <svg class="flacon-svg flacon-box" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${width};height:${height};display:block;margin:0 auto;" aria-label="${name} luxury presentation box">
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
          <filter id="shadow_${pId}" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000" flood-opacity="0.38"/>
          </filter>
        </defs>
        <!-- Box shadow and base -->
        <rect x="25" y="45" width="190" height="205" rx="8" fill="url(#boxGrad_${pId})" stroke="url(#boxGold_${pId})" stroke-width="2" filter="url(#shadow_${pId})"/>
        <!-- Inner gold border inset -->
        <rect x="33" y="53" width="174" height="189" rx="5" fill="none" stroke="#D9B15A" stroke-width="0.75" stroke-dasharray="4 2" stroke-opacity="0.7"/>
        
        <!-- 6 sample vials lined up neatly -->
        <g transform="translate(42, 75)">
          <!-- Vial 1 -->
          <rect x="0" y="24" width="20" height="74" rx="3" fill="#1B4332" stroke="#D9B15A" stroke-width="1"/>
          <rect x="3" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
          <!-- Vial 2 -->
          <rect x="27" y="24" width="20" height="74" rx="3" fill="#E6D3A3" stroke="#B8862B" stroke-width="1"/>
          <rect x="30" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
          <!-- Vial 3 -->
          <rect x="54" y="24" width="20" height="74" rx="3" fill="#6B3A18" stroke="#D9B15A" stroke-width="1"/>
          <rect x="57" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
          <!-- Vial 4 -->
          <rect x="81" y="24" width="20" height="74" rx="3" fill="#2C5F57" stroke="#D9B15A" stroke-width="1"/>
          <rect x="84" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
          <!-- Vial 5 -->
          <rect x="108" y="24" width="20" height="74" rx="3" fill="#4A1629" stroke="#D9B15A" stroke-width="1"/>
          <rect x="111" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
          <!-- Vial 6 -->
          <rect x="135" y="24" width="20" height="74" rx="3" fill="#8C6F23" stroke="#D9B15A" stroke-width="1"/>
          <rect x="138" y="10" width="14" height="14" rx="2" fill="url(#boxGold_${pId})"/>
        </g>

        <!-- Golden plaque label -->
        <rect x="48" y="185" width="144" height="42" rx="3" fill="#0C1D14" stroke="url(#boxGold_${pId})" stroke-width="1.2"/>
        <text x="120" y="202" fill="#D9B15A" font-family="'Bodoni Moda', serif" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="2">ZEVAIRA</text>
        <text x="120" y="217" fill="#F5EFDC" font-family="'Hanken Grotesk', sans-serif" font-size="7.5" text-anchor="middle" letter-spacing="1.5">DISCOVERY FLIGHT • 6 x 5ML</text>
      </svg>
    `;
  }

  // Generate customized flacon per shape
  const glass = bottleTheme.glassColor || "#1B4332";
  const liquid = bottleTheme.liquidColor || "#2D6A4F";
  const cap = bottleTheme.capColor || "#D9B15A";

  let shapeMarkup = "";
  if (bottleTheme.shape === "cylindrical") {
    // Jasmine Blanc: tall round column
    shapeMarkup = `
      <!-- Cap -->
      <rect x="94" y="26" width="52" height="42" rx="4" fill="url(#capGrad_${pId})" stroke="#B8862B" stroke-width="1"/>
      <line x1="94" y1="46" x2="146" y2="46" stroke="#9A6F1F" stroke-width="1"/>
      <rect x="108" y="68" width="24" height="12" fill="url(#capGrad_${pId})"/>
      <!-- Bottle Body -->
      <rect x="68" y="80" width="104" height="175" rx="38" fill="url(#glassGrad_${pId})" stroke="url(#capGrad_${pId})" stroke-width="1.5" filter="url(#shadow_${pId})"/>
      <!-- Liquid fill -->
      <rect x="74" y="105" width="92" height="142" rx="32" fill="url(#liquidGrad_${pId})" opacity="0.85"/>
      <!-- Glass reflection highlight -->
      <path d="M78 105c0-12 8-22 20-22h4c-12 0-20 10-20 22v120c0 10 4 16 10 20-8-4-14-12-14-20V105z" fill="#fff" opacity="0.25"/>
    `;
  } else if (bottleTheme.shape === "octagonal") {
    // Amber Mirage: heavy architectural bevelled flacon
    shapeMarkup = `
      <!-- Cap: Heavy octagon -->
      <polygon points="102,24 138,24 152,38 152,62 138,72 102,72 88,62 88,38" fill="url(#capGrad_${pId})" stroke="#9A6F1F" stroke-width="1.2"/>
      <rect x="108" y="72" width="24" height="10" fill="url(#capGrad_${pId})"/>
      <!-- Bottle Body -->
      <polygon points="76,82 164,82 188,110 188,230 164,260 76,260 52,230 52,110" fill="url(#glassGrad_${pId})" stroke="url(#capGrad_${pId})" stroke-width="1.8" filter="url(#shadow_${pId})"/>
      <!-- Liquid fill -->
      <polygon points="80,105 160,105 178,125 178,220 158,248 82,248 62,220 62,125" fill="url(#liquidGrad_${pId})" opacity="0.85"/>
      <!-- Facet line highlights -->
      <line x1="76" y1="82" x2="76" y2="260" stroke="#D9B15A" stroke-width="0.8" opacity="0.4"/>
      <line x1="164" y1="82" x2="164" y2="260" stroke="#D9B15A" stroke-width="0.8" opacity="0.4"/>
    `;
  } else if (bottleTheme.shape === "curved") {
    // Velvet Rose & Oud: curved feminine shoulders
    shapeMarkup = `
      <!-- Cap: Spherical faceted jewel -->
      <circle cx="120" cy="45" r="22" fill="url(#capGrad_${pId})" stroke="#B8862B" stroke-width="1"/>
      <circle cx="120" cy="45" r="14" fill="#351421" stroke="#D9B15A" stroke-width="1" opacity="0.6"/>
      <rect x="108" y="67" width="24" height="14" fill="url(#capGrad_${pId})"/>
      <!-- Bottle Body -->
      <path d="M106 81h28l8 12c14 18 36 28 36 60v80c0 18-14 28-32 28H94c-18 0-32-10-32-28v-80c0-32 22-42 36-60l8-12z" fill="url(#glassGrad_${pId})" stroke="url(#capGrad_${pId})" stroke-width="1.5" filter="url(#shadow_${pId})"/>
      <!-- Liquid fill -->
      <path d="M107 106h26c12 16 32 24 32 50v70c0 12-10 20-22 20H97c-12 0-22-8-22-20v-70c0-26 20-34 32-50z" fill="url(#liquidGrad_${pId})" opacity="0.85"/>
    `;
  } else {
    // Default Regal Square (Royal Vetiver, Lahore Rain, Indus Citrus)
    shapeMarkup = `
      <!-- Cap: Heavy brass block -->
      <rect x="90" y="24" width="60" height="46" rx="3" fill="url(#capGrad_${pId})" stroke="#9A6F1F" stroke-width="1"/>
      <rect x="95" y="28" width="50" height="38" rx="2" fill="none" stroke="#FFF" stroke-width="0.5" stroke-opacity="0.4"/>
      <rect x="106" y="70" width="28" height="12" fill="url(#capGrad_${pId})"/>
      <!-- Heavy Base Glass Flacon -->
      <rect x="58" y="82" width="124" height="175" rx="10" fill="url(#glassGrad_${pId})" stroke="url(#capGrad_${pId})" stroke-width="1.8" filter="url(#shadow_${pId})"/>
      <!-- Liquid chamber -->
      <rect x="68" y="102" width="104" height="136" rx="6" fill="url(#liquidGrad_${pId})" opacity="0.85"/>
      <!-- Bottom heavy glass base plate -->
      <rect x="68" y="238" width="104" height="12" rx="2" fill="#fff" opacity="0.12"/>
      <!-- Vertical reflection streak -->
      <rect x="73" y="104" width="7" height="130" rx="3" fill="#fff" opacity="0.28"/>
    `;
  }

  return `
    <!-- REAL IMAGE DROP-IN: Swap with <img src="images/${pId}.jpg" alt="${name}"> -->
    <svg class="flacon-svg" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${width};height:${height};display:block;margin:0 auto;" aria-label="${name} Extrait de Parfum Bottle">
      <defs>
        <linearGradient id="glassGrad_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${glass}"/>
          <stop offset="60%" stop-color="#0B1A12"/>
          <stop offset="100%" stop-color="#040A07"/>
        </linearGradient>
        <linearGradient id="liquidGrad_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${liquid}"/>
          <stop offset="70%" stop-color="${liquid}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#08140E"/>
        </linearGradient>
        <linearGradient id="capGrad_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FBF7EA"/>
          <stop offset="35%" stop-color="${cap}"/>
          <stop offset="75%" stop-color="#B8862B"/>
          <stop offset="100%" stop-color="#805C15"/>
        </linearGradient>
        <linearGradient id="labelGold_${pId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDF8EC"/>
          <stop offset="50%" stop-color="#D9B15A"/>
          <stop offset="100%" stop-color="#A5791E"/>
        </linearGradient>
        <filter id="shadow_${pId}" x="-10%" y="-5%" width="120%" height="125%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#000" flood-opacity="0.45"/>
        </filter>
      </defs>

      <!-- Bottle markup -->
      ${shapeMarkup}

      <!-- Front Metallic Gold Label Plaque -->
      <g transform="translate(74, 134)">
        <rect width="92" height="74" rx="3" fill="#0C1F15" stroke="url(#labelGold_${pId})" stroke-width="1.2"/>
        <rect x="3" y="3" width="86" height="68" rx="2" fill="none" stroke="#D9B15A" stroke-width="0.5" stroke-opacity="0.6"/>
        <text x="46" y="24" fill="#D9B15A" font-family="'Bodoni Moda', serif" font-size="7.5" font-weight="600" text-anchor="middle" letter-spacing="1.8">ZEVAIRA</text>
        <text x="46" y="42" fill="#F5EFDC" font-family="'Bodoni Moda', serif" font-size="9" font-weight="600" text-anchor="middle" letter-spacing="0.5">${name.toUpperCase()}</text>
        <line x1="26" y1="48" x2="66" y2="48" stroke="#D9B15A" stroke-width="0.5" stroke-opacity="0.7"/>
        <text x="46" y="58" fill="#D9B15A" font-family="'Hanken Grotesk', sans-serif" font-size="5.5" text-anchor="middle" letter-spacing="1">EXTRAIT DE PARFUM</text>
        <text x="46" y="66" fill="#A9B8A8" font-family="'Hanken Grotesk', sans-serif" font-size="5" text-anchor="middle" letter-spacing="0.5">PAKISTAN</text>
      </g>
    </svg>
  `;
}

// Make accessible globally
if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.getBottleSvg = getBottleSvg;
}
