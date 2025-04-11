import React, { useContext } from "react";
import MenuOptions from "./menu-options";
import { DataContext } from "../contexts/data-context";
import { filterOption } from "../constants/const";
export default function AsideMenu() {
  const {
    filterOptions,
    filters,
    setRecipes,
    setPagination,
    fetchRecipes,
    isLoadingFilters,
  } = useContext(DataContext);

  if (isLoadingFilters) {
    return <div>Loading..</div>;
  }

  function mapOptions(name) {
    return Array.of(...new Set(filterOptions.map((recipe) => recipe[name])));
  }

  function getTypes(type) {
    let types = [];
    for (const value of type) {
      types = [...types, ...value];
    }
    return Array.of(...new Set(types));
  }

  async function fetchFilteredRecipes() {
    const areFiltersEmpty =
      filters.cuisine.length === 0 &&
      filters.difficulty.length === 0 &&
      filters.meal_type.length === 0;
    if (areFiltersEmpty) {
      fetchRecipes();
      return;
    }
    const res = await fetch(`http://localhost:3000/filter-recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    });

    const data = await res.json();
    console.log(data);
    setRecipes(data);
    setPagination(false);
  }
  return (
    <div className="aside-menu">
      <MenuOptions
        optionsHeader={filterOption.CUISINE}
        options={mapOptions("cuisine")}
      ></MenuOptions>
      <MenuOptions
        optionsHeader={filterOption.DIFFICULTY}
        options={mapOptions("difficulty")}
      ></MenuOptions>
      <MenuOptions
        optionsHeader={filterOption.MEAL_TYPES}
        options={getTypes(mapOptions("meal_type"))}
      ></MenuOptions>

      <button className="aside-menu-button" onClick={fetchFilteredRecipes}>
        <h4>Filter</h4>
      </button>
    </div>
  );
}
