import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavouritesContext } from "../../FavouritesContext";
import "./Menu.css"; // Import CSS file for styling

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meals, setMeals] = useState([]);
  const [scrollToMeals, setScrollToMeals] = useState(false);

  // Access favourites context
  const { favourites, addFavourite, removeFavourite } =
    useContext(FavouritesContext);

  const mealsSectionRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMealsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      setMeals(response.data.meals || []);
      setSelectedCategory(category); // Update selected category
      setScrollToMeals(true); // Set to true to trigger scroll to meals section
    } catch (error) {
      console.error(`Error fetching meals for category ${category}:`, error);
    }
  };

  useEffect(() => {
    if (scrollToMeals && mealsSectionRef.current) {
      mealsSectionRef.current.scrollIntoView({ behavior: "smooth" });
      setScrollToMeals(false);
    }
  }, [scrollToMeals]);

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      // If already selected, clear meals
      setMeals([]);
      setSelectedCategory("");
    } else {
      fetchMealsByCategory(category);
    }
  };

  const isMealInFavourites = (mealId) => {
    return favourites.some((meal) => meal.idMeal === mealId);
  };

  const handleAddToFavorites = (meal) => {
    if (!isMealInFavourites(meal.idMeal)) {
      addFavourite(meal);
      toast.success("Meal added to favorites!");
    } else {
      toast.info("Meal is already in favorites!");
    }
  };

  const handleRemoveFromFavorites = (mealId) => {
    removeFavourite(mealId);
    toast.success("Meal removed from favorites!");
  };

  return (
    <div>
      <ToastContainer />
      <h2>Meal Categories</h2>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.strCategory}
            className="category-item"
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            {category.strCategory}
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <div>
          <h3 ref={mealsSectionRef}>Meals in {selectedCategory}</h3>
          <div className="meal-list">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="meal-item">
                <img src={meal.strMealThumb + "/preview"} alt={meal.strMeal} />
                <h4>{meal.strMeal}</h4>
                <div className="button-container">
                  {isMealInFavourites(meal.idMeal) ? (
                    <p>Already added to Favorites</p>
                  ) : (
                    <button onClick={() => handleAddToFavorites(meal)}>
                      Add to Favorites
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveFromFavorites(meal.idMeal)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
