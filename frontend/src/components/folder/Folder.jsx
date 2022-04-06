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
class CreateDocumentCircle extends Component {
    render(){
        return(
            <div className = "createDocumentCircleContainer">
                <span className = "createDocumentCirclePlus">+</span>
            </div>
        );
    }
}
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

class CreateDocument extends Component {
    handleClick(){
    }
    render() { 
        return (
            <div className='createDocumentCard' onClick = {this.handleClick}>
                <img className = "createDocumentImage" src={require("./newFile.png")}  alt="" />
            </div>
            
        );
    }
}

class NameNewDocument extends Component  {
    render(){
        return(
            <div className= "newDocumentLayer">
                <form className = "newDocumentForm" action="" >
                    <input className = "newDocumentInput" type="text" placeholder="Document Name ... "/>
                    <div className="newDocumentButtons"> 
                        <button className="newDocumentCancel">Cancel</button> 
                        <button className="newDocumentCreate">Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

class Folder extends Component {
    constructor(props) {
        super(props)
    }
    prependDocument(name){
        this.setState(this.state.documents.unshift({name}))
    }
    state = {  
        documents: [
            {name:"CSE442"},
            {name:"CSE116"},
            {name: "CSE 306"}
        ]
    } 
    render() { 
        return (
            <div className = "folder" >
                <CreateDocument></CreateDocument>
                <NameNewDocument></NameNewDocument>
                
              {/* {this.state.documents.map(document => (<Document name={document.name}> </Document>) )} */}
  
            </div>
        );
    }
}
 
export default Folder;