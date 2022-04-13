import React from "react";
import { Component } from "react";
import Menu from "./menu";
import "./folder.css"

class Document extends Component {



    constructor(props) {
        super(props)
        this.state = {
            showMenu: false
        }
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }
    
    renderDropdownMenu(){
        if(this.state.showMenu === true){
            return (
            <Menu></Menu>
            )
        }
    }
    handleMenuClick(){
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    render() { 
        return (
            <div className = "document">
                <div className = "documentCard" >  
                    <img src={require("./file.png")} className = "documentImage" alt="document image"  />
                    <img  src={require("./hamburger.png")} className = "documentHamburger" onClick = {this.handleMenuClick} alt="" />
                </div>
                <h1 className="documentName"> {this.props.name} </h1>
                {this.renderDropdownMenu()}
            </div>
        );
    }
}

export default Document;