# Cozy Foodie — Tech / PWA / iOS / GitHub

Cozy Foodie / «Комфортная кулинария с Лисой» — web/PWA-приложение для выбора рецептов, списка покупок, избранного, таймеров и быстрых сценариев приготовления.

Этот репозиторий ведётся как **техническая часть проекта**: код, GitHub Pages, Web/PWA, iOS/Capacitor/Xcode, QA, баги, версии, патчи и структура файлов.

## Рабочие ссылки

- Repository: `79kqtc2xbf-jpg/Cozy_food_app`
- GitHub Pages: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/`
- Текущая проверочная версия: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable18-manual-top-steps`

## Scope этого репозитория

Здесь хранятся и обсуждаются:

- Web / PWA;
- iOS / Capacitor / Xcode;
- HTML / CSS / JS;
- `index.html`;
- `app.js`;
- `styles.css`;
- `recipes.json` / versioned recipe data files;
- `manifest.json`;
- `sw.js` / service worker;
- GitHub Pages;
- баги;
- версии;
- деплой;
- QA;
- README;
- структура файлов;
- патчи;
- логика приложения;
- технические интеграции с Notion / Glide / базой рецептов.

## Что не ведём в этом Project

Контентный и продуктовый слой ведётся отдельно в **Cozy Foodie Product Chef**:

- генерация рецептов;
- уютные тексты;
- UX-copy;
- идеи категорий;
- визуальный стиль;
- food-фото;
- карточки и контентная упаковка.

## Текущая техническая база

Активная рабочая точка: `webstable18-manual-top-steps`.

Основные подключаемые файлы в текущей базе:

### CSS

- `styles.css`
- `v11-fixes.css`
- `v16-cooking-style.css`

### JS

- `app.js`
- `v12-soft-notes.js`
- `v13-timer-sound.js`
- `v14-one-minute-timer.js`
- `v15-recipes-loader.js`
- `v16-unique-cooking.js`
- `v17-deeper-steps.js`
- `v18-manual-top-steps.js`

### Data

- `recipes-v15.json`

## Правило версий

Каждый патч фиксируется как отдельная версия.

Формат:

- `v12`, `v13`, `v14` — рабочие патчи;
- `webstable18-manual-top-steps` — стабильная web-точка;
- `ios fix`, `iphone lite`, `nuclear fix` — специальные iPhone/PWA-патчи;
- `showcase` — версия для показа.

Перед новым патчем нужно проверить:

1. что текущая версия открывается;
2. что не конфликтуют старые `app-vXX.js` / `styles-vXX.css`;
3. что `index.html` подключает нужные файлы;
4. что GitHub Pages обновился;
5. что iPhone Safari не показывает старый кэш.

## Технический workflow

1. Сначала определить проблему или цель патча.
2. Проверить затронутые файлы.
3. Не переписывать весь проект, если нужен маленький фикс.
4. Создать новую версию или явно обновить текущую.
5. Обновить `VERSION_LOG.md`.
6. Обновить `BUGS_AND_ISSUES.md`, если был баг.
7. Прогнать `QA_CHECKLIST.md`.
8. Дать ссылку для проверки на GitHub Pages.

## Главные документы проекта

- `VERSION_LOG.md` — история версий.
- `QA_CHECKLIST.md` — проверка после каждого патча.
- `BUGS_AND_ISSUES.md` — баги и риски.
- `NEXT_STEPS.md` — ближайший технический план.
- `APP_MEMORY_TECH.md` — постоянная техническая память проекта.

## Важные ограничения

- Не создавать изображения без прямого разрешения Лизы.
- Не смешивать технический патч с генерацией контента.
- Не считать v19 завершённым, пока не проверено подключение в `index.html`.
- Не писать задачи в GitHub Issues без прямой просьбы.
- Не ломать рабочую версию ради красивой идеи.
