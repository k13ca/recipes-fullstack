import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/data-context";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [photoId, setPhotoId] = useState(0);
  const { recipes } = useContext(DataContext);
  const navigate = useNavigate();

  const bannerPhotos = recipes.map((recipe) => [recipe.image]);

  useEffect(() => {
    function getPhotoId() {
      if (bannerPhotos.length > 0) {
        const randomId = Math.floor(
          Math.floor(Math.random() * bannerPhotos.length)
        );
        setPhotoId(randomId);
      }
    }
    const interval = setInterval(() => getPhotoId(), 10000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <header>
      <h1>Recipes Web Api</h1>
      <div className="header-menu">
        <h4 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          main page
        </h4>

        <a href="#footer">
          <h4>links</h4>
        </a>
        <button onClick={() => navigate("/add-recipe")}>
          <h4>add recipe</h4>
        </button>
      </div>
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerPhotos[photoId]})` }}
      ></div>
    </header>
  );
}
