import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/login"); 
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <img
        className="profile"
        src={assets.profile_image}
        alt="Profile"
        onClick={handleProfileClick}
      />
    </div>
  );
};

export default Navbar;
