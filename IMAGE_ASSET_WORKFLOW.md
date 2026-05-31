# IMAGE_ASSET_WORKFLOW.md

Инструкция для подготовки картинок рецептов Cozy Foodie через v39 tooling.

Текущая stable-версия приложения остаётся `webstable38-image-pipeline`. v39 добавляет только инструменты для ассетов и не меняет приложение, дизайн, базу рецептов или стили.

## 1. Сгенерировать clean collage

Генерировать коллаж нужно без подписей, названий файлов и водяных знаков. Лучше делать пачки по 20 блюд: сетка 5 x 4, одинаковые ячейки, белые промежутки.

Prompt:

```text
Generate a clean 5x4 grid of 20 separate food photos. No text, no labels, no filenames, no captions, no watermark. Equal cells, white gutters, each dish centered, warm cozy homemade food photography style, realistic homemade food, mobile recipe app image assets.
```

Negative prompt:

```text
no text, no labels, no captions, no watermark, no people, no hands, no logo, no distorted dishes, no surreal ingredients, no plastic look.
```

## 2. Сохранить коллаж

Сохранить исходный файл в папку:

```text
assets/collages/
```

Пример имени:

```text
assets/collages/featured_batch_01.png
```

Если папки ещё нет, её можно создать вручную перед сохранением. Исходный коллаж не подключается к приложению напрямую.

## 3. Нарезать на recipe images

Пример для первой featured-пачки:

```bash
python3 scripts/slice_recipe_collage.py \
  --input assets/collages/featured_batch_01.png \
  --cols 5 \
  --rows 4 \
  --ids v34_0001,v34_0002,v34_0003,v34_0004,v34_0010,v34_0020,v34_0030,v34_0006,v34_0007,v34_0121,v34_0122,v34_0124,v34_0127,v34_0129,v34_0130,v34_0131,v34_0132,v34_0140,v34_0150,v34_0244 \
  --output-dir images/recipes \
  --format webp \
  --quality 86 \
  --crop-bottom-pct 0
```

Если AI всё же добавил подписи внизу ячеек, можно отрезать нижнюю часть каждой ячейки:

```bash
python3 scripts/slice_recipe_collage.py \
  --input assets/collages/featured_batch_01.png \
  --cols 5 \
  --rows 4 \
  --ids v34_0001,v34_0002,v34_0003,v34_0004,v34_0010,v34_0020,v34_0030,v34_0006,v34_0007,v34_0121,v34_0122,v34_0124,v34_0127,v34_0129,v34_0130,v34_0131,v34_0132,v34_0140,v34_0150,v34_0244 \
  --output-dir images/recipes \
  --format webp \
  --quality 86 \
  --crop-bottom-pct 0.18
```

Скрипт не перезаписывает существующие файлы без `--overwrite`. Перед записью можно посмотреть план:

```bash
python3 scripts/slice_recipe_collage.py \
  --input assets/collages/featured_batch_01.png \
  --cols 5 \
  --rows 4 \
  --ids v34_0001,v34_0002,v34_0003,v34_0004,v34_0010,v34_0020,v34_0030,v34_0006,v34_0007,v34_0121,v34_0122,v34_0124,v34_0127,v34_0129,v34_0130,v34_0131,v34_0132,v34_0140,v34_0150,v34_0244 \
  --output-dir images/recipes \
  --format webp \
  --quality 86 \
  --dry-run
```

## 4. Обновить manifest

После нарезки добавить картинки в `recipe-images.json`:

```bash
python3 scripts/update_recipe_image_manifest.py \
  --ids v34_0001,v34_0002,v34_0003,v34_0004,v34_0010,v34_0020,v34_0030,v34_0006,v34_0007,v34_0121,v34_0122,v34_0124,v34_0127,v34_0129,v34_0130,v34_0131,v34_0132,v34_0140,v34_0150,v34_0244 \
  --image-dir images/recipes \
  --manifest recipe-images.json \
  --format webp
```

Для проверки без записи:

```bash
python3 scripts/update_recipe_image_manifest.py \
  --ids v34_0001 \
  --image-dir images/recipes \
  --manifest recipe-images.json \
  --format webp \
  --allow-missing \
  --dry-run
```

Без `--allow-missing` скрипт должен остановиться, если файла картинки ещё нет.

## 5. Проверить локально

Запустить локальную страницу:

```bash
python3 -m http.server 4173
```

Открыть:

```text
http://127.0.0.1:4173/?v=webstable38-image-pipeline
```

Проверить:

1. Приложение открывается.
2. Счётчик остаётся `1000 рецептов`.
3. Первые 20 карточек получают реальные `.webp` из `images/recipes/`.
4. Остальные карточки остаются на fallback и не ломаются.
5. `document.body.dataset.cozyImageLayer` равен `webstable38-image-pipeline`.

## 6. Commit после проверки

В commit с ассетами должны попасть только нужные файлы:

```bash
git status --short
git add recipe-images.json images/recipes/*.webp
git commit -m "feat: add first recipe image assets"
git push origin main
```

Если менялись только инструменты v39:

```bash
git add scripts/slice_recipe_collage.py scripts/update_recipe_image_manifest.py IMAGE_ASSET_WORKFLOW.md VERSION_LOG.md NEXT_STEPS.md
git commit -m "chore: add recipe image asset tooling"
git push origin main
```

Перед commit не добавлять `app.js`, `styles.css`, JSON-базы рецептов, zip, `.DS_Store` или `ios/`.

## 7. Проверить GitHub Pages

После публикации открыть:

```text
https://79kqtc2xbf-jpg.github.io/Cozy_food_app/?v=webstable38-image-pipeline
```

Проверить те же пункты, что локально. Если GitHub Pages отдаёт старую версию, подождать обновления кэша и открыть ссылку в приватном окне.
