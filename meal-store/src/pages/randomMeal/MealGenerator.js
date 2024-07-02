import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavouritesContext } from "../../FavouritesContext";
import "./RandomMealGenerator.css"; // Import CSS for styling

const MealGenerator = () => {
  const [randomMeal, setRandomMeal] = useState(null);

  // Access favourites context
  const { addFavourite, favourites } = useContext(FavouritesContext);

  // Function to fetch a random meal from API
  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  // Fetch a random meal from API on component mount
  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const handleAddToFavorites = () => {
    // Check if meal is already in favorites
    const isAlreadyFavourite = favourites.some(
      (meal) => meal.idMeal === randomMeal.idMeal
    );

    if (!isAlreadyFavourite) {
      addFavourite(randomMeal);
      toast.success("Meal added to favorites!");
    } else {
      toast.info("Meal is already in favorites!");
    }
  };

  const handleGenerateRandomMeal = () => {
    fetchRandomMeal();
  };

  return (
    <div className="random-meal-container">
      <ToastContainer />
      <h2>Random Meal Generator</h2>
      {randomMeal && (
        <div className="meal-details">
          <img
            src={randomMeal.strMealThumb + "/preview"}
            alt={randomMeal.strMeal}
            className="meal-image"
          />
          <div className="meal-info">
            <h3>{randomMeal.strMeal}</h3>
            <p>{randomMeal.strCategory}</p>
            <p>{randomMeal.strArea}</p>
            <p>{randomMeal.strInstructions}</p>
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
            <button onClick={handleGenerateRandomMeal}>
              Generate New Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealGenerator;
