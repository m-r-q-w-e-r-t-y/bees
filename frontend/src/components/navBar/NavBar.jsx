import React, { Component } from "react";
import "./navbar.css";

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {searchedDocument: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
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
            <button className="fa fa-search"></button>
          </div>
        </div>
        <div className="rightSide">
          <div className="dropdown">
            <button className="dropbtn">≡</button>
            <div className="dropdown-content">
              <a href="#">Setting</a>
              <a href="#">Log out</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
