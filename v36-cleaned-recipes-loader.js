const CF36_RECIPES_VERSION = "webstable36-cleaned-recipes";

(async function loadV36CleanedRecipes() {
  let loadedRecipes = null;

  function applyV36Recipes() {
    if (!Array.isArray(loadedRecipes) || loadedRecipes.length < 900) return;

    recipes = loadedRecipes.map((recipe, index) =>
      typeof normalizeRecipe === "function" ? normalizeRecipe(recipe, index) : recipe
    );

    allRecipes = [
      ...recipes,
      ...(typeof getUserRecipes === "function" ? getUserRecipes() : [])
    ];

    activeScenario = null;
    currentFilter = "all";
    visibleCount = 30;

    document.querySelectorAll(".chip").forEach(button => {
      button.classList.toggle("active", button.dataset.filter === "all");
    });
    document.querySelectorAll(".quick-wishes button").forEach(button => {
      button.classList.remove("active");
    });

    if (document && document.body) {
      document.body.dataset.cozyVersion = CF36_RECIPES_VERSION;
    }

    if (typeof renderAll === "function") renderAll();
    if (typeof updateFloatingRandom === "function") updateFloatingRandom();

    console.info("Cozy Foodie v36 loaded: cleaned recipes", recipes.length);
  }

  try {
    const response = await fetch(`recipes-v36-cleaned.json?v=${CF36_RECIPES_VERSION}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 900) return;

    loadedRecipes = data;
    applyV36Recipes();

    window.addEventListener("load", applyV36Recipes);
    [400, 1200, 2500].forEach(delay => setTimeout(applyV36Recipes, delay));
  } catch (error) {
    console.warn("Cozy Foodie v36 cleaned recipes loader fallback", error);
  }
})();
