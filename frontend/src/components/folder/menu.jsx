import React from "react";
import { Component } from "react";
import "./folder.css"
import RenameDocument from "./renameDocument";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
      }
    handleRemove(event){
        this.props.removeHandler(this.props.documentName);
        event.preventDefault();
    }
    render() { 
        return (
            <ul className="menuList">
                <li className="menuItem" onClick={this.props.startNamingHandler}>Rename</li>
                <a  href = "http://localhost:3000/noteviewpage" className="menuItem">Open</a>
                <li className="menuItem" onClick={this.handleRemove}>Remove</li>
                <li className="menuItem">Share</li>
            </ul>
        );
    }
}

export default Menu;