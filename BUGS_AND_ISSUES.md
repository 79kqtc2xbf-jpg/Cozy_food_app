# BUGS_AND_ISSUES.md

Технические баги, риски и нерешённые вопросы Cozy Foodie.

## Current known risks

### 1. v19 не подтверждён

Status: open
Priority: high
Area: versioning / index.html

Что известно:

- Был начат следующий слой ручной доработки рецептов.
- Возможный файл: `v19-manual-more-steps.js`.
- Пока нельзя считать v19 завершённым.

Что проверить:

1. Есть ли `v19-manual-more-steps.js` в репозитории.
2. Подключён ли он в `index.html`.
3. Поднята ли версия до `webstable19-manual-more-steps`.
4. Не ломает ли он текущий stable.

Решение:

- Сначала провести ревизию файлов.
- Потом подключать v19 отдельным патчем.

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

- В репозитории могут оставаться старые `app-vXX.js`, `styles-vXX.css`.
- Если `index.html` подключает не тот файл, новые изменения не видны.

Что проверять:

1. Список подключений в `index.html`.
2. Что активная версия соответствует query parameter.
3. Что старые файлы не подключены случайно.
4. Что новые файлы подключены после базовых файлов, если это patch-layer.

---

### 4. Картинки и fallback

Status: watch
Priority: medium
Area: images / recipes / UI

Риск:

- Food-фото могут ломаться, становиться чёрными или не соответствовать рецепту.
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
