import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Favourites from "./pages/Favourites";
import MealGenerator from "./pages/randomMeal/MealGenerator";
import AboutMe from "./pages/about/AboutMe";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/meal-generator" element={<MealGenerator />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </Router>
  );
};

export default App;
