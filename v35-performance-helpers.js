const CF35_VERSION = "webstable35-performance-helpers";

(function applyV35PerformanceHelpers() {
  if (window.CF35_PERFORMANCE_HELPERS_APPLIED) return;
  window.CF35_PERFORMANCE_HELPERS_APPLIED = true;
  window.CF35_VERSION = CF35_VERSION;

  function indexRecipe(recipe) {
    if (!recipe) return recipe;
    if (recipe._searchText) return recipe;

    recipe._searchText = [
      recipe.title,
      ...(recipe.category || []),
      ...(recipe.ingredients || []),
      ...(recipe.steps || [])
    ].join(" ").toLowerCase();

    return recipe;
  }

  function indexAllRecipes() {
    try {
      if (Array.isArray(recipes)) recipes.forEach(indexRecipe);
      if (Array.isArray(allRecipes)) allRecipes.forEach(indexRecipe);
      if (document && document.body) {
        document.body.dataset.cozyVersion = CF35_VERSION;
      }
    } catch (error) {
      console.warn("Cozy Foodie v35 indexing skipped", error);
    }
  }

  try {
    const oldRecipeHay = typeof recipeHay === "function" ? recipeHay : null;
    if (oldRecipeHay && !window.CF35_RECIPE_HAY_PATCHED) {
      window.CF35_RECIPE_HAY_PATCHED = true;
      recipeHay = function cachedRecipeHay(recipe) {
        if (!recipe) return "";
        if (!recipe._searchText) indexRecipe(recipe);
        return recipe._searchText || oldRecipeHay(recipe);
      };
    }
  } catch (error) {
    console.warn("Cozy Foodie v35 recipeHay patch skipped", error);
  }

  indexAllRecipes();
  window.addEventListener("load", indexAllRecipes);
  [400, 1200, 2500, 5000].forEach(delay => setTimeout(indexAllRecipes, delay));

  console.info("Cozy Foodie v35 loaded: performance helpers and stable version marker");
})();
