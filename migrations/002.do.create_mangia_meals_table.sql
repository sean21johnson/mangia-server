CREATE TABLE IF NOT EXISTS meals (
    meal_id TEXT PRIMARY KEY NOT NULL,
    meal_image TEXT NOT NULL,
    meal_name TEXT NOT NULL,
    meal_category TEXT NOT NULL,
    meal_description TEXT NOT NULL,
    meal_time TEXT NOT NULL,
    users_id TEXT REFERENCES users(users_id) ON DELETE CASCADE NOT NULL
);



