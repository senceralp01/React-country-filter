import React from "react";
import { GiWorld } from "react-icons/gi";
import { images } from "../constants";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark bg-gradient">
      <div className="container-fluid">
        <a className="navbar-brand text-white-50" href="#">
          c<GiWorld />untry finder 
        </a>
        <a className="navbar-brand text-white" href="#">
          <img src={images.logo} alt="logo" style={{ width: "100px" }} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
