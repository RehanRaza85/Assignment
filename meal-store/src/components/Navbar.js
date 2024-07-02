import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavIcon = styled.div`
  cursor: pointer;
  display: none; /* Initially hide NavIcon */

  @media (max-width: 1500px) {
    display: block; /* Display NavIcon only on smaller screens */
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1500px) {
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: ${({ open }) => (open ? "0" : "-100%")};
    width: 100%;
    background: #333;
    transition: left 0.3s ease-in-out;
  }
`;

const NavLink = styled(Link)`
  color: white;
  margin: 0 4rem;
  text-decoration: none;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <Nav>
      <h1 style={{ color: "white" }}>Meal Store</h1>
      <NavIcon onClick={toggleMenu}>
        {open ? (
          <FaTimes size={30} color="white" />
        ) : (
          <FaBars size={30} color="white" />
        )}
      </NavIcon>
      <NavLinks open={open}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/menu" onClick={() => setOpen(false)}>
          Menu
        </NavLink>
        <NavLink to="/favourites" onClick={() => setOpen(false)}>
          My Favourites
        </NavLink>
        <NavLink to="/meal-generator" onClick={() => setOpen(false)}>
          Meal Generator
        </NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>
          About Me
        </NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
