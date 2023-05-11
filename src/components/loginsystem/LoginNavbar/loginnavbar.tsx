import React from "react";
import "./loginnavbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navwrap">
      <Link to="/Login">
        <button className="NavButtons">Login</button>
      </Link>
      <Link to="/Signup">
        <button className="NavButtons">Sign Up</button>
      </Link>
    </div>
  );
};

export default Navbar;
