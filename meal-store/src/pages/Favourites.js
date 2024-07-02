import React, { useContext } from "react";
import { FavouritesContext } from "../FavouritesContext";

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  const handleRemove = (mealId) => {
    removeFavourite(mealId);
  };

  return (
    <div>
      <h2>Favorite Meals</h2>
      <ul>
        {favourites.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb + "/preview"} alt={meal.strMeal} />
            <h4>{meal.strMeal}</h4>
            <button onClick={() => handleRemove(meal.idMeal)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
