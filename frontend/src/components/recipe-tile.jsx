import React from "react";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function RecipeTile({ id, photo, name, cookTime, kcal, tags }) {
  const navigate = useNavigate();

  function navigateToRecipe(id) {
    navigate(`/recipe/${id}`);
  }

  return (
    <div className="recipe-tile" onClick={() => navigateToRecipe(id)}>
      <div
        className="recipe-photo-container"
        style={{ backgroundImage: `url(${photo})` }}
      ></div>
      <div className="recipe-text-container">
        <h2 className="recipe-name">{name}</h2>
        <div className="recipe-tags">
          {tags.map((tag, index) => (
            <h3 key={index}>#{tag}</h3>
          ))}
        </div>
        <div className="recipe-tile-bottom">
          <h3>{kcal}KCAL</h3>
          <div className="recipe-tile-time">
            <MdAccessTime /> <h3>{cookTime}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
