# VISUAL_SHORTLIST.md

Planning file for `v41-top-recipes-visual-shortlist`.

This file is a documentation/data audit artifact only. It does not add images,
generate images, map images, or change runtime image logic.

## Purpose

Create a controlled first shortlist of top recipes that should receive real food
photos in a future separate image patch.

The goal is to avoid another broad image pass with weak visual matches. v41 only
decides which recipes are worth preparing first, what a good image should look
like, and what should be rejected before any `recipe-images.json` mapping is
added later.

## Current Stable Context

- Current stable runtime: `webstable40-fallback-visual-taxonomy`
- v40 improved fallback emoji taxonomy.
- Real image mapping support remains available for future use.
- `recipe-images.json` mappings should override fallback visuals when verified
  real images are added later.
- Current `recipe-images.json` has no recipe mappings.
- `recipes-v36-cleaned.json` contains 1000 recipes.
- v37 featured/top recipe logic prioritizes the first 30 home recipes and key
  scenario/category recipe lists.

## Rules For Future Image Selection

1. Do not add images in v41.
2. Do not generate images unless Lisa explicitly asks for image generation.
3. Do not add remote image URLs.
4. Do not add or recreate an `assets/` folder.
5. Do not modify runtime image logic for this shortlist.
6. Do not modify recipe content for image matching.
7. Do not map images in `recipe-images.json` until image files pass QA.
8. Any future image must pass title-level visual QA before mapping.
9. If the image does not clearly match the title, leave the recipe on fallback.
10. Prefer a small verified batch over bulk image replacement.

## Title-Level Visual QA

Before a future mapping is added, the image reviewer should confirm:

1. The dish type matches the recipe title.
2. The main visible ingredients match the title and category.
3. The image does not imply a different dish, cuisine, or preparation method.
4. The image works as a small card thumbnail.
5. The image is bright enough, not black, not muddy, and not overly cropped.
6. The image feels cozy and homemade, not glossy stock-photo restaurant plating.
7. No misleading garnish or side dish becomes the main visual signal.

## Shortlist Summary

- Total shortlisted recipes: 28
- Hero priority: 5
- High priority: 15
- Later priority: 8
- Source: current `recipes-v36-cleaned.json` IDs, aligned with v37 featured and
  scenario/category priorities.

## Hero Priority

| ID | Title | Visual direction | Acceptable image | Wrong / mismatched image |
| --- | --- | --- | --- | --- |
| `v34_0001` | Омлет с сыром и зеленью на каждый день | Warm skillet or plate omelet with melted cheese and green herbs. | Yellow folded or soft-set omelet, visible herbs, simple breakfast plate. | Pasta, scrambled eggs without cheese/herbs, shakshuka, sandwich, pancake. |
| `v34_0002` | Творожная миска с ягодами без суеты | White cottage cheese or yogurt bowl with berries and a calm breakfast feel. | Bowl of tvorog/curd or thick yogurt with red/blue berries and light topping. | Oatmeal bowl, smoothie, cake, pancakes, savory salad. |
| `v34_0004` | Овсянка с бананом по-домашнему | Cozy oatmeal bowl with banana slices. | Porridge/oats in a bowl, banana clearly visible, soft breakfast styling. | Rice pudding, cottage cheese bowl, granola-only bowl, pancakes. |
| `v34_0010` | Лаваш с сыром и томатами свежая версия | Toasted lavash/wrap with cheese and tomato. | Folded or sliced lavash with melted cheese and visible tomato. | Burrito with beans/meat, sandwich bread, pizza, plain tortilla chips. |
| `v34_0244` | Чечевичная похлёбка к ужину | Thick lentil soup in a bowl, warm dinner mood. | Red/brown lentil soup or stew, spoonable texture, simple bowl. | Cream soup, pasta, bean salad, tomato sauce, dessert bowl. |

## High Priority

| ID | Title | Visual direction | Acceptable image | Wrong / mismatched image |
| --- | --- | --- | --- | --- |
| `v34_0003` | Творожные оладьи на скорую руку | Small cottage-cheese pancakes/syrniki, lightly browned. | Round golden pancakes or syrniki with simple topping. | American pancake stack with syrup only, omelet, toast, dessert cake. |
| `v34_0020` | Тёплый лаваш с яйцом для тихого вечера | Warm lavash folded around egg filling. | Toasted wrap/lavash with egg visible or clear breakfast wrap signal. | Plain omelet, burrito with beans, sandwich bread, salad wrap only. |
| `v34_0030` | Лаваш с курицей и огурцом по-домашнему | Homemade chicken lavash with cucumber and fresh filling. | Cut wrap/lavash with chicken pieces and cucumber/greens visible. | Shawarma-style overloaded fast food, beef burrito, plain salad. |
| `v34_0006` | Рис с овощами по-простому | Simple rice bowl with mixed vegetables. | White or lightly fried rice with visible vegetables in a bowl/plate. | Risotto, pasta, porridge, rice dessert, plain empty rice. |
| `v34_0007` | Гречка с грибами в тёплой миске | Buckwheat with mushrooms, earthy cozy bowl. | Brown buckwheat grains with mushroom pieces clearly visible. | Rice with vegetables, pasta with mushrooms, mushroom soup. |
| `v34_0121` | Макароны с курицей на каждый день | Everyday pasta with chicken pieces. | Short pasta or noodles with chicken, light sauce, simple dinner plate. | Seafood pasta, tomato-only pasta, rice bowl, chicken salad. |
| `v34_0122` | Пельмени со сметаной без суеты | Dumplings with sour cream. | Pelmeni/dumplings on a plate or bowl with sour cream. | Ravioli in tomato sauce, vareniki with berries, gnocchi, soup dumplings. |
| `v34_0127` | Картофельное пюре с зеленью в тёплой миске | Mashed potatoes with herbs, comfort-food feel. | Creamy mashed potatoes in a bowl/plate with green herbs. | Roasted potatoes, fries, potato salad, cauliflower puree. |
| `v34_0129` | Паста с томатами и сыром мягкая версия | Pasta with tomato and cheese, soft homemade styling. | Pasta with visible tomato sauce/pieces and grated or melted cheese. | Chicken pasta, cream pasta, pizza, noodle soup. |
| `v34_0131` | Лапша с овощами сытная версия | Noodles with vegetables. | Noodles mixed with colorful vegetables, simple bowl or pan. | Rice bowl, soup ramen, plain spaghetti with tomato sauce. |
| `v34_0132` | Горячий бутерброд на сковороде лёгкая версия | Pan-toasted hot sandwich. | Toasted bread sandwich with melted cheese or warm filling. | Cold open-faced toast, burger, wrap, pastry. |
| `v34_0140` | Овощной салат с сыром для тихого вечера | Fresh vegetable salad with cheese. | Salad with cucumber/tomato/greens and visible cheese pieces. | Egg salad, bean salad, cooked vegetables, pasta salad. |
| `v34_0150` | Салат с огурцом и яйцом по-домашнему | Cucumber and egg salad. | Chopped cucumber and boiled egg salad, light creamy or fresh style. | Omelet, potato salad, vegetable salad without egg, sandwich. |
| `v34_0284` | Курица в сметанном соусе быстрая версия | Chicken in pale sour-cream sauce. | Chicken pieces in creamy white sauce, simple pan or plate. | Fried chicken, curry, pasta, salad, soup. |
| `v34_0372` | Куриный суп с рисом лёгкая версия | Light chicken rice soup. | Clear/light soup with chicken, rice, carrot/herbs visible. | Cream soup, lentil stew, noodle soup, chicken pasta. |

## Later Priority

| ID | Title | Visual direction | Acceptable image | Wrong / mismatched image |
| --- | --- | --- | --- | --- |
| `v34_0124` | Творожная намазка на хлеб к ужину | Cottage-cheese spread on bread. | Bread/toast with white tvorog spread, herbs or cucumber optional. | Sweet cheesecake, yogurt bowl, cheese sandwich, hummus-only toast. |
| `v34_0130` | Салат с фасолью и овощами свежая версия | Bean and vegetable salad. | Beans mixed with chopped vegetables in a fresh salad bowl. | Lentil soup, plain green salad, chili, hummus. |
| `v34_0246` | Фасоль в томатном соусе по-простому | Beans in tomato sauce. | Warm beans in red tomato sauce, bowl or small pan. | Bean salad, lentil soup, pasta sauce without beans. |
| `v34_0248` | Намазка из фасоли для буднего дня | Bean spread or dip. | Creamy bean spread in a small bowl or on toast. | Whole bean stew, hummus with chickpeas only, sweet spread. |
| `v34_0249` | Фарш с овощами на сковороде мягкая версия | Minced meat with vegetables in a pan. | Ground meat sauteed with vegetables, warm skillet feel. | Meatballs, burger, chicken strips, vegetable-only stir-fry. |
| `v34_0373` | Овощной суп с фасолью уютная порция | Vegetable soup with beans. | Brothy vegetable soup with visible beans. | Cream soup, bean salad, lentil stew, pasta dish. |
| `v34_0735` | Рыба на сковороде с лимоном по-домашнему | Pan fish with lemon. | Cooked fish fillet with lemon, simple plate or skillet. | Raw fish, salmon sushi, fish soup, breaded nuggets. |
| `v34_0882` | Творожный крем с бананом лёгкая версия | Cottage-cheese cream with banana. | Creamy white dessert/breakfast bowl with banana slices. | Oatmeal, cake, smoothie, savory cheese spread. |

## Future Patch Notes

When the future image patch happens:

1. Add only verified local image files in the approved runtime image folder.
2. Update `recipe-images.json` only for images that passed title-level QA.
3. Confirm mapped images override fallback visuals.
4. Confirm broken loaded images remain `0`.
5. Keep the first batch small enough for visual review.
6. Do not use `assets/` as a source or runtime path.
