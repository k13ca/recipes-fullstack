import React, { useContext } from "react";
import { DataContext } from "../contexts/data-context";
import Loader from "./loader";
import RecipeTile from "./recipe-tile";
import Searchbar from "./searchbar";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function RecipeContainer() {
  const { error, recipes, isLoading, nextPage, prevPage, page, pagination } =
    useContext(DataContext);

  let content;

  if (error) {
    content = <h1>No data</h1>;
  } else if (isLoading) {
    content = <Loader size={100} />;
  } else if (recipes.length === 0) {
    content = <h1>No recipes found</h1>;
  } else {
    content = recipes.map((recipe) => (
      <RecipeTile
        key={recipe.id}
        id={recipe.id}
        photo={recipe.image}
        name={recipe.name}
        cookTime={recipe.cook_time_minutes}
        kcal={recipe.calories_per_serving}
        tags={recipe.tags.slice(-3)}
      />
    ));
  }

  return (
    <div>
      <Searchbar></Searchbar>
      <div className="display-recipes">{content}</div>
      {pagination && (
        <div className="pagination">
          <IoIosArrowBack onClick={() => prevPage()} />
          <h3>{page}</h3>
          <IoIosArrowForward onClick={() => nextPage()} />
        </div>
      )}
    </div>
  );
}
