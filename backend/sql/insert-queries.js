const insertRecipes = `INSERT INTO recipes 
          (external_id, external, name, calories_per_serving, cook_time_minutes, cuisine, difficulty, image, prep_time_minutes, servings, ingredients, instructions, meal_type, tags) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertInternalRecipe = `INSERT INTO recipes 
          (external, name, calories_per_serving, cook_time_minutes, cuisine, difficulty, image, servings, ingredients, instructions, meal_type, tags) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
module.exports = {
  insertInternalRecipe,
  insertRecipes,
};
