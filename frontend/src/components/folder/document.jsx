import React from "react";
import { Component } from "react";
import "./folder.css"

class Document extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Initial State"
        }
    }
    render() { 
        return (
            <div className = "document">
                <div className = "documentCard" >  
                    <img src={require("./file.png")} className = "documentImage" alt="document image"  />
                    <img  src={require("./hamburger.png")} className = "documentHamburger" onClick = {() => alert('hello')} alt="" />
                </div>
                <h1 className="documentName"> {this.props.name} </h1>
            </div>
        );
    }
}

export default Document;