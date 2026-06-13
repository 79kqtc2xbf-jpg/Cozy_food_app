const CF38_VERSION = "webstable40-fallback-visual-taxonomy";

(function setupV38RecipeImages() {
  if (window.CF38_RECIPE_IMAGES_APPLIED) return;
  window.CF38_RECIPE_IMAGES_APPLIED = true;
  window.CF38_VERSION = CF38_VERSION;

  let imageMap = {};

  function fallbackFor(recipe) {
    const hay = [
      recipe?.title,
      ...(recipe?.category || []),
      ...(recipe?.ingredients || [])
    ].join(" ").toLowerCase();
    const hasStandaloneShchi = /(^|\s)щи(\s|$)/.test(hay);

    let emoji = "🍽️";
    if (hay.includes("омлет") || hay.includes("яичниц") || hay.includes("яйц")) emoji = "🍳";
    if (hay.includes("куриц")) emoji = "🍗";
    if (hay.includes("рыб") || hay.includes("тунец") || hay.includes("лосос")) emoji = "🐟";
    if (hay.includes("овсян") || hay.includes("каша")) emoji = "🥣";
    if (hay.includes("ягод")) emoji = "🍓";
    if (hay.includes("творог") || hay.includes("сырник") || hay.includes("олад")) emoji = "🥞";
    if (hay.includes("рис")) emoji = "🍚";
    if (hay.includes("греч")) emoji = hay.includes("гриб") ? "🍄" : "🥣";
    if (hay.includes("лаваш") || hay.includes("wrap") || hay.includes("tortilla")) emoji = "🌯";
    if (hay.includes("пельмен") || hay.includes("вареник")) emoji = "🥟";
    if (hay.includes("паста") || hay.includes("макарон") || hay.includes("лапш")) emoji = "🍝";
    if (hay.includes("суп") || hay.includes("похлёб") || hay.includes("похлеб") || hay.includes("борщ") || hasStandaloneShchi) emoji = "🥣";
    if (hay.includes("карто") || hay.includes("пюре")) emoji = "🥔";
    if (hay.includes("салат") || hay.includes("свежие овощи")) emoji = "🥗";
    if (hay.includes("фасол") || hay.includes("чечев") || hay.includes("нут")) emoji = "🫘";
    if ((hay.includes("десерт") || hay.includes("слад") || hay.includes("пирог") || hay.includes("кекс") || hay.includes("печень") || hay.includes("шоколад")) && emoji === "🍽️") emoji = "🍰";
    if (hay.includes("бутерброд") || hay.includes("тост")) emoji = "🥪";
    if (hay.includes("сыр") && emoji === "🍽️") emoji = "🧀";

    return typeof makeImg === "function" ? makeImg(emoji) : recipe?.image;
  }

  function isGeneratedFallback(src) {
    return typeof src === "string" && src.startsWith("data:image/svg+xml");
  }

  function imageFor(recipe) {
    if (!recipe || !recipe.id) return recipe?.image;
    if (imageMap[recipe.id]) return imageMap[recipe.id];
    if (recipe.image && !isGeneratedFallback(recipe.image)) return recipe.image;
    return fallbackFor(recipe);
  }

  function applyRecipeImages() {
    try {
      if (!Array.isArray(allRecipes)) return;
      allRecipes.forEach(recipe => {
        if (!recipe) return;
        recipe.image = imageFor(recipe);
      });
      if (Array.isArray(recipes)) {
        recipes.forEach(recipe => {
          if (!recipe) return;
          recipe.image = imageFor(recipe);
        });
      }
      if (document && document.body) {
        document.body.dataset.cozyImageLayer = CF38_VERSION;
      }
      if (typeof renderAll === "function") renderAll();
      if (typeof updateFloatingRandom === "function") updateFloatingRandom();
    } catch (error) {
      console.warn("Cozy Foodie v40 image apply skipped", error);
    }
  }

  async function loadImageManifest() {
    try {
      const response = await fetch(`recipe-images.json?v=${CF38_VERSION}`);
      const manifest = await response.json();
      imageMap = manifest?.recipes && typeof manifest.recipes === "object" ? manifest.recipes : {};
      applyRecipeImages();
      window.addEventListener("load", applyRecipeImages);
      [500, 1400, 2800, 5600].forEach(delay => setTimeout(applyRecipeImages, delay));
      console.info("Cozy Foodie v40 loaded: fallback visual taxonomy", Object.keys(imageMap).length);
    } catch (error) {
      console.warn("Cozy Foodie v40 image manifest fallback", error);
      applyRecipeImages();
    }
  }

  window.CF38_APPLY_RECIPE_IMAGES = applyRecipeImages;
  loadImageManifest();
})();
