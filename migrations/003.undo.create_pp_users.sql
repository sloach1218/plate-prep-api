ALTER TABLE pp_recipes
  DROP COLUMN IF EXISTS user_id;

ALTER TABLE pp_planner
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS pp_users CASCADE;
