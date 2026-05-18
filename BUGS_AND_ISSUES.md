# BUGS_AND_ISSUES.md

Технические баги, риски и нерешённые вопросы Cozy Foodie.

## Current known risks

### 1. Проверить фактическую работу v33 на GitHub Pages

Status: open
Priority: high
Area: GitHub Pages / iPhone Safari / cache

Что известно:

- `index.html` уже подключает `webstable33-photo-stability-cleanup`.
- `v19-manual-more-steps.js` существует и подключён.
- Текущая рабочая точка — v33, а не v18/v19.

Что проверить:

1. Открывается ли `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable33-photo-stability-cleanup`.
2. Нет ли белого экрана.
3. Не ломаются ли карточки рецептов.
4. Работает ли fallback картинок.
5. Работают ли модалки рецептов.
6. Работают ли таймеры.
7. Не отдаёт ли iPhone старый кэш.

Решение:

- Провести ручной QA по `QA_CHECKLIST.md`.
- При проблемах открыть отдельный баг под конкретный симптом.

---

### 2. Кэш iPhone / PWA может отдавать старую версию

Status: recurring risk
Priority: high
Area: iPhone Safari / PWA / service worker

Что происходит:

- После загрузки нового патча iPhone может показывать старую версию.
- Особенно рискованно, если приложение открывается из иконки на экране домой.

Что делать:

1. Проверять сначала в Safari.
2. Использовать query parameter версии: `?v=...`.
3. При необходимости удалить старую PWA-иконку.
4. Добавить на экран домой заново только после проверки.
5. Осторожно работать с `sw.js`.

---

### 3. Конфликт старых versioned файлов

Status: recurring risk
Priority: medium
Area: JS / CSS / index.html

Риск:

- В репозитории много patch-layer файлов от v12 до v33.
- Если `index.html` подключает файлы в неправильном порядке, новые изменения могут перетираться старыми или наоборот.

Что проверять:

1. Список подключений в `index.html`.
2. Что активная версия соответствует query parameter.
3. Что новые файлы подключены после базовых файлов.
4. Что финальный слой v33 идёт последним.

---

### 4. Картинки и fallback

Status: watch
Priority: medium
Area: images / recipes / UI

Риск:

- Food-фото могут ломаться, становиться чёрными или не соответствовать рецепту.
- v33 откатывает плохие stock-фото в cozy fallback.
- В текущем tech project не генерировать изображения без явного разрешения.

Что можно делать технически:

- чинить fallback;
- чинить привязку уже существующих URL;
- проверять загрузку изображений;
- не менять визуальный стиль без перехода в Product Chef.

---

### 5. Service worker

Status: watch
Priority: high for PWA
Area: PWA / cache

Риск:

- `sw.js` может закэшировать старые HTML/JS/CSS.
- После патча GitHub Pages может быть обновлён, но PWA всё ещё отдаёт старую сборку.

Что делать:

1. Проверять cache strategy.
2. Обновлять cache name при важных релизах.
3. Для iPhone-fix при необходимости временно отключать aggressive caching.
4. Всегда проверять Safari до установки PWA.

---

## Bug template

```markdown
## [Bug title]

Date:
Version:
Status:
Priority:
Area:

### Что происходит

- 

### Что должно происходить

- 

### Где проявляется

- Web
- iPhone Safari
- PWA
- iOS / Capacitor
- GitHub Pages

### Возможная причина

- 

### Решение

- 

### Проверка после исправления

1. 
```
