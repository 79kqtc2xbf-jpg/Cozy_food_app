# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable40-fallback-visual-taxonomy`
- Current version label: `webstable40-fallback-visual-taxonomy`
- Status: v40 fallback visual taxonomy connected; no real recipe image mappings yet

---

## webstable40-fallback-visual-taxonomy

Date: 2026-06-14
Status: runtime fallback taxonomy patch
Type: fallback image classification / no real images

### Что изменено

- Улучшена классификация fallback-визуалов в `v38-recipe-images-loader.js`.
- Real-image mappings сохранены на будущее: `recipe-images.json` по-прежнему может переопределять fallback через `images/recipes/...`.
- `index.html` поднят на query version `webstable40-fallback-visual-taxonomy`.
- Реальные изображения не добавлялись.
- `assets/` не создавался и не добавлялся.
- Рецептурные JSON-базы не менялись.
- `app.js` и `styles.css` не менялись.

### Новая fallback taxonomy

- Яйца и омлеты: `🍳`
- Овсянка и каши: `🥣`
- Творожные блюда, сырники и оладьи: `🥞`
- Ягоды: `🍓`
- Рис: `🍚`
- Гречка с грибами: `🍄`
- Лаваш/wrap: `🌯`
- Пельмени/вареники: `🥟`
- Паста/макароны/лапша: `🍝`
- Супы/похлёбки: `🥣`
- Картофель/пюре: `🥔`
- Курица: `🍗`
- Рыба/тунец/лосось: `🐟`
- Салаты: `🥗`
- Бобовые: `🫘`
- Десерты: `🍰`
- Бутерброды/тосты: `🥪`
- Сырные блюда без более точного типа: `🧀`

### Проверить

1. Приложение открывается.
2. Загружается 1000 рецептов.
3. `document.body.dataset.cozyImageLayer` равен `webstable40-fallback-visual-taxonomy`.
4. `recipe-images.json` остаётся с `0` mappings.
5. Fallback-визуалы стали точнее для первых featured-рецептов.
6. Broken loaded images: `0`.

---

## webstable38-image-pipeline cleanup QA

Date: 2026-06-13
Status: stable cleanup confirmed
Commit: `180e53e chore: remove mismatched recipe image assets`
Type: image asset cleanup / QA status

### Что подтверждено

- `webstable38-image-pipeline` остаётся текущей stable-точкой web image pipeline.
- Неудачный первый image batch был удалён из runtime: `recipe-images.json` снова содержит `"recipes": {}`.
- Commit `180e53e` удалил 20 mismatched `.webp` из `images/recipes/`.
- `assets/` не является runtime-папкой приложения и не должен попадать в commit.
- Runtime image paths не должны указывать на `assets/`.
- Fallback-поведение подтверждено рабочим.
- QA прошёл с `0` broken loaded images.

### Проверено

1. Приложение открывается.
2. Загружается 1000 рецептов.
3. `document.body.dataset.cozyImageLayer` равен `webstable38-image-pipeline`.
4. `recipe-images.json` валиден и не содержит mappings на неутверждённые картинки.
5. Первые карточки используют fallback, без битых загруженных изображений.
6. Runtime-ссылок на `assets/` нет.

### Следующий безопасный шаг

- Либо ручная visual QA будущих food photos до добавления mappings.
- Либо отдельный controlled image pipeline patch с маленьким проверенным batch.

---

## webstable39-image-asset-automation

Date: 2026-05-31
Status: tooling added, not app stable
Type: image asset automation tools / manifest helper

### Что изменено

- Добавлен `scripts/slice_recipe_collage.py` для нарезки AI-коллажей по сетке в отдельные `.webp` файлы.
- Добавлен `scripts/update_recipe_image_manifest.py` для безопасного обновления `recipe-images.json`.
- Добавлен `IMAGE_ASSET_WORKFLOW.md` с русской инструкцией по генерации clean collage, нарезке, обновлению manifest и проверке.
- Current stable не менялся: приложение остаётся на `webstable38-image-pipeline`.
- `app.js`, `styles.css`, `index.html`, JSON-базы рецептов, дизайн и изображения не менялись.

### Затронутые файлы

- `scripts/slice_recipe_collage.py`
- `scripts/update_recipe_image_manifest.py`
- `IMAGE_ASSET_WORKFLOW.md`
- `VERSION_LOG.md`
- `NEXT_STEPS.md`

### Проверить

1. `python3 -m py_compile scripts/slice_recipe_collage.py`
2. `python3 -m py_compile scripts/update_recipe_image_manifest.py`
3. Dry-run нарезки на несуществующем файле даёт понятную ошибку без traceback.
4. Manifest dry-run с fake id работает только с `--allow-missing`.

### Итог

- v39 готовит автоматизацию ассетов, но не активирует новые картинки само по себе.
- Для активации картинок нужно отдельно сгенерировать clean collage, нарезать `.webp`, обновить `recipe-images.json` и проверить v38 image pipeline.

---

## webstable38-image-pipeline

Date: 2026-05-31
Status: connected and locally verified
Type: image pipeline loader / fallback-safe layer

### Что изменено

- `index.html` поднят на query version `webstable38-image-pipeline`.
- После `v37-featured-content-polish.js` подключён `v38-recipe-images-loader.js`.
- v37 featured-витрина оставлена рабочей; v38 идёт поверх неё только как image pipeline.
- `app.js`, `styles.css`, JSON-базы и изображения не менялись.

### Затронутые файлы

- `index.html`
- `VERSION_LOG.md`
- `NEXT_STEPS.md`

### Проверено

1. Приложение открывается.
2. База остаётся на 1000 рецептов.
3. v37 витрина остаётся рабочей.
4. `document.body.dataset.cozyImageLayer` выставляется в `webstable38-image-pipeline`.
5. Картинок пока нет, но fallback не ломается.

### Итог

- v38 подключена как текущая stable-точка для image pipeline.
- Следующий шаг: после появления реального image manifest проверить наполнение картинок без изменения fallback.

---

## webstable37-featured-content-polish

Date: 2026-05-23
Status: confirmed working after QA
Type: presentation / content polish layer

### Что изменено

- Создан `v37-featured-content-polish.js` и подключён последним, после `v35-performance-helpers.js`.
- Добавлен curated-порядок первых 30 рецептов для главной.
- Добавлены приоритетные подборки для `нет сил`, `быстро`, `суп`, `сладкое`, а также порядок для фильтров `завтрак` и `ужин`.
- Слабые рецепты не удаляются, но опускаются ниже в видимой выдаче.
- Для curated/weak-рецептов через JS override смягчены машинные финальные шаги; отдельные странные названия и два несоответствующих сладких ингредиентных набора исправлены только на уровне отображения.
- При overrides пересчитывается `_searchText`, чтобы оставаться совместимым с кэшем v35.
- В `Дома` точные совпадения по всем введённым ингредиентам показываются первыми; при нескольких ингредиентах без точного совпадения случайные partial-рецепты не показываются.
- `recipes-v36-cleaned.json`, `recipes-v34-1000.json`, `app.js`, `styles.css` и изображения не менялись.

### Затронутые файлы

- `index.html`
- `v37-featured-content-polish.js`
- `VERSION_LOG.md`
- `NEXT_STEPS.md`

### Проверено

1. Приложение открывается по ссылке `webstable37-featured-content-polish`.
2. База остаётся на 1000 рецептов.
3. Первые карточки идут curated-витриной, а не однообразной серией.
4. `нет сил`, `быстро`, `сладкое`, `суп` используют curated-приоритеты.
5. `Дома` корректнее обрабатывает точные совпадения по нескольким ингредиентам.
6. Избранное, история, список покупок и version marker остаются рабочими.

### Итог

- v37 принята как текущая stable-точка.
- Следующий патч v38 делать только при реальном баге или отдельной задаче.

---

## webstable36-cleaned-recipes

Date: 2026-05-22
Status: confirmed working after QA
Type: cleaned content database / safe recipe loader

### Что изменено

- Создан `recipes-v36-cleaned.json` на основе `recipes-v34-1000.json`.
- Сохранены 1000 рецептов и id `v34_0001` ... `v34_1000`, чтобы не ломать избранное, историю и ссылки.
- Исправлены механические названия, странные сочетания, no-fire формулировки и дубли по `ingredients + steps`.
- Создан `v36-cleaned-recipes-loader.js`.
- `index.html` поднят на query version `webstable36-cleaned-recipes`.
- `v36-cleaned-recipes-loader.js` подключён после `v34-recipes-1000-loader.js` и до `v16-unique-cooking.js`.
- `v35-performance-helpers.js` оставлен последним слоем.
- `app.js` не трогали.
- `styles.css` не трогали.
- Изображения не трогали.
- Дизайн и UX-copy не меняли.
- `recipes-v34-1000.json` сохранён как technical checkpoint и не редактировался.

### Итог

- v36 делает content cleanup базы рецептов без изменения ядра приложения, стилей, изображений и UX-copy.
- v36 принята как stable-точка до v37.

---

## webstable35-performance-helpers

Date: 2026-05-21
Status: confirmed working after QA
Type: performance helper / search indexing / version marker fix

### Что изменено

- Создан `v35-performance-helpers.js`.
- `index.html` поднят на query version `webstable35-performance-helpers`.
- `v35-performance-helpers.js` подключён последним, после `v33-photo-stability-cleanup.js`.
- Добавлен кэш поискового текста рецепта в `recipe._searchText`.
- `recipeHay()` переопределён так, чтобы использовать кэшированный `_searchText`.
- Добавлен повторный indexing после загрузки и через 400 / 1200 / 2500 / 5000 ms.
- Исправлен version marker.

### Итог

- v35 не меняет базу, дизайн, изображения или `app.js`; это небольшой performance-layer поверх v34.

---

## webstable34-recipes-1000

Date: 2026-05-21
Status: confirmed working after QA
Type: recipe database expansion / race-safe loader

### Что изменено

- Создан `recipes-v34-1000.json`.
- Создан `v34-recipes-1000-loader.js`.
- База расширена до 1000 рецептов в текущей схеме Cozy Foodie.
- `index.html` поднят на query version `webstable34-recipes-1000`.
- `v34-recipes-1000-loader.js` подключён сразу после `v15-recipes-loader.js` и до патчей отображения/шагов.
- `app.js` не трогали.
- Изображения не трогали.
- Дизайн и UX-copy не меняли.
- v34 loader защищён от race condition.

### Итог

- v34 технически расширила базу до 1000 рецептов без изменения ядра приложения.

---

## webstable33-photo-stability-cleanup

Date: 2026-05-19
Status: previous stable checkpoint
Type: photo stability / cleanup guard

### Что изменено

- Текущая активная версия в `index.html` поднята до `webstable33-photo-stability-cleanup`.
- Подключён финальный слой `v33-photo-stability-cleanup.js`.
- v33 делает rollback нестабильных stock-фото в безопасный cozy fallback.

---

## v19-manual-more-steps

Status: exists and connected
Type: manual recipe steps patch

### Что подтверждено

- Файл `v19-manual-more-steps.js` существует в репозитории.
- Файл подключён в `index.html`.
- Он добавляет `CF19_MANUAL_MORE_STEPS` для части рецептов.
- Он патчит `normalizeRecipe` и применяет ручные шаги к рецептам.

---

## webstable18-manual-top-steps

Status: historical checkpoint
Type: stable web / manual recipe steps patch

### Что было

- Расширенная база рецептов v15.
- Подробные подсказки «Как готовить» v16.
- Углублённые шаги и финальная проверка готовности v17.
- Ручная доработка топ-рецептов v18.
- Таймеры по этапам.
- Классические таймеры 1 / 3 / 5 / 10 / 15 / 20 минут.
- Звуковое уведомление по окончании таймера.
- Мягкие формулировки «Ошибочка» / «Милое замечание».
- Блок «Дома» с быстрыми кнопками ингредиентов.
- Блок «Чего хочется?» со сценариями.
- Отдельный поиск.
- Плавающий рандом только на главной.
- Fallback для картинок.
