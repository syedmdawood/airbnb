import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import "../Styles/LowerNavabr.css";

const LowerNavbar = () => {
  const [selectedIcon, setSelectedIcon] = useState("explore");

  const handleSelect = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className="lower-navbar">
      <div className="sub-lower-navbar">
        <div
          className="icon"
          onClick={() => handleSelect("explore")}
          style={{
            color: selectedIcon === "explore" ? "#ff385c" : "black",
          }}
        >
          <FaSearch size={20} />
          <p>Explore</p>
        </div>

        <div
          className="icon"
          onClick={() => handleSelect("wishlist")}
          style={{
            color: selectedIcon === "wishlist" ? "#ff385c" : "black",
          }}
        >
          <BiHeart size={20} />
          <p>Wishlist</p>
        </div>

        <div
          className="icon"
          onClick={() => handleSelect("login")}
          style={{
            color: selectedIcon === "login" ? "#ff385c" : "black",
          }}
        >
          <FaUser size={20} />
          <p>Login in</p>
        </div>
      </div>
    </div>
  );
};

export default LowerNavbar;
