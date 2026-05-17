const CF33_VERSION = "webstable33-photo-stability-cleanup";

(function applyV33PhotoStabilityCleanup() {
  if (window.CF33_PHOTO_STABILITY_CLEANUP_APPLIED) return;
  window.CF33_PHOTO_STABILITY_CLEANUP_APPLIED = true;
  window.CF33_VERSION = CF33_VERSION;

  const badStockIds = new Set([
    "v15_001", "v15_002", "v15_003", "v15_005", "v15_006",
    "v15_007", "v15_008", "v15_010", "v15_011"
  ]);

  const badUrlPatterns = [
    /source\.unsplash\.com/i,
    /images\.pexels\.com\/photos\/15076696/i,
    /images\.pexels\.com\/photos\/34326230/i,
    /images\.pexels\.com\/photos\/5848057/i,
    /images\.pexels\.com\/photos\/7368044/i,
    /images\.pexels\.com\/photos\/32021301/i
  ];

  function shouldRollbackPhoto(recipe) {
    if (!recipe) return false;
    const image = String(recipe.image || "");
    return badStockIds.has(recipe.id) ||
      recipe.photoStatus === "approved_stock" ||
      recipe.photoStatus === "stock_search_url" ||
      badUrlPatterns.some(pattern => pattern.test(image));
  }

  function safeFallbackImage(recipe) {
    const emoji = recipe?.emoji || "🍽️";
    if (typeof makeImg === "function") return makeImg(emoji);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900'%3E%3Crect width='1200' height='900' fill='%23201820'/%3E%3Ctext x='600' y='500' font-size='190' text-anchor='middle'%3E${encodeURIComponent(emoji)}%3C/text%3E%3C/svg%3E`;
  }

  function cleanupRecipe(recipe) {
    if (!shouldRollbackPhoto(recipe)) return recipe;
    return {
      ...recipe,
      image: safeFallbackImage(recipe),
      photoSource: "cozy_fallback",
      photoStatus: "rolled_back_v33"
    };
  }

  function cleanupLoadedRecipes() {
    try {
      if (Array.isArray(recipes)) recipes = recipes.map(cleanupRecipe);
      if (Array.isArray(allRecipes)) {
        const userRecipes = typeof getUserRecipes === "function" ? getUserRecipes() : [];
        allRecipes = [...recipes, ...userRecipes].map(cleanupRecipe);
      }
      if (typeof renderAll === "function") renderAll();
      if (typeof updateFloatingRandom === "function") updateFloatingRandom();
    } catch (error) {
      console.warn("Cozy Foodie v33 photo cleanup skipped", error);
    }
  }

  try {
    if (typeof normalizeRecipe === "function" && !window.CF33_NORMALIZE_PATCHED) {
      window.CF33_NORMALIZE_PATCHED = true;
      const previousNormalizeRecipe = normalizeRecipe;
      window.normalizeRecipe = function patchedNormalizeRecipe(recipe, index) {
        return cleanupRecipe(previousNormalizeRecipe(recipe, index));
      };
    }
  } catch (error) {
    console.warn("Cozy Foodie v33 normalize patch skipped", error);
  }

  function injectStyles() {
    if (!document || document.getElementById("cf33-photo-stability-style")) return;
    const style = document.createElement("style");
    style.id = "cf33-photo-stability-style";
    style.textContent = `
      .cf33-photo-stability-cleanup .card-img-fallback,
      .cf33-photo-stability-cleanup .modal .card-img-fallback {
        min-height: 210px;
        display: grid;
        place-items: center;
        border-radius: 24px;
        background: radial-gradient(circle at top left, rgba(255,122,89,.28), transparent 34%), #201820;
        font-size: 82px;
      }
    `;
    document.head.appendChild(style);
  }

  function markVersion() {
    if (!document || !document.body) return;
    document.body.dataset.cozyVersion = CF33_VERSION;
    document.body.classList.add("cf33-photo-stability-cleanup");
    const badge = document.getElementById("cf32StableBadge");
    if (badge) badge.textContent = "stable v33";
  }

  injectStyles();
  markVersion();
  cleanupLoadedRecipes();

  window.addEventListener("load", cleanupLoadedRecipes);
  [400, 1200, 2500, 4500].forEach(delay => setTimeout(() => {
    injectStyles();
    markVersion();
    cleanupLoadedRecipes();
  }, delay));

  console.info("Cozy Foodie v33 loaded: photo stability cleanup, stock test rollback guard");
})();
