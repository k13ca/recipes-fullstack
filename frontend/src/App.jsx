import { DataProvider } from "./contexts/data-context";
import Main from "./pages/main-page";
import RecipePage from "./pages/recipe-page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecipesPage from "./pages/recipes-page";
import AddRecipe from "./pages/add-recipe";

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Navigate to="/recipes" />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipe/:id" element={<RecipePage />} />
              <Route path="add-recipe" element={<AddRecipe />} />
              <Route path="edit-recipe" element={<AddRecipe />} />
              <Route path="*" element={<Navigate to="/recipes" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
