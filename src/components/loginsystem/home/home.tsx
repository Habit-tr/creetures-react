import React from "react";
import "./home.css";
import LoginNavbar from "../LoginNavbar/loginnavbar";
const Home = () => {
  return (
    <>
      <div className="AppBody">
        <LoginNavbar />
        <h1 className="Title">Creetures</h1>
      </div>
    </>
  );
};

export default Home;
