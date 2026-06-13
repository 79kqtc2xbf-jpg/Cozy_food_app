# NEXT_STEPS.md

Ближайшие технические шаги Cozy Foodie.

## Срочно

### 0. Следующий безопасный шаг для изображений

Current state:

- `webstable38-image-pipeline` остаётся текущей stable-точкой.
- Первый image batch признан mismatch по title QA и удалён cleanup commit `180e53e`.
- `recipe-images.json` должен оставаться с `"recipes": {}`, пока нет проверенных соответствий.
- `assets/` не является runtime-папкой и не должен попадать в commit.
- Runtime image paths не должны указывать на `assets/`.
- Fallback подтверждён рабочим, broken loaded images: `0`.

Дальше безопасно делать только одно из двух:

1. Ручная visual QA будущих food photos до добавления mappings.
2. Отдельный controlled image pipeline patch с маленьким проверенным batch.

### 1. Проверить stable v38 после публикации

URL:
`https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable38-image-pipeline`

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
10. `document.body.dataset.cozyImageLayer` равен `webstable38-image-pipeline`.
11. `recipe-images.json` не содержит непроверенных mappings.
12. Fallback работает, broken loaded images: `0`.
13. На iPhone Safari не отдаётся старая версия.

### 2. Проверить `index.html` после v38

Уже подтверждено:

- `index.html` подключает `webstable38-image-pipeline`.
- `recipes-v34-1000.json` сохранён как technical checkpoint.
- `recipes-v36-cleaned.json` создан отдельным файлом.
- `recipes-v36-cleaned.json`, `app.js`, `styles.css` и изображения не трогали.
- `v19-manual-more-steps.js` существует.
- `v19-manual-more-steps.js` подключён.
- `v37-featured-content-polish.js` подключён после `v35-performance-helpers.js`.
- `v38-recipe-images-loader.js` подключён сразу после `v37-featured-content-polish.js`.
- Текущая stable-точка — v38 image pipeline.

Дополнительно проверить:

1. Нет ли конфликтов порядка JS-файлов.
2. Финальный слой `v38-recipe-images-loader.js` идёт последним.
3. Все подключённые файлы реально существуют.
4. GitHub Pages отдаёт свежий `index.html`.

## Текущий технический патч

### v38-image-pipeline

Цель: подключить image pipeline поверх v37 без редактирования исходного JSON, стилей, приложения и изображений.

Что проверить после публикации:

1. Приложение открывается.
2. База остаётся на 1000 рецептов.
3. Featured-порядок главной v37 сохраняется.
4. `document.body.dataset.cozyImageLayer` равен `webstable38-image-pipeline`.
5. Непроверенных mappings нет, fallback не ломается.
6. Отсутствие изменений в базе, ядре, стилях и изображениях.

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
