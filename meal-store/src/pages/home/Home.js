import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-section">
        <h2>Menu</h2>
        <p>Explore our delicious menu offerings.</p>
        <Link to="/menu" className="home-link">
          Go to Menu
        </Link>
      </div>
      <div className="home-section">
        <h2>Favorites</h2>
        <p>View and manage your favorite meals.</p>
        <Link to="/favourites" className="home-link">
          Go to Favorites
        </Link>
      </div>
      <div className="home-section">
        <h2>Random Meal Generator</h2>
        <p>Feeling lucky? Generate a random meal!</p>
        <Link to="/meal-generator" className="home-link">
          Generate Random Meal
        </Link>
      </div>
    </div>
  );
};

export default Home;
