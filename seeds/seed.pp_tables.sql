BEGIN;

TRUNCATE
  pp_recipes,
  pp_planner,
  pp_users
  RESTART IDENTITY CASCADE;

INSERT INTO gj_users (user_name, password)
VALUES
  ('s_loach', '$2a$12$YPfELLcVbzdJOJcrcvfamOE55aFJM6VmYr3UgYoUG574qbcgsg/uu'),
  ('demo_user', '$2a$12$N2adADytKTjo6Janc/RVDOhj1emCMD/ALp3IY1Odycu6VLhbdU.BC'),
  ('pamela', '$2a$12$JdOOeNPzrO.D88a.8P.JDO9YCHzJjQaKovWCGOiA5u.SRXKU2ToqK');

INSERT INTO pp_recipes (name, ingredients, directions )
VALUES
  ('Cookies', '{"1 package - cookie dough"}','{"Go to fridge", "find cookie dough", "place on cookie sheet", "put in oven for 15 minutes"}'),
  ('Smoothie', '{"1 - banana", "1 cup - almond milk", "2 tablespoons - almond butter"}','{"Put all ingredients in blender", "Blend to desired consistency"}'),
  ('PB & J', '{"2 slices - bread", "peanut butter", "jelly"}','{"Get bread", "spread jelly on one half", "spread peanut butter on other half", "smush together"}');

INSERT INTO pp_planner (date, breakfast, lunch, dinner, snack )
VALUES
  ('Monday, May 24', '{"smoothie"}','{"PB & J", "chips", "cookies"}','{"lasagna"}','{"carrot sticks"}'),
  ('Tuesday, May 25', '{"smoothie"}','{"PB & J", "chips", "cookies"}','{"lasagna"}','{"carrot sticks"}'),
  ('Thursday, May 27', '{"smoothie"}','{"PB & J", "chips", "cookies"}','{"lasagna"}','{"carrot sticks"}');



COMMIT;

