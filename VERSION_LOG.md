# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable34-recipes-1000`
- Current version label: `webstable34-recipes-1000`
- Status: current stable checkpoint based on `index.html` connections

---

## webstable34-recipes-1000

Date: 2026-05-21
Status: technical patch ready for QA
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

### Затронутые файлы

- `index.html`
- `recipes-v34-1000.json`
- `v34-recipes-1000-loader.js`
- `VERSION_LOG.md`
- `NEXT_STEPS.md`

### Что проверить

1. Открыть `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable34-recipes-1000`.
2. Проверить, что приложение открывается без белого экрана.
3. Проверить, что счётчик рецептов показывает около 1000 рецептов плюс пользовательские локальные рецепты, если они есть.
4. Открыть несколько рецептов из начала, середины и конца базы.
5. Проверить поиск, категории, «Чего хочется?», «Дома», рандом и список покупок.
6. Проверить iPhone Safari без старого PWA-кэша.

### Риски

- 1000 рецептов фильтруются на клиенте, поэтому нужно проверить скорость поиска на iPhone.
- В базе много рецептов, качество контента нужно выборочно вычитать после технической проверки.
- Старый `v34-pretty-fallback-cards.js` существует в репозитории, но не подключён в `index.html`.
- Возможен старый кэш GitHub Pages / Safari / PWA, как и в предыдущих webstable-патчах.

### Итог

- v34 технически расширяет базу до 1000 рецептов без изменения ядра приложения.

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

### Затронутые файлы

- `index.html`
- `v33-photo-stability-cleanup.js`

### Что проверить

1. Открыть `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable33-photo-stability-cleanup`.
2. Проверить, что приложение открывается.
3. Проверить первые карточки рецептов.
4. Проверить, что плохие stock-фото заменяются fallback.
5. Проверить, что fallback не ломает карточку и модалку.
6. Проверить iPhone Safari.
7. Проверить, что старая PWA-иконка не отдаёт старую версию.

### Риски

- Нужно проверить фактическое поведение на GitHub Pages и iPhone Safari.
- Возможен старый кэш service worker.
- Версионные документы были обновлены после обнаружения, что актуальная версия уже v33, а не v18/v19.

---

## v19-manual-more-steps

Date: before current documentation update
Status: exists and connected
Type: manual recipe steps patch

### Что подтверждено

- Файл `v19-manual-more-steps.js` существует в репозитории.
- Файл подключён в `index.html`.
- Он добавляет `CF19_MANUAL_MORE_STEPS` для части рецептов.
- Он патчит `normalizeRecipe` и применяет ручные шаги к рецептам.
- Он выставляет `window.CF19_VERSION = "webstable19-manual-more-steps"`, но более поздние патчи поднимают текущую версию дальше.

### Итог

- v19 не является текущей рабочей точкой.
- v19 не нужно завершать отдельно.
- Текущая рабочая точка — v33.

---

## webstable18-manual-top-steps

Date: earlier checkpoint
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
