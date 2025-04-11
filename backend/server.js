require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const createQuery = require("./sql/create-queries");
const recipesSrv = require("./services/recipes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function createTables(conn) {
  await conn.query(createQuery.createRecipesTable);
}

async function main() {
  const conn = await db.createConnection();
  await createTables(conn);
  await recipesSrv.fetchExternalRecipes(conn);
  app.post("/recipes", (req, res) => recipesSrv.getRecipes(conn, req, res));
  app.delete("/delete-recipe", (req, res) =>
    recipesSrv.deleteRecipe(conn, req, res)
  );
  app.post("/add-recipe", (req, res) => recipesSrv.addRecipe(conn, req, res));
  app.put("/edit-recipe", (req, res) =>
    recipesSrv.updateRecipe(conn, req, res)
  );
  app.post("/search-recipe", (req, res) =>
    recipesSrv.searchRecipes(conn, req, res)
  );
  app.post("/filter-recipes", (req, res) =>
    recipesSrv.filterRecipes(conn, req, res)
  );
  app.get("/filter-options", (req, res) =>
    recipesSrv.getFilterOptions(conn, req, res)
  );
}

main().then(() =>
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  })
);
