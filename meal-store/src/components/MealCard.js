import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

const MealCard = ({ meal }) => {
  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);

  const isFavourite = favourites.some(
    (favMeal) => favMeal.idMeal === meal.idMeal
  );

  return (
    <div>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <button
        onClick={() =>
          isFavourite ? removeFavourite(meal.idMeal) : addFavourite(meal)
        }
      >
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
};

export default MealCard;
