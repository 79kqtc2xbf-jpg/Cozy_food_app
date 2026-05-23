const CF37_VERSION = "webstable37-featured-content-polish";

(function setupV37FeaturedContentPolish() {
  const featuredHome = [
    "v34_0001", "v34_0002", "v34_0003", "v34_0004", "v34_0010",
    "v34_0020", "v34_0030", "v34_0006", "v34_0007", "v34_0121",
    "v34_0122", "v34_0124", "v34_0127", "v34_0129", "v34_0130",
    "v34_0131", "v34_0132", "v34_0140", "v34_0150", "v34_0244",
    "v34_0246", "v34_0248", "v34_0249", "v34_0284", "v34_0372",
    "v34_0373", "v34_0735", "v34_0881", "v34_0882", "v34_0883"
  ];

  const scenarioPriority = {
    no_energy: [
      "v34_0124", "v34_0132", "v34_0130", "v34_0140", "v34_0150",
      "v34_0010", "v34_0020", "v34_0030", "v34_0122", "v34_0002",
      "v34_0004", "v34_0129", "v34_0248", "v34_0246", "v34_0735",
      "v34_0882", "v34_0883", "v34_0006", "v34_0050", "v34_0001"
    ],
    fast: [
      "v34_0132", "v34_0010", "v34_0129", "v34_0130", "v34_0140",
      "v34_0150", "v34_0004", "v34_0020", "v34_0030", "v34_0122",
      "v34_0124", "v34_0248", "v34_0246", "v34_0249", "v34_0735",
      "v34_0006", "v34_0050", "v34_0740", "v34_0881", "v34_0882"
    ],
    sweet: [
      "v34_0002", "v34_0003", "v34_0004", "v34_0014", "v34_0015",
      "v34_0018", "v34_0024", "v34_0031", "v34_0038", "v34_0048",
      "v34_0740", "v34_0790", "v34_0881", "v34_0882", "v34_0883",
      "v34_0884", "v34_0885", "v34_0886", "v34_0887", "v34_0888"
    ],
    soup: [
      "v34_0244", "v34_0268", "v34_0371", "v34_0372", "v34_0373",
      "v34_0375", "v34_0376", "v34_0377", "v34_0381", "v34_0382"
    ]
  };

  const categoryPriority = {
    breakfast: [
      "v34_0001", "v34_0002", "v34_0003", "v34_0004", "v34_0009",
      "v34_0012", "v34_0015", "v34_0020", "v34_0021", "v34_0024",
      "v34_0033", "v34_0045", "v34_0048", "v34_0050", "v34_0061",
      "v34_0185", "v34_0740", "v34_0790", "v34_0882", "v34_0883"
    ],
    dinner: [
      "v34_0006", "v34_0007", "v34_0121", "v34_0122", "v34_0127",
      "v34_0129", "v34_0131", "v34_0140", "v34_0244", "v34_0246",
      "v34_0249", "v34_0284", "v34_0372", "v34_0373", "v34_0735",
      "v34_0736", "v34_0130", "v34_0150", "v34_0490", "v34_0883"
    ],
    sweet: [
      "v34_0002", "v34_0003", "v34_0004", "v34_0014", "v34_0015",
      "v34_0018", "v34_0024", "v34_0031", "v34_0038", "v34_0048",
      "v34_0740", "v34_0790", "v34_0881", "v34_0882", "v34_0883",
      "v34_0884", "v34_0885", "v34_0886", "v34_0887", "v34_0888"
    ]
  };

  const weakIds = new Set([
    "v34_0344", "v34_0974", "v34_0019", "v34_0064", "v34_1000",
    "v34_0219", "v34_0330", "v34_0360", "v34_0465", "v34_0034",
    "v34_0062", "v34_0063", "v34_0156", "v34_0216", "v34_0345",
    "v34_0475", "v34_0684", "v34_0896", "v34_0897", "v34_0923",
    "v34_0926", "v34_0941", "v34_0446", "v34_0447", "v34_0448",
    "v34_0450", "v34_0451", "v34_0100"
  ]);

  const titleOverrides = {
    v34_0064: "Овсянка с бананом и корицей",
    v34_0062: "Творожная миска с ягодами и йогуртом",
    v34_0923: "Сладкая овсяная миска с бананом и корицей",
    v34_0926: "Сладкая овсяная миска с яблоком и мёдом",
    v34_0941: "Сладкая овсяная миска с ягодами",
    v34_0447: "Куриный суп с рисом и морковью",
    v34_0448: "Овощной суп с фасолью и картофелем",
    v34_0100: "Лаваш с сыром и томатами",
    v34_0465: "Паста с томатами и сыром"
  };

  const ingredientOverrides = {
    v34_0923: [
      "овсяные хлопья быстрого приготовления — 45 г",
      "йогурт — 150 г",
      "банан — 1 шт.",
      "мёд — 1 ч. л.",
      "орехи — 1 ст. л.",
      "корица — щепотка"
    ],
    v34_0926: [
      "овсяные хлопья быстрого приготовления — 45 г",
      "йогурт — 150 г",
      "яблоко — 1 шт.",
      "мёд — 1 ч. л.",
      "орехи — 1 ст. л.",
      "корица — щепотка"
    ]
  };

  function uniqueIds(lists) {
    const found = new Set();
    return lists.flat().filter(id => {
      if (found.has(id)) return false;
      found.add(id);
      return true;
    });
  }

  const curatedIds = uniqueIds([
    featuredHome,
    scenarioPriority.no_energy,
    scenarioPriority.fast,
    scenarioPriority.sweet,
    scenarioPriority.soup,
    categoryPriority.breakfast,
    categoryPriority.dinner,
    categoryPriority.sweet
  ]);
  const visiblePolishIds = new Set([...curatedIds, ...weakIds]);
  const featuredRank = new Map(featuredHome.map((id, index) => [id, index]));
  const curatedRank = new Map(curatedIds.map((id, index) => [id, index]));

  function searchText(recipe) {
    return [
      recipe.title,
      ...(recipe.category || []),
      ...(recipe.ingredients || []),
      ...(recipe.steps || [])
    ].join(" ").toLowerCase();
  }

  function variedStep(recipe, choices) {
    const key = String(recipe.id || "");
    const seed = [...key].reduce((total, char) => total + char.charCodeAt(0), 0);
    return choices[seed % choices.length];
  }

  function naturalFinalStep(recipe) {
    const hay = searchText(recipe);
    if (hay.includes("суп") || hay.includes("похлёб")) {
      return variedStep(recipe, [
        "Попробуй суп на соль, добавь зелень перед подачей и дай ему постоять 2 минуты.",
        "Сними суп с огня и дай постоять 2 минуты, затем подавай тёплым.",
        "Если суп получился густым, добавь 1–2 ложки воды, прогрей и подавай."
      ]);
    }
    if (hay.includes("слад") || hay.includes("десерт") || hay.includes("творог") || hay.includes("овсян")) {
      return variedStep(recipe, [
        "Подавай с ягодами или фруктами, пока вкус свежий и мягкий.",
        "Добавь ложку йогурта перед подачей и подавай сразу.",
        "Дай миске постоять 2 минуты и подавай с каплей мёда."
      ]);
    }
    if (hay.includes("паста") || hay.includes("макарон") || hay.includes("лапш")) {
      return variedStep(recipe, [
        "Попробуй на соль, перемешай с соусом и подавай тёплым.",
        "Если густо, добавь 1–2 ложки воды, перемешай и подавай.",
        "Сними с огня, добавь зелень перед подачей и перемешай."
      ]);
    }
    if (hay.includes("салат") || hay.includes("намазк") || hay.includes("без готовки")) {
      return variedStep(recipe, [
        "Попробуй на соль и подавай сразу, пока вкус свежий.",
        "Добавь зелень перед подачей и аккуратно перемешай.",
        "Дай вкусам соединиться 2 минуты и подавай."
      ]);
    }
    if (hay.includes("омлет") || hay.includes("яйц") || hay.includes("лаваш") || hay.includes("бутерброд")) {
      return variedStep(recipe, [
        "Сними с огня, дай постоять 1 минуту и подавай тёплым.",
        "Добавь зелень перед подачей и подавай тёплым.",
        "Сними с огня и дай постоять 2 минуты перед подачей."
      ]);
    }
    if (hay.includes("рыб") || hay.includes("куриц") || hay.includes("фарш")) {
      return variedStep(recipe, [
        "Сними с огня и дай постоять 2 минуты перед подачей.",
        "Попробуй на соль и подавай тёплым.",
        "Добавь зелень перед подачей и дай блюду постоять 2 минуты."
      ]);
    }
    return variedStep(recipe, [
      "Попробуй на соль, добавь зелень перед подачей и подавай тёплым.",
      "Сними с огня и дай постоять 2 минуты.",
      "Если густо, добавь 1–2 ложки воды и подавай тёплым."
    ]);
  }

  function polishRecipe(recipe) {
    if (!recipe || !recipe.id) return recipe;
    const hasOverride = titleOverrides[recipe.id] || ingredientOverrides[recipe.id];
    const shouldPolish = visiblePolishIds.has(recipe.id);
    if (!hasOverride && !shouldPolish) return recipe;

    const polished = {...recipe};
    if (titleOverrides[recipe.id]) polished.title = titleOverrides[recipe.id];
    if (ingredientOverrides[recipe.id]) polished.ingredients = [...ingredientOverrides[recipe.id]];
    if (shouldPolish && Array.isArray(recipe.steps) && recipe.steps.length) {
      polished.steps = [...recipe.steps];
      polished.steps[polished.steps.length - 1] = naturalFinalStep(polished);
    }
    polished._searchText = searchText(polished);
    return polished;
  }

  function groupForSort(recipe) {
    if (featuredRank.has(recipe.id)) return [0, featuredRank.get(recipe.id)];
    if (curatedRank.has(recipe.id)) return [1, curatedRank.get(recipe.id)];
    if (weakIds.has(recipe.id)) return [3, 0];
    return [2, 0];
  }

  function sortedRecipes(list) {
    return list.map((recipe, index) => ({recipe, index})).sort((left, right) => {
      const a = groupForSort(left.recipe);
      const b = groupForSort(right.recipe);
      return a[0] - b[0] || a[1] - b[1] || left.index - right.index;
    }).map(item => item.recipe);
  }

  function setVersionMarker() {
    window.CF37_VERSION = CF37_VERSION;
    if (document && document.body) {
      document.body.dataset.cozyVersion = CF37_VERSION;
      document.body.dataset.cozyFeaturedLayer = CF37_VERSION;
    }
  }

  function applyV37ContentPolish() {
    try {
      if (!Array.isArray(recipes) || recipes.length < 900) {
        setVersionMarker();
        return;
      }

      recipes = recipes.map(polishRecipe);
      const userRecipes = typeof getUserRecipes === "function" ? getUserRecipes() : [];
      allRecipes = sortedRecipes([...recipes, ...userRecipes]);
      setVersionMarker();

      if (typeof renderAll === "function") renderAll();
      if (typeof updateFloatingRandom === "function") updateFloatingRandom();
    } catch (error) {
      console.warn("Cozy Foodie v37 content polish skipped", error);
    }
  }

  if (!window.CF37_SCENARIO_PRIORITY_APPLIED && typeof getScenarioRecipes === "function") {
    window.CF37_SCENARIO_PRIORITY_APPLIED = true;
    const oldGetScenarioRecipes = getScenarioRecipes;
    getScenarioRecipes = function curatedScenarioRecipes(name) {
      const fallback = oldGetScenarioRecipes(name) || [];
      const priority = scenarioPriority[name];
      if (!priority) {
        return [
          ...fallback.filter(recipe => !weakIds.has(recipe.id)),
          ...fallback.filter(recipe => weakIds.has(recipe.id))
        ];
      }

      const byId = new Map((allRecipes || []).map(recipe => [recipe.id, recipe]));
      const selected = new Set();
      const curated = priority.map(id => byId.get(id)).filter(Boolean).filter(recipe => {
        if (selected.has(recipe.id)) return false;
        selected.add(recipe.id);
        return true;
      });
      const normal = fallback.filter(recipe => !selected.has(recipe.id) && !weakIds.has(recipe.id));
      const weak = fallback.filter(recipe => !selected.has(recipe.id) && weakIds.has(recipe.id));
      return [...curated, ...normal, ...weak];
    };
  }

  if (!window.CF37_FILTERED_PRIORITY_APPLIED && typeof getFiltered === "function") {
    window.CF37_FILTERED_PRIORITY_APPLIED = true;
    const oldGetFiltered = getFiltered;
    getFiltered = function curatedFilteredRecipes() {
      const filtered = oldGetFiltered();
      const priority = scenarioPriority[activeScenario];
      if (!priority) return filtered;

      const priorityRank = new Map(priority.map((id, index) => [id, index]));
      return filtered
        .map((recipe, index) => ({ recipe, index }))
        .sort((left, right) => {
          const leftRank = priorityRank.has(left.recipe.id)
            ? priorityRank.get(left.recipe.id)
            : Number.MAX_SAFE_INTEGER;
          const rightRank = priorityRank.has(right.recipe.id)
            ? priorityRank.get(right.recipe.id)
            : Number.MAX_SAFE_INTEGER;
          if (leftRank !== rightRank) return leftRank - rightRank;

          const leftWeak = weakIds.has(left.recipe.id) ? 1 : 0;
          const rightWeak = weakIds.has(right.recipe.id) ? 1 : 0;
          if (leftWeak !== rightWeak) return leftWeak - rightWeak;

          return left.index - right.index;
        })
        .map(item => item.recipe);
    };
  }

  if (!window.CF37_FRIDGE_MATCH_APPLIED) {
    window.CF37_FRIDGE_MATCH_APPLIED = true;
    findByIngredients = function exactFirstIngredientSearch() {
      const input = document.getElementById("fridgeInput");
      const words = (input && input.value || "").toLowerCase()
        .split(",")
        .map(word => word.trim())
        .filter(Boolean);
      if (!words.length) {
        renderGrid([], "fridgeGrid");
        return;
      }

      const matches = (allRecipes || []).filter(recipe => {
        const hay = (recipe.ingredients || []).join(" ").toLowerCase();
        return words.every(word => hay.includes(word));
      });
      if (words.length === 1) {
        renderGrid(matches.slice(0, 60), "fridgeGrid");
        return;
      }

      if (!matches.length) {
        renderGrid([], "fridgeGrid");
        return;
      }
      const exactIds = new Set(matches.map(recipe => recipe.id));
      const partial = (allRecipes || []).filter(recipe => {
        if (exactIds.has(recipe.id)) return false;
        const hay = (recipe.ingredients || []).join(" ").toLowerCase();
        return words.some(word => hay.includes(word));
      });
      renderGrid([...matches, ...partial].slice(0, 60), "fridgeGrid");
    };
    const fridgeButton = document.getElementById("fridgeBtn");
    if (fridgeButton) fridgeButton.onclick = findByIngredients;
  }

  window.applyV37ContentPolish = applyV37ContentPolish;
  setVersionMarker();
  applyV37ContentPolish();
  window.addEventListener("load", applyV37ContentPolish);
  [500, 1300, 2600, 5200].forEach(delay => setTimeout(applyV37ContentPolish, delay));

  console.info("Cozy Foodie v37 loaded: featured ordering and visible content polish");
})();
