const axios = require("axios");
const selectQuery = require("../sql/select-queries");
const insertQuery = require("../sql/insert-queries");
const deleteQuery = require("../sql/delete-queries");
const updateQuery = require("../sql/update-queries");

async function fetchExternalRecipes(conn) {
  const externalData = true;
  const [existingRows] = await conn.query(selectQuery.selectExternalId, [
    externalData,
  ]);

  const existingIds = new Set(existingRows.map((row) => row.external_id));

  const response = await axios.get("https://dummyjson.com/recipes");
  const apiData = response.data.recipes;

  const newItems = apiData.filter((item) => !existingIds.has(item.id));

  if (newItems.length > 0) {
    for (const item of newItems) {
      await insertRecipe(conn, item, externalData);
    }
    console.log(`Dodano ${newItems.length} nowych rekordów z API`);
  } else {
    console.log("Brak nowych danych z API");
  }
}

async function insertRecipe(conn, recipe, external) {
  try {
    const recipeId = recipe.id;
    await conn.query(insertQuery.insertRecipes, [
      recipe.id,
      external,
      recipe.name,
      recipe.caloriesPerServing,
      recipe.cookTimeMinutes,
      recipe.cuisine,
      recipe.difficulty,
      recipe.image,
      recipe.prepTimeMinutes,
      recipe.servings,
      JSON.stringify(recipe.ingredients),
      JSON.stringify(recipe.instructions),
      JSON.stringify(recipe.mealType),
      JSON.stringify(recipe.tags),
    ]);

    console.log(`Przepis ${recipe.name} dodany!`);
  } catch (err) {
    console.error("Błąd przy dodawaniu przepisu:", err);
  }
}

async function getRecipes(conn, req, res) {
  const { page = 1, limit = 12 } = req.body;
  const values = [Number(limit), (Number(page) - 1) * Number(limit)];
  const [results] = await conn.query(selectQuery.selectRecipes, values);
  const [totalResults] = await conn.query(
    `SELECT COUNT(*) AS count FROM recipes`
  );
  if (results) {
    res.json({
      results,
      totalResults: totalResults[0].count,
      totalPages: Math.ceil(totalResults[0].count / limit),
      currentPage: Number(page),
    });
    return;
  }
  res.json({ error: true, message: "can not get recipes" });
}

async function deleteRecipe(conn, req, res) {
  const id = req.body["id"];
  console.log(req.body);
  const result = await conn.query(deleteQuery.deleteRecipe, [id]);
  if (result[0].affectedRows > 0) {
    res.json({ message: "success deleted row", id });
    return;
  }
  res.json({ error: true, message: "can not delete recipe", id });
}

async function addRecipe(conn, req, res) {
  const {
    image,
    recipe_name,
    ingredients,
    instructions,
    meal_type,
    cuisine,
    calories_per_serving,
    cook_time_minutes,
    servings,
    difficulty,
    tags,
  } = req.body;
  const result = await conn.query(insertQuery.insertInternalRecipe, [
    false,
    recipe_name,
    calories_per_serving,
    cook_time_minutes,
    cuisine,
    difficulty,
    image,
    servings,
    JSON.stringify(ingredients),
    JSON.stringify(instructions),
    JSON.stringify(meal_type),
    JSON.stringify(tags),
  ]);

  if (result[0].affectedRows > 0) {
    res.json({ message: "success added recipe" });
    return;
  }
  res.json({ error: true, message: "can not add recipe", id });
}

async function searchRecipes(conn, req, res) {
  const searchParam = `%${req.body.search_param}%`;
  const result = await conn.query(selectQuery.searchRecipes, [
    searchParam,
    searchParam,
    searchParam,
    searchParam,
    searchParam,
    searchParam,
  ]);

  if (result[0]) {
    return res.json(result[0]);
  }
  res.json({ error: true, message: "can not find recipes" });
}

async function filterRecipes(conn, req, res) {
  const filterParam = req.body;
  let query = `SELECT * FROM recipes WHERE 1=1`;
  const values = [];

  if (filterParam.cuisine && filterParam.cuisine.length > 0) {
    query += ` AND cuisine IN (?)`;
    values.push(filterParam.cuisine);
  }

  if (filterParam.difficulty && filterParam.difficulty.length > 0) {
    query += ` AND difficulty IN (?)`;
    values.push(filterParam.difficulty);
  }

  if (filterParam.meal_type && filterParam.meal_type.length > 0) {
    query += ` AND JSON_CONTAINS(meal_type, ?)`;
    values.push(JSON.stringify(filterParam.meal_type));
  }

  try {
    const [results] = await conn.query(query, values);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: true, message: "Error filtering recipes" });
  }
}

async function updateRecipe(conn, req, res) {
  const {
    id,
    image,
    recipe_name,
    ingredients,
    instructions,
    meal_type,
    cuisine,
    calories_per_serving,
    cook_time_minutes,
    servings,
    difficulty,
    tags,
  } = req.body;

  try {
    const result = await conn.query(updateQuery.updateInternalRecipe, [
      recipe_name,
      calories_per_serving,
      cook_time_minutes,
      cuisine,
      difficulty,
      image,
      servings,
      JSON.stringify(ingredients),
      JSON.stringify(instructions),
      JSON.stringify(meal_type),
      JSON.stringify(tags),
      id,
    ]);

    res.json({ message: "recipe updated", result });
  } catch (error) {
    res.json({ message: "can not update recipe", error });
  }
}

async function getFilterOptions(conn, req, res) {
  try {
    const [result] = await conn.query(selectQuery.selectFilterOptions);
    res.json(result);
  } catch (error) {
    res.json({ message: "can not select filter options", error });
  }
}

module.exports = {
  getFilterOptions,
  filterRecipes,
  getRecipes,
  fetchExternalRecipes,
  deleteRecipe,
  addRecipe,
  searchRecipes,
  updateRecipe,
};
