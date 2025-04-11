import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 12;
  const [filters, setFilters] = useState({
    cuisine: [],
    difficulty: [],
    meal_type: [],
  });

  const [filterOptions, setFilterOptions] = useState([]);

  async function fetchRecipes() {
    setIsLoading(true);
    setPagination(true);
    const res = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        limit,
      }),
    });
    if (!res.ok) {
      return "ERROR";
    }
    const data = await res.json();
    if (data.error) {
      setIsLoading(false);
      setError(data.error);
      return;
    }
    setRecipes(data.results);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  }

  async function fetchFilterOptions() {
    setIsLoadingFilters(true);
    const res = await fetch("http://localhost:3000/filter-options");
    const data = await res.json();
    if (data) {
      setFilterOptions(data);
      setIsLoadingFilters(false);
    }
  }

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  console.log(recipes);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isLoadingFilters,
        filterOptions,
        limit,
        totalPages,
        page,
        nextPage,
        prevPage,
        fetchRecipes,
        setRecipes,
        recipes,
        isLoading,
        error,
        filters,
        setFilters,
        pagination,
        setPagination,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, DataContext };
