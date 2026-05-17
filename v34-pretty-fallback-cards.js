const CF34_VERSION = "webstable34-pretty-fallback-cards";

(function applyV34PrettyFallbackCards() {
  if (window.CF34_PRETTY_FALLBACK_CARDS_APPLIED) return;
  window.CF34_PRETTY_FALLBACK_CARDS_APPLIED = true;
  window.CF34_VERSION = CF34_VERSION;

  const foodPalette = {
    "🥞": ["#4a251f", "#9f5b36", "#ffd38a"],
    "🍳": ["#1d1b21", "#5b4632", "#fff0a8"],
    "🥔": ["#2a1f1b", "#7d5032", "#f2c177"],
    "🥣": ["#1c2230", "#3d6470", "#ffe4b8"],
    "🍝": ["#241a20", "#784432", "#ffd087"],
    "🍗": ["#2a1918", "#8a3f2b", "#ffc28a"],
    "🧀": ["#241d18", "#9f6a23", "#ffe28a"],
    "🍫": ["#21161b", "#5b2f36", "#f3b57d"],
    "🥗": ["#18231d", "#3e6a45", "#d7f2a8"],
    "🍚": ["#1b2027", "#59646f", "#fff7da"],
    "🍽️": ["#201820", "#5c3541", "#ffd3a3"]
  };

  function encodeSvg(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function prettyImg(emoji = "🍽️") {
    const key = foodPalette[emoji] ? emoji : "🍽️";
    const [bg, mid, glow] = foodPalette[key];
    const safeEmoji = String(emoji || "🍽️");

    return encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <defs>
          <radialGradient id="g1" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stop-color="${mid}" stop-opacity="0.92"/>
            <stop offset="48%" stop-color="${bg}" stop-opacity="0.96"/>
            <stop offset="100%" stop-color="#120f14" stop-opacity="1"/>
          </radialGradient>
          <radialGradient id="g2" cx="52%" cy="48%" r="36%">
            <stop offset="0%" stop-color="${glow}" stop-opacity="0.38"/>
            <stop offset="62%" stop-color="${glow}" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
          </radialGradient>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="34" stdDeviation="34" flood-color="#000000" flood-opacity="0.34"/>
          </filter>
        </defs>
        <rect width="1200" height="900" fill="url(#g1)"/>
        <circle cx="600" cy="430" r="318" fill="url(#g2)"/>
        <circle cx="280" cy="170" r="115" fill="#ffffff" opacity="0.045"/>
        <circle cx="980" cy="720" r="190" fill="#ffffff" opacity="0.035"/>
        <ellipse cx="600" cy="606" rx="300" ry="72" fill="#000000" opacity="0.22"/>
        <text x="600" y="505" font-size="250" text-anchor="middle" dominant-baseline="middle" filter="url(#softShadow)">${safeEmoji}</text>
        <rect x="408" y="700" width="384" height="58" rx="29" fill="#ffffff" opacity="0.075"/>
        <text x="600" y="738" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#fff4d6" text-anchor="middle" opacity="0.82">Cozy Foodie</text>
      </svg>
    `);
  }

  function isFallbackLike(image) {
    const src = String(image || "");
    return !src ||
      src.startsWith("data:image/svg+xml") ||
      src.includes("source.unsplash.com") ||
      src.includes("images.pexels.com/photos/15076696") ||
      src.includes("images.pexels.com/photos/34326230") ||
      src.includes("images.pexels.com/photos/5848057") ||
      src.includes("images.pexels.com/photos/7368044") ||
      src.includes("images.pexels.com/photos/32021301");
  }

  function polishRecipe(recipe) {
    if (!recipe) return recipe;
    if (!isFallbackLike(recipe.image)) return recipe;
    return {
      ...recipe,
      image: prettyImg(recipe.emoji || "🍽️"),
      photoSource: "cozy_pretty_fallback",
      photoStatus: "polished_v34"
    };
  }

  window.makeImg = prettyImg;

  try {
    if (typeof normalizeRecipe === "function" && !window.CF34_NORMALIZE_PATCHED) {
      window.CF34_NORMALIZE_PATCHED = true;
      const previousNormalizeRecipe = normalizeRecipe;
      window.normalizeRecipe = function patchedNormalizeRecipe(recipe, index) {
        return polishRecipe(previousNormalizeRecipe(recipe, index));
      };
    }
  } catch (error) {
    console.warn("Cozy Foodie v34 normalize patch skipped", error);
  }

  function polishLoadedRecipes() {
    try {
      if (Array.isArray(recipes)) recipes = recipes.map(polishRecipe);
      if (Array.isArray(allRecipes)) {
        const userRecipes = typeof getUserRecipes === "function" ? getUserRecipes() : [];
        allRecipes = [...recipes, ...userRecipes].map(polishRecipe);
      }
      if (typeof renderAll === "function") renderAll();
      if (typeof updateFloatingRandom === "function") updateFloatingRandom();
    } catch (error) {
      console.warn("Cozy Foodie v34 polish skipped", error);
    }
  }

  function injectStyles() {
    if (!document || document.getElementById("cf34-pretty-fallback-style")) return;
    const style = document.createElement("style");
    style.id = "cf34-pretty-fallback-style";
    style.textContent = `
      .cf34-pretty-fallback-cards .card img {
        object-fit: cover !important;
        background: #171219;
      }
      .cf34-pretty-fallback-cards .card::before {
        opacity: .08 !important;
      }
      .cf34-pretty-fallback-cards .modal-img {
        object-fit: cover !important;
        background: #171219;
      }
      .cf34-pretty-fallback-cards .card-img-fallback {
        min-height: 220px;
        display: grid;
        place-items: center;
        border-radius: 24px;
        background: radial-gradient(circle at center, rgba(255,211,163,.16), transparent 42%), #171219;
        font-size: 84px;
      }
    `;
    document.head.appendChild(style);
  }

  function markVersion() {
    if (!document || !document.body) return;
    document.body.dataset.cozyVersion = CF34_VERSION;
    document.body.classList.add("cf34-pretty-fallback-cards");
    const badge = document.getElementById("cf32StableBadge");
    if (badge) badge.textContent = "stable v34";
  }

  injectStyles();
  markVersion();
  polishLoadedRecipes();

  window.addEventListener("load", polishLoadedRecipes);
  [300, 900, 1800, 3200, 5200].forEach(delay => setTimeout(() => {
    injectStyles();
    markVersion();
    polishLoadedRecipes();
  }, delay));

  console.info("Cozy Foodie v34 loaded: prettier stable fallback cards, no external photo generation");
})();
