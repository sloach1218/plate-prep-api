BEGIN;

TRUNCATE
  pp_recipes
  RESTART IDENTITY CASCADE;


INSERT INTO pp_recipes (name, ingredients, directions )
VALUES
  ('Cookies', '{"1 package - cookie dough"}','{"Go to fridge", "find cookie dough", "place on cookie sheet", "put in oven for 15 minutes"}'),
  ('Smoothie', '{"1 - banana", "1 cup - almond milk", "2 tablespoons - almond butter"}','{"Put all ingredients in blender", "Blend to desired consistency"}'),
  ('PB & J', '{"2 slices - bread", "peanut butter", "jelly"}','{"Get bread", "spread jelly on one half", "spread peanut butter on other half", "smush together"}');



COMMIT;

