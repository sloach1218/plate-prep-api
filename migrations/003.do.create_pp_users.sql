CREATE TABLE pp_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE pp_recipes
  ADD COLUMN
    user_id INTEGER REFERENCES pp_users(id)
    ON DELETE SET NULL;
