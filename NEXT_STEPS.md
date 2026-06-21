# NEXT_STEPS.md

Ближайшие технические шаги Cozy Foodie.

## Срочно

### 0. Следующий безопасный шаг для изображений

Current state:

- `webstable40-fallback-visual-taxonomy` является текущей stable-точкой runtime fallback-визуалов.
- v38 image pipeline остаётся механизмом будущих real-image mappings.
- Первый image batch признан mismatch по title QA и удалён cleanup commit `180e53e`.
- `recipe-images.json` должен оставаться с `"recipes": {}`, пока нет проверенных соответствий.
- `assets/` не является runtime-папкой и не должен попадать в commit.
- Runtime image paths не должны указывать на `assets/`.
- Fallback подтверждён рабочим, broken loaded images: `0`.
- v40 улучшает только fallback taxonomy, без реальных изображений.

Дальше безопасно делать только одно из двух:

1. `v41-top-recipes-visual-shortlist`: controlled shortlist для 20–30 top recipes.
2. Ручная title-level visual QA будущих food photos до добавления mappings.
3. Отдельный controlled image pipeline patch с маленьким проверенным batch.

Не делать:

- bulk image replacement;
- image generation без явной просьбы Лисы;
- mappings без title-level visual QA;
- runtime paths на `assets/`.

### 1. Проверить stable v40 после публикации

URL:
`https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable40-fallback-visual-taxonomy`

Проверить:

1. Приложение открывается.
2. Нет белого экрана.
3. Рецепты открываются.
4. Таймеры запускаются.
5. Звук таймера работает.
6. «Чего хочется?» показывает curated-приоритеты v37 для `нет сил`, `быстро`, `суп` и `сладкое`.
7. «Дома» ставит точные совпадения выше и честно показывает отсутствие совпадений для `творог, молоко`.
8. Рандом работает.
9. Очищенная база содержит 1000 рецептов, а первые 30 карточек следуют featured-порядку v37.
10. `document.body.dataset.cozyImageLayer` равен `webstable40-fallback-visual-taxonomy`.
11. `recipe-images.json` не содержит непроверенных mappings.
12. Fallback работает, broken loaded images: `0`.
13. Fallback-визуалы точнее для омлета, творожной миски, овсянки, риса, гречки, лаваша, пасты, пельменей, картофельного пюре и чечевичной похлёбки.
14. На iPhone Safari не отдаётся старая версия.

### 2. Проверить `index.html` после v40

Уже подтверждено:

- `index.html` подключает `webstable40-fallback-visual-taxonomy`.
- `recipes-v34-1000.json` сохранён как technical checkpoint.
- `recipes-v36-cleaned.json` создан отдельным файлом.
- `recipes-v36-cleaned.json`, `app.js`, `styles.css` и изображения не трогали.
- `v19-manual-more-steps.js` существует.
- `v19-manual-more-steps.js` подключён.
- `v37-featured-content-polish.js` подключён после `v35-performance-helpers.js`.
- `v38-recipe-images-loader.js` подключён сразу после `v37-featured-content-polish.js`.
- Текущая stable-точка — v40 fallback visual taxonomy поверх v38 image pipeline.

Дополнительно проверить:

1. Нет ли конфликтов порядка JS-файлов.
2. Финальный слой `v38-recipe-images-loader.js` идёт последним.
3. Все подключённые файлы реально существуют.
4. GitHub Pages отдаёт свежий `index.html`.

## Текущий технический патч

### v40-fallback-visual-taxonomy

Цель: улучшить fallback-визуалы поверх v38 image pipeline без добавления реальных изображений.

Что проверить после публикации:

1. Приложение открывается.
2. База остаётся на 1000 рецептов.
3. Featured-порядок главной v37 сохраняется.
4. `document.body.dataset.cozyImageLayer` равен `webstable40-fallback-visual-taxonomy`.
5. Непроверенных mappings нет, fallback не ломается.
6. Отсутствие изменений в базе, ядре, стилях и изображениях.

## Следующий плановый этап

### v41-top-recipes-visual-shortlist

Цель: подготовить controlled visual shortlist для 20–30 top recipes без добавления изображений на первом шаге.

Status: prepared in `VISUAL_SHORTLIST.md`.

Shortlist:

- 28 recipe IDs from `recipes-v36-cleaned.json`.
- Priority groups: hero / high / later.
- Includes acceptable and wrong/mismatched visual criteria for each recipe.

Правила:

1. Не делать bulk image replacement.
2. Не генерировать изображения без явной просьбы Лисы.
3. Не добавлять mappings без title-level visual QA.
4. Не использовать `assets/` как runtime path.
5. Сначала согласовать shortlist, потом делать отдельный image patch.

Hero candidates:

1. `v34_0001` — Омлет с сыром и зеленью на каждый день.
2. `v34_0002` — Творожная миска с ягодами без суеты.
3. `v34_0004` — Овсянка с бананом по-домашнему.
4. `v34_0010` — Лаваш с сыром и томатами свежая версия.
5. `v34_0244` — Чечевичная похлёбка к ужину.

Следующий патч:

- Только отдельный small verified image patch.
- Только после title-level visual QA.
- Без `assets/`.
- Без image generation, если Лиса явно не попросит генерацию.

## После QA v36

### 1. Technical cleanup

- Проверить старые versioned JS/CSS файлы.
- Не удалять ничего без причины: текущая архитектура использует patch layers.
- Сохранить рабочую stable-точку.

### 2. PWA / iPhone stability

- Проверить `manifest.json`.
- Проверить `sw.js`.
- Проверить iPhone Safari.
- Проверить добавление на экран домой.

### 3. GitHub Pages release hygiene

- Вести явные version labels.
- Обновлять README после stable-релизов.
- Вести VERSION_LOG после каждого патча.

## Для красивого показа

Только после технической стабильности:

1. Проверить первые 10–15 рецептов.
2. Убедиться, что картинки не ломаются.
3. Убедиться, что PWA не отдаёт старый кэш.
4. Подготовить showcase-ссылку.
5. Не делать генерацию изображений в этом Project без явной просьбы.

## Later / technical backlog

- Добавить lightweight error logging для dev-проверки.
- Добавить debug panel только для теста, если понадобится.
- Разделить core app logic и patch layers аккуратнее.
- Стабилизировать data loading.
- Проверить возможность сборки через Capacitor.
- Подготовить iOS checklist.
