# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable35-performance-helpers`
- Current version label: `webstable35-performance-helpers`
- Status: confirmed working after QA

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

### Затронутые файлы

- `index.html`
- `v35-performance-helpers.js`
- `VERSION_LOG.md`

### Проверено

1. Приложение открывается.
2. База v34 на 1000 рецептов остаётся активной.
3. Поиск, категории и основные сценарии не сломаны.
4. v35 принят как текущая stable-точка.

### Риски

- Патч переопределяет `recipeHay()`, поэтому при следующих изменениях поиска нужно помнить про `_searchText`.
- Debounce не добавлялся намеренно, чтобы не ломать текущий listener поиска.

### Итог

- v35 не меняет базу, дизайн, изображения или `app.js`; это небольшой performance-layer поверх v34.
- Текущая стабильная версия: `webstable35-performance-helpers`.

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
- v34 loader защищён от race condition: JSON fetch выполняется один раз, а загруженная база повторно применяется сразу, на `window.load`, через 400 мс, 1200 мс и 2500 мс.

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
- В коде v33 есть защита от повторного применения через `window.CF33_PHOTO_STABILITY_CLEANUP_APPLIED`.
- v33 помечает body как `cf33-photo-stability-cleanup` и записывает `data-cozy-version`.

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

---

## Шаблон новой версии

```markdown
## [version-name]

Date:
Status:
Type:

### Что изменено

- 

### Затронутые файлы

- 

### Что проверить

1. 

### Риски

- 

### Итог

- 
```
