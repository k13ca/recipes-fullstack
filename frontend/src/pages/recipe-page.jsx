import React, { useContext, useState } from "react";
import { DataContext } from "../contexts/data-context";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/modal";
import Loader from "../components/loader";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";

export default function RecipePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { recipes, fetchRecipes } = useContext(DataContext);

  const { id } = useParams();
  const navigate = useNavigate();

  if (!recipes || recipes.length === 0) {
    return <Loader />;
  }

  const currentRecipe = recipes.find((recipe) => recipe.id === Number(id));

  if (!currentRecipe) {
    navigate("/recipes");
    return null;
  }

  const difficultyLevels = {
    Easy: [<GoDotFill />, <GoDot />, <GoDot />],
    Medium: [<GoDotFill />, <GoDotFill />, <GoDot />],
    Hard: [<GoDotFill />, <GoDotFill />, <GoDotFill />],
  };

  const difficulty = (
    <div className="difficulty">
      {difficultyLevels[currentRecipe.difficulty] || [
        <GoDot />,
        <GoDot />,
        <GoDot />,
      ]}
    </div>
  );

  function deleteRecipe() {
    fetch(`http://localhost:3000/delete-recipe`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: currentRecipe.id }),
    }).then((res) => {
      if (res.ok) {
        setModalVisible(false);
        fetchRecipes();
        navigate("/recipes");
      }
    });
  }

  return (
    <>
      {modalVisible && (
        <Modal
          deleteRecipe={deleteRecipe}
          closeModal={() => setModalVisible(false)}
        />
      )}

      <div className="recipe-page">
        <div className="recipe-page-photo-column">
          <div
            className="recipe-page-photo"
            style={{ backgroundImage: `url(${currentRecipe.image})` }}
          ></div>

          <div className="recipe-tile-bottom">
            <h3>{currentRecipe.calories_per_serving} KCAL</h3>
            <div className="recipe-tile-time">
              <MdAccessTime />
              <h3>{currentRecipe.cook_time_minutes}</h3>
            </div>
          </div>
        </div>

        <div className="recipe-page-content">
          <div className="recipe-page-buttons">
            <button
              onClick={() =>
                navigate("/edit-recipe/", { state: currentRecipe })
              }
            >
              edit
            </button>
            <button onClick={() => setModalVisible(true)}>
              <FaRegTrashAlt />
            </button>
          </div>
          <h1>{currentRecipe?.name}</h1>

          <div className="ingredients-instructions">
            <div className="ingredients">
              <ul>
                {currentRecipe.ingredients.map((ingr, index) => (
                  <li key={index}>
                    <h3 style={{ textTransform: "uppercase" }}>{ingr}</h3>
                  </li>
                ))}
              </ul>
            </div>

            <span className="instructinos">
              <h3>
                {currentRecipe.instructions.map(
                  (instruction) => instruction + " "
                )}
              </h3>
            </span>
          </div>

          <div className="details">
            <span className="recipe-details">
              <h4>Difficulty level:</h4>
              {difficulty}
            </span>
            <span className="recipe-details">
              <h4>Cuisine:</h4>
              <h3>{currentRecipe.cuisine}</h3>
            </span>
            <span className="recipe-details">
              <h4>Meal type:</h4>
              <h3>{currentRecipe.meal_type}</h3>
            </span>
            <span className="recipe-details">
              <h4>Servings:</h4>
              <h3>{currentRecipe.servings}</h3>
            </span>
            <span className="recipe-details">
              {currentRecipe.tags.map((tag, index) => (
                <div key={index} className="hashtag">
                  <h3>#{tag}</h3>
                </div>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
