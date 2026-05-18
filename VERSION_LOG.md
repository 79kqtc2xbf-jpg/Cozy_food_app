# VERSION_LOG.md

История технических версий Cozy Foodie.

## Текущая рабочая точка

- Current stable check URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable18-manual-top-steps`
- Current version label: `webstable18-manual-top-steps`
- Status: stable checkpoint, needs next technical verification before v19

---

## webstable18-manual-top-steps

Date: 2026-05-19
Status: current stable checkpoint
Type: stable web / manual recipe steps patch

### Что есть

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

### Подключённые CSS

- `styles.css?v=webstable18-manual-top-steps`
- `v11-fixes.css?v=webstable18-manual-top-steps`
- `v16-cooking-style.css?v=webstable18-manual-top-steps`

### Подключённые JS

- `app.js?v=webstable18-manual-top-steps`
- `v12-soft-notes.js?v=webstable18-manual-top-steps`
- `v13-timer-sound.js?v=webstable18-manual-top-steps`
- `v14-one-minute-timer.js?v=webstable18-manual-top-steps`
- `v15-recipes-loader.js?v=webstable18-manual-top-steps`
- `v16-unique-cooking.js?v=webstable18-manual-top-steps`
- `v17-deeper-steps.js?v=webstable18-manual-top-steps`
- `v18-manual-top-steps.js?v=webstable18-manual-top-steps`

### Data

- `recipes-v15.json` — расширенная база на 97 рецептов.

### Что проверить

1. Приложение открывается на GitHub Pages.
2. Рецепты открываются.
3. Таймеры работают.
4. Звук таймера работает.
5. «Чего хочется?» открывает подборки.
6. «Дома» ищет по быстрым ингредиентам.
7. Блок «Как готовить подробно» выглядит живым.
8. Fallback картинок работает.

---

## v19 — planned / not confirmed

Status: not completed
Type: planned technical/content-loader patch

### Что было начато

- Идея: второй слой ручной доработки рецептов.
- Возможный файл: `v19-manual-more-steps.js`.

### Не считать завершённым, пока

1. Не проверено наличие `v19-manual-more-steps.js` в репозитории.
2. Не проверено подключение файла в `index.html`.
3. Не поднята версия до `webstable19-manual-more-steps`.
4. Не проверены 5–7 блюд на сайте.

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
