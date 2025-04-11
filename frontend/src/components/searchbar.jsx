import React, { useContext, useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { DataContext } from "../contexts/data-context";

export default function Searchbar() {
  const [firstRender, setFirstRender] = useState(true);
  const [inputData, setInputData] = useState("");
  const { fetchRecipes, setRecipes, setPagination } = useContext(DataContext);

  async function fetchFilteredRecipes() {
    setFirstRender(false);
    const res = await fetch(`http://localhost:3000/search-recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search_param: inputData }),
    });

    const data = await res.json();
    console.log(data);
    setRecipes(data);
    setPagination(false);
  }

  useEffect(() => {
    if (inputData.length === 0 && !firstRender) {
      fetchRecipes();
      setFirstRender(true);
      setPagination(true);
    }
  }, [inputData, firstRender]);
  return (
    <form className="searchbar">
      <input
        className="searchbar-input"
        type="text"
        placeholder="find recipes"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></input>
      <IoSearchCircleOutline
        className="search-icon"
        type="button"
        onClick={fetchFilteredRecipes}
      />
    </form>
  );
}
