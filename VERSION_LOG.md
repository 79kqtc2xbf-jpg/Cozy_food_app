# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable37-featured-content-polish`
- Current version label: `webstable37-featured-content-polish`
- Status: accepted for publication; v37 featured content layer remains last

---

## webstable37-featured-content-polish

Date: 2026-05-23
Status: accepted for publication in `main`
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

### Что проверить

1. База остаётся на 1000 рецептов.
2. Первые 30 карточек соответствуют curated featured-порядку.
3. `нет сил` не начинается пачкой пельменей, а `быстро` - пачкой одной пасты.
4. `сладкое` не поднимает варианты с укропом/паприкой/томатами, а `суп` - варианты с огурцом.
5. В `Дома` запрос `яйца, сыр` сначала возвращает точные совпадения, а `творог, молоко` не маскирует отсутствие точных совпадений.
6. Избранное, история, список покупок и version marker остаются рабочими.

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

### Затронутые файлы

- `index.html`
- `recipes-v36-cleaned.json`
- `v36-cleaned-recipes-loader.js`
- `VERSION_LOG.md`
- `NEXT_STEPS.md`

### Проверено

1. v36 опубликована в `main`.
2. Приложение открывается по ссылке `webstable36-cleaned-recipes`.
3. Загружается очищенная база на 1000 рецептов.
4. `v35-performance-helpers.js` остаётся последним слоем.
5. `app.js`, `styles.css`, изображения и `recipes-v34-1000.json` не изменялись.

### Риски

- База очищена массово, поэтому полезна ручная вычитка первых экранов и популярных категорий.
- Возможен старый кэш GitHub Pages / Safari / PWA.

### Итог

- v36 делает content cleanup базы рецептов без изменения ядра приложения, стилей, изображений и UX-copy.
- v36 принята как текущая stable-точка.
- v35 performance-layer остаётся последним.

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
- Исправлен version marker: `document.body.dataset.cozyVersion` должен оставаться `webstable35-performance-helpers` после поздних таймеров.

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
