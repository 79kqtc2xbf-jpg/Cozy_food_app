# APP_MEMORY_TECH.md

Постоянная техническая память Cozy Foodie.

## Project scope

Этот репозиторий и текущий Project используются только для технической части Cozy Foodie.

Здесь ведём:

- GitHub;
- Web / PWA;
- iOS / Capacitor / Xcode;
- HTML / CSS / JS;
- `app.js`;
- `styles.css`;
- `recipes.json` и versioned recipe data files;
- `manifest.json`;
- `sw.js`;
- баги;
- версии;
- деплой;
- GitHub Pages;
- технические инструкции;
- QA;
- README;
- структура файлов;
- патчи;
- логика приложения;
- технические интеграции с Notion / Glide / базой рецептов.

## Не использовать этот Project для

- обычной генерации рецептов;
- уютных текстов;
- карточек;
- идей категорий;
- визуального стиля;
- UX-copy;
- food-фото;
- продуктовых идей.

Это переносится в отдельный Custom GPT: **Cozy Foodie Product Chef**.

## Current stable checkpoint

- Version: `webstable33-photo-stability-cleanup`
- URL: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable33-photo-stability-cleanup`
- Repo: `79kqtc2xbf-jpg/Cozy_food_app`
- Branch: `main`

## Active architecture notes

Current setup uses base files plus layered patch files.

### Base files

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `sw.js`

### Current CSS layers

- `styles.css`
- `v11-fixes.css`
- `v16-cooking-style.css`

### Current JS layers

- `app.js`
- `v12-soft-notes.js`
- `v13-timer-sound.js`
- `v14-one-minute-timer.js`
- `v15-recipes-loader.js`
- `v16-unique-cooking.js`
- `v17-deeper-steps.js`
- `v18-manual-top-steps.js`
- `v19-manual-more-steps.js`
- `v20-single-cooking-trick.js`
- `v21-single-cooking-note.js`
- `v23-clean-cooking-photo-rollback.js`
- `v24-ux-cleanup.js`
- `v25-polish-fixes.js`
- `v26-cart-timer-sections.js`
- `v27-logical-recipe-notes.js`
- `v28-show-recipe-notes.js`
- `v29-step-bullets.js`
- `v30-clean-step-cards.js`
- `v31-smart-step-bullets.js`
- `v32-clean-stable-build.js`
- `v33-photo-stability-cleanup.js`

### Current data

- `recipes-v15.json`

## Important technical rules

1. Do not rewrite the whole app for a small patch.
2. Always check `index.html` before declaring a patch active.
3. Always update version query after a meaningful patch.
4. Always test GitHub Pages after commit.
5. Always test iPhone Safari before PWA/Home Screen.
6. Always consider cache / service worker risk.
7. Do not create GitHub Issues unless Lisa explicitly asks.
8. Do not generate or edit images without Lisa’s direct permission.
9. Keep technical docs in repo updated after meaningful changes.
10. Separate technical work from Product Chef work.

## Accepted answer format for technical work

When reporting a technical patch, use:

```markdown
### 1. Что сделала

### 2. Идеи и предложения, что сделать

### 3. Вопросы ко мне, если есть

### 4. От меня
```

For a patch, include:

- version name;
- changed files;
- what changed;
- what Lisa needs to do;
- what to check;
- risks;
- next step.

## Known version history summary

### v12 soft notes

- Replaced harsh error wording with softer wording.
- Added «Ошибочка» / «Милое замечание» style.

### v13 timer sound

- Added soft timer end sound.
- Possible vibration on supported phones.

### v14 one minute timer

- Added 1-minute classic timer.

### v15 expanded recipes

- Added `recipes-v15.json` with expanded recipe base.
- Loaded through `v15-recipes-loader.js`.

### v16 unique cooking

- Made «Как готовить» depend on dish type.
- Added more unique cooking hints.

### v17 deeper steps

- Expanded cooking steps.
- Added final readiness check card.

### v18 manual top steps

- Manual detailed improvements for top recipes.

### v19 manual more steps

- Exists in repository.
- Connected in `index.html`.
- Adds more manual steps for selected recipes.
- Not the current final checkpoint anymore.

### v20–v32

- Additional cleanup / UX / cart / timer / recipe note / step card / stable build layers.
- Keep connected order unless reviewing the full chain intentionally.

### v33 photo stability cleanup

- Current stable checkpoint.
- Rolls back unstable stock photo sources to cozy fallback.
- Adds `CF33_VERSION = "webstable33-photo-stability-cleanup"`.
- Final patch layer in current `index.html`.

## Next best technical action

Manual QA of current v33:

1. Open GitHub Pages v33 URL.
2. Check app load.
3. Check first recipe cards.
4. Check modal opening.
5. Check timers.
6. Check shopping list.
7. Check image fallback.
8. Check iPhone Safari cache behavior.

If QA passes, keep v33 as current stable. If QA finds a bug, create v34 as a small targeted patch.
