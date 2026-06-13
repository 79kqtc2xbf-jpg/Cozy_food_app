# STATUS_TRACKER.md

Короткая сводка текущего состояния Cozy Foodie.

## Current Stable

- Stable label: `webstable40-fallback-visual-taxonomy`
- Latest runtime patch on main: `webstable40-fallback-visual-taxonomy`
- Cleanup commit: `180e53e chore: remove mismatched recipe image assets`
- Test link: `https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable40-fallback-visual-taxonomy`

## Image Pipeline Status

- v40 fallback visual taxonomy подключён поверх v38 image pipeline.
- v38 image pipeline остаётся механизмом будущих real-image mappings.
- Первый image batch признан mismatch по title QA.
- Cleanup commit `180e53e` удалил mismatched `.webp` assets из репозитория.
- `recipe-images.json` сейчас должен оставаться с пустым `"recipes": {}`.
- Fallback image behavior подтверждён рабочим и стал точнее по категориям блюд.
- QA result: `0` broken loaded images.

## Asset Rules

- `assets/` не является runtime-папкой приложения.
- `assets/` не должен попадать в commit.
- Runtime image paths не должны указывать на `assets/`.
- Future images should go through controlled visual QA before mappings are added.
- Do not add real images without a separate controlled image patch.

## Next Safe Step

- Проверить v40 fallback taxonomy на GitHub Pages и iPhone Safari.
- Затем ручная visual QA будущих food photos или отдельный controlled image pipeline patch с маленьким проверенным batch.
