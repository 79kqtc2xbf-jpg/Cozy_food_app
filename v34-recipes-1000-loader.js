const CF34_RECIPES_VERSION = "webstable34-recipes-1000";

(async function loadV34Recipes1000() {
  let loadedRecipes = null;

  function applyV34Recipes() {
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
      document.body.dataset.cozyVersion = CF34_RECIPES_VERSION;
    }

    if (typeof renderAll === "function") renderAll();
    if (typeof updateFloatingRandom === "function") updateFloatingRandom();

    console.info("Cozy Foodie v34 loaded: 1000 recipes", recipes.length);
  }

  try {
    const response = await fetch(`recipes-v34-1000.json?v=${CF34_RECIPES_VERSION}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 900) return;

    loadedRecipes = data;
    applyV34Recipes();

    window.addEventListener("load", applyV34Recipes);
    [400, 1200, 2500].forEach(delay => setTimeout(applyV34Recipes, delay));
  } catch (error) {
    console.warn("Cozy Foodie v34 recipes loader fallback", error);
  }
})();
