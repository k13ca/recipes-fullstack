const updateInternalRecipe = `
  UPDATE recipes SET
    name = ?, 
    calories_per_serving = ?, 
    cook_time_minutes = ?, 
    cuisine = ?, 
    difficulty = ?, 
    image = ?, 
    servings = ?, 
    ingredients = ?, 
    instructions = ?, 
    meal_type = ?, 
    tags = ?
  WHERE id = ?
`;

module.exports = {
  updateInternalRecipe,
};
