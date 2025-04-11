import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { DataContext } from "../contexts/data-context";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const location = useLocation();
  const editMode = !!location.state;

  const { fetchRecipes } = useContext(DataContext);
  const navigate = useNavigate();
  const ingredients = useRef();
  const tags = useRef();
  const meal_type = useRef();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    ingredients: [],
    instructions: [],
    meal_type: [],
    cuisine: "",
    calories_per_serving: "",
    cook_time_minutes: "",
    servings: "",
    difficulty: "",
    tags: [],
  });

  let button = "ADD RECIPE";
  if (editMode) {
    button = "SAVE";
  }

  useEffect(() => {
    if (editMode) {
      const recipeData = location.state;
      if (recipeData) {
        setFormData(recipeData);
      }
    }
  }, [location.state, editMode]);

  const [formErrors, setFormErrors] = useState({
    tags: "",
    ingredients: "",
    meal_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArray = (ref) => {
    if (ref.current && ref.current.value.length > 0) {
      const value = ref.current.value;
      const name = ref.current.name;
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));
      ref.current.value = "";
    }
  };

  const handleInstrucionsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: [value],
    }));
  };

  const deleteFromArray = (name, id) => {
    const deletedItems = formData[name].filter((item, index) => index !== id);
    setFormData((prev) => ({
      ...prev,
      [name]: deletedItems,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      tags: formData.tags.length === 0 ? "Tags are required" : "",
      ingredients:
        formData.ingredients.length === 0 ? "Ingredients are required" : "",
      meal_type: formData.meal_type.length === 0 ? "Meal type is required" : "",
      difficulty:
        formData.difficulty.length === 0 ? "Difficulty is required" : "",
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((val) => val !== "");
    if (hasErrors) {
      return;
    }

    editMode
      ? fetch(`http://localhost:3000/edit-recipe`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then((res) => {
          if (res.ok) {
            fetchRecipes();
            navigate("/recipes");
          }
        })
      : fetch(`http://localhost:3000/add-recipe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then((res) => {
          if (res.ok) {
            fetchRecipes();
            navigate("/recipes");
          }
        });
  };

  return (
    <>
      <form id="add-recipe" onSubmit={handleSubmit}>
        <h1>Fill the form</h1>

        <div className="add-recipe">
          <div className="add-recipe-column">
            <label htmlFor="image">
              <h4>Image URL:</h4>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />

            <label htmlFor="name">
              <h4>Recipe name:</h4>
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="ingredients">
              <h4>Ingredients:</h4>
            </label>
            <span className="multiple-options multiple-option">
              <input
                ref={ingredients}
                type="text"
                id="ingredients"
                name="ingredients"
              />
              <AiOutlinePlusSquare
                onClick={() => handleArray(ingredients)}
                className="add-icon"
              />
            </span>
            <div>
              {formData.ingredients.map((item, index) => (
                <div className="multiple-options">
                  <h3>{item} </h3>
                  <div onClick={() => deleteFromArray("ingredients", index)}>
                    X
                  </div>
                </div>
              ))}
            </div>
            <label htmlFor="instructions">
              <h4>instructions:</h4>
            </label>
            <textarea
              required
              rows="8"
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInstrucionsChange}
            />

            <label htmlFor="meal_type">
              <h4>Meal type:</h4>
            </label>

            <span className="multiple-options multiple-option">
              <input
                ref={meal_type}
                type="text"
                id="meal_type"
                name="meal_type"
              />
              <AiOutlinePlusSquare
                onClick={() => handleArray(meal_type)}
                className="add-icon"
              />
            </span>
            <div>
              {formData.meal_type.map((item, index) => (
                <div className="multiple-options">
                  <h3>{item}</h3>
                  <div onClick={() => deleteFromArray("meal_type", index)}>
                    X
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="add-recipe-column">
            <label htmlFor="cuisine">
              <h4>Cuisine:</h4>
            </label>
            <input
              required
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
            />

            <label htmlFor="tags">
              <h4>Tags:</h4>
            </label>
            <span className="multiple-options">
              <input ref={tags} type="text" id="tags" name="tags" />
              <AiOutlinePlusSquare
                onClick={() => handleArray(tags)}
                className="add-icon"
              />
            </span>
            <div>
              {formData.tags.map((item, index) => (
                <div className="multiple-options">
                  <h3>{item}</h3>
                  <div onClick={() => deleteFromArray("tags", index)}>X</div>
                </div>
              ))}
            </div>

            <label htmlFor="calories_per_serving">
              <h4>Calories per serving:</h4>
            </label>
            <input
              required
              max="1000"
              type="number"
              id="calories_per_serving"
              name="calories_per_serving"
              value={formData.calories_per_serving}
              onChange={handleChange}
            />

            <label htmlFor="cook_time_minutes">
              <h4>Cook time minutes:</h4>
            </label>
            <input
              max="240"
              required
              type="number"
              id="cook_time_minutes"
              name="cook_time_minutes"
              value={formData.cook_time_minutes}
              onChange={handleChange}
            />

            <label htmlFor="servings">
              <h4>Servings:</h4>
            </label>
            <input
              required
              min="1"
              max="10"
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
            />

            <h4>Difficulty:</h4>

            <span className="multiple-options">
              <span>
                <label htmlFor="easy">
                  <h3>Easy</h3>
                </label>
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="Easy"
                  checked={formData.difficulty === "Easy"}
                  onChange={handleChange}
                />
              </span>

              <span>
                <label htmlFor="medium">
                  <h3>Medium</h3>
                </label>
                <input
                  type="radio"
                  id="medium"
                  name="difficulty"
                  value="Medium"
                  checked={formData.difficulty === "Medium"}
                  onChange={handleChange}
                />
              </span>

              <span>
                <label htmlFor="hard">
                  <h3>Hard</h3>
                </label>
                <input
                  type="radio"
                  id="hard"
                  name="difficulty"
                  value="Hard"
                  checked={formData.difficulty === "Hard"}
                  onChange={handleChange}
                />
              </span>
            </span>
          </div>
        </div>

        <button type="submit">
          <h4>{button}</h4>
        </button>
        {Object.values(formErrors).some((error) => error !== "") && (
          <div>
            <ul>
              {Object.entries(formErrors).map(
                ([field, error]) => error && <li key={field}>{error}</li>
              )}
            </ul>
          </div>
        )}
      </form>
    </>
  );
}
