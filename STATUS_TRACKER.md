# STATUS_TRACKER.md

Короткая сводка текущего состояния Cozy Foodie.

## Current Stable

- Stable label: `webstable38-image-pipeline`
- Latest cleanup commit on main: `180e53e chore: remove mismatched recipe image assets`
- Test link: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable38-image-pipeline&qa=cleanup-180e53e-20260613`

## Image Pipeline Status

- v38 image pipeline подключён и остаётся текущей stable web image pipeline точкой.
- Первый image batch признан mismatch по title QA.
- Cleanup commit `180e53e` удалил mismatched `.webp` assets из репозитория.
- `recipe-images.json` сейчас должен оставаться с пустым `"recipes": {}`.
- Fallback image behavior подтверждён рабочим.
- QA result: `0` broken loaded images.

## Asset Rules

- `assets/` не является runtime-папкой приложения.
- `assets/` не должен попадать в commit.
- Runtime image paths не должны указывать на `assets/`.
- Future images should go through controlled visual QA before mappings are added.

## Next Safe Step

- Ручная visual QA будущих food photos.
- Или отдельный controlled future image pipeline patch с маленьким проверенным batch.
