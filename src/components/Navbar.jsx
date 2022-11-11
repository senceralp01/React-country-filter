import React from "react";
import { images } from "../constants";

const Navbar = () => {
  return (
    <nav className="navbar bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          Country Finder
        </a>
        <a className="navbar-brand text-white" href="#">
          <img src={images.logo} alt="logo" style={{ width: "100px" }} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
