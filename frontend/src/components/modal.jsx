import React from "react";

export default function Modal({ deleteRecipe, closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal">
        <h2>Are You sure, You want to delete this recipe?</h2>

        <span>
          <button onClick={deleteRecipe}>Yes</button>{" "}
          <button onClick={closeModal}>No</button>
        </span>
      </div>
    </div>
  );
}
