const selectExternalId = "SELECT external_id FROM recipes WHERE external = ?";

const selectRecipes = `
 SELECT * FROM recipes LIMIT ? OFFSET ?
`;

const searchRecipes = `
      SELECT * FROM recipes
      WHERE
        name LIKE ? OR
        cuisine LIKE ? OR
        difficulty LIKE ? OR
        JSON_SEARCH(ingredients, 'all', ?) IS NOT NULL OR
        JSON_SEARCH(instructions, 'all', ?) IS NOT NULL OR
        JSON_SEARCH(meal_type, 'all', ?) IS NOT NULL
      `;
const selectFilterOptions = ` SELECT cuisine, difficulty, meal_type FROM recipes`;

module.exports = {
  selectFilterOptions,
  searchRecipes,
  selectExternalId,
  selectRecipes,
};
