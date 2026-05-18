# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable33-photo-stability-cleanup`
- Current version label: `webstable33-photo-stability-cleanup`
- Status: current stable checkpoint based on `index.html` connections

---

## webstable33-photo-stability-cleanup

Date: 2026-05-19
Status: current stable checkpoint
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
