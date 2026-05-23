# IMAGE_GENERATION_PROMPTS.md

Image generation plan for Cozy Foodie.

## Current image pipeline

- Version: `webstable38-image-pipeline`
- Image folder: `images/recipes/`
- Manifest: `recipe-images.json`
- Loader: `v38-recipe-images-loader.js`
- Recommended format: `.webp`
- Recommended file naming: `v34_0001.webp`, `v34_0002.webp`, etc.

## General style prompt

Use this style for all recipe images:

> Cozy homemade food photography, warm dark cozy kitchen mood, soft natural window light, rustic plate or bowl, appetizing but realistic homemade dish, no hands, no people, no text, no logo, no watermark, vertical mobile-friendly composition, close-up food photo, warm beige and dark brown tones, realistic texture, simple everyday ingredients.

## Negative prompt

> no text, no watermark, no logo, no people, no hands, no plastic look, no raw unsafe food, no burned food, no oven tray unless recipe needs it, no restaurant fine dining plating, no surreal ingredients, no extra objects covering the dish.

## First batch: featured 30

Generate these first and save as `.webp` in `images/recipes/`.

1. `v34_0001.webp` — omelet with cheese and herbs on a warm plate, homemade breakfast.
2. `v34_0002.webp` — cottage cheese bowl with berries, simple cozy breakfast.
3. `v34_0003.webp` — cottage cheese pancakes on a plate, soft golden crust.
4. `v34_0004.webp` — oatmeal with banana in a bowl, warm breakfast.
5. `v34_0010.webp` — lavash wrap with cheese and tomatoes, simple snack.
6. `v34_0020.webp` — warm lavash with egg, cozy quick breakfast.
7. `v34_0030.webp` — lavash with chicken and cucumber, homemade wrap.
8. `v34_0006.webp` — rice with vegetables in a bowl, simple dinner.
9. `v34_0007.webp` — buckwheat with mushrooms, warm bowl.
10. `v34_0121.webp` — macaroni with chicken, everyday dinner.
11. `v34_0122.webp` — dumplings with sour cream, cozy simple food.
12. `v34_0124.webp` — cottage cheese spread on bread, quick no-cook snack.
13. `v34_0127.webp` — mashed potatoes with herbs, warm comfort food.
14. `v34_0129.webp` — pasta with tomatoes and cheese, simple skillet pasta.
15. `v34_0130.webp` — salad with beans and vegetables, fresh no-cook bowl.
16. `v34_0131.webp` — noodles with vegetables, simple quick dinner.
17. `v34_0132.webp` — hot sandwich cooked in a pan, cozy snack.
18. `v34_0140.webp` — vegetable salad with cheese, fresh bowl.
19. `v34_0150.webp` — cucumber and egg salad, simple homemade salad.
20. `v34_0244.webp` — lentil soup in a bowl, warm homemade soup.
21. `v34_0246.webp` — beans in tomato sauce, simple warm bowl.
22. `v34_0248.webp` — bean spread on toast, no-cook snack.
23. `v34_0249.webp` — minced meat with vegetables in a pan, simple dinner.
24. `v34_0284.webp` — chicken in sour cream sauce, warm skillet dish.
25. `v34_0372.webp` — chicken soup with rice, cozy soup bowl.
26. `v34_0373.webp` — vegetable soup with beans, warm soup bowl.
27. `v34_0735.webp` — fish in a pan with lemon, simple homemade dinner.
28. `v34_0881.webp` — sweet oatmeal bowl, cozy dessert breakfast.
29. `v34_0882.webp` — cottage cheese cream with banana, soft dessert bowl.
30. `v34_0883.webp` — apples with cottage cheese in a bowl, simple sweet snack.

## After upload

After images are uploaded, add mappings in `recipe-images.json`:

```json
{
  "version": "webstable38-image-pipeline",
  "basePath": "images/recipes/",
  "format": "webp",
  "recipes": {
    "v34_0001": "images/recipes/v34_0001.webp"
  }
}
```
