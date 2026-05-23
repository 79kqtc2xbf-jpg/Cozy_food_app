const CF38_VERSION = "webstable38-image-pipeline";

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

    let emoji = recipe?.emoji || "🍽️";
    if (hay.includes("суп")) emoji = "🥣";
    else if (hay.includes("паста") || hay.includes("макарон") || hay.includes("лапш")) emoji = "🍝";
    else if (hay.includes("завтрак") || hay.includes("омлет") || hay.includes("яйц")) emoji = "🍳";
    else if (hay.includes("слад") || hay.includes("десерт") || hay.includes("творог")) emoji = "🍯";
    else if (hay.includes("куриц")) emoji = "🍗";
    else if (hay.includes("рыб")) emoji = "🐟";
    else if (hay.includes("салат") || hay.includes("овощ")) emoji = "🥗";
    else if (hay.includes("карто")) emoji = "🥔";

    return typeof makeImg === "function" ? makeImg(emoji) : recipe?.image;
  }

  function imageFor(recipe) {
    if (!recipe || !recipe.id) return recipe?.image;
    return imageMap[recipe.id] || recipe.image || fallbackFor(recipe);
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
      console.warn("Cozy Foodie v38 image apply skipped", error);
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
      console.info("Cozy Foodie v38 loaded: image pipeline", Object.keys(imageMap).length);
    } catch (error) {
      console.warn("Cozy Foodie v38 image manifest fallback", error);
      applyRecipeImages();
    }
  }

  window.CF38_APPLY_RECIPE_IMAGES = applyRecipeImages;
  loadImageManifest();
})();
