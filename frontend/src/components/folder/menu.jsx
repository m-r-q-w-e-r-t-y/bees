import React from "react";
import { Component } from "react";
import "./folder.css"

class Menu extends Component {
    render() { 
        return (
            <ul className="menuList">
                <li className="menuItem">Rename</li>
                <li className="menuItem">Open</li>
                <li className="menuItem">Remove</li>
                <li className="menuItem">Share</li>
            </ul>
        );
    }
}

export default Menu;