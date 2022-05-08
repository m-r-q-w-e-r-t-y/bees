import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const NavBar = ({delToken}) => {
  return (
    <div className="Navbar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>{" "}
      <div className="leftSide">
        <Link to="/folder">
          <div className="dreamworktitle">CODEHUB</div>
        </Link>
        <div className="search-box">
          <div className="search-box-contents">
            <input
              className="searchBar"
              type="text"
              placeholder=" Search notes..."
            />
            <button className="fa fa-search"></button>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="dropdown">
          <button className="dropbtn">≡</button>
          <div className="dropdown-content">
            <Link to="/login" onClick={ () => { delToken() } }>Log out</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
