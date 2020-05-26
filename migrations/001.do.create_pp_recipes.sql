CREATE TABLE pp_recipes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients TEXT [],
  directions TEXT [],
  date_created TIMESTAMP DEFAULT now() NOT NULL
);

