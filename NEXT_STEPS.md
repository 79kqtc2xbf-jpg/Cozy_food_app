# NEXT_STEPS.md

Ближайшие технические шаги Cozy Foodie.

## Срочно

### 1. Проверить stable v37 после публикации

URL:
`https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable37-featured-content-polish`

Проверить:

1. Приложение открывается.
2. Нет белого экрана.
3. Рецепты открываются.
4. Таймеры запускаются.
5. Звук таймера работает.
6. «Чего хочется?» показывает curated-приоритеты для `нет сил`, `быстро`, `суп` и `сладкое`.
7. «Дома» ставит точные совпадения выше и честно показывает отсутствие совпадений для `творог, молоко`.
8. Рандом работает.
9. Очищенная база содержит 1000 рецептов, а первые 30 карточек следуют featured-порядку v37.
10. На iPhone Safari не отдаётся старая версия.

### 2. Проверить `index.html` после v37

Уже подтверждено:

- `index.html` подключает `webstable37-featured-content-polish`.
- `recipes-v34-1000.json` сохранён как technical checkpoint.
- `recipes-v36-cleaned.json` создан отдельным файлом.
- `recipes-v36-cleaned.json`, `app.js`, `styles.css` и изображения не трогали.
- `v19-manual-more-steps.js` существует.
- `v19-manual-more-steps.js` подключён.
- `v37-featured-content-polish.js` подключён последним, после `v35-performance-helpers.js`.
- Текущая stable-точка — v37; публикация подтверждена.

Дополнительно проверить:

1. Нет ли конфликтов порядка JS-файлов.
2. Финальный слой `v37-featured-content-polish.js` идёт последним.
3. Все подключённые файлы реально существуют.
4. GitHub Pages отдаёт свежий `index.html`.

## Текущий технический патч

### v37-featured-content-polish

Цель: добавить presentation/content polish слой поверх v36 без редактирования исходного JSON.

Что проверить после публикации:

1. Featured-порядок главной.
2. Curated-приоритеты сценариев и фильтров.
3. Опускание weak IDs без удаления рецептов.
4. Title/ingredients/steps overrides и обновлённый `_searchText`.
5. Точные совпадения в «Дома».
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
