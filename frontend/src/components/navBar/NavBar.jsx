import React, { Component } from "react";
import "./navbar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>{" "}
        <div className="leftSide">
          <div className="dreamworktitle">CODEHUB</div>
          <div className="search-box">
            <input
              className="searchBar"
              type="text"
              placeholder=" Search for projects, teammates..."
            />
            <button class="fa fa-search"></button>
          </div>
        </div>
        <div className="rightSide">
          <div class="dropdown">
            <button className="dropbtn">≡</button>
            <div class="dropdown-content">
              <a href="#">Setting</a>
              <a href="#">Log out</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
