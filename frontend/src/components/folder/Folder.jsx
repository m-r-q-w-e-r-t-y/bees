import React, { Fragment } from "react";
import { Component } from "react";
import "./folder.css"
import CreateDocumentCircle from "./createDocumentCircle";
import CreateDocument from "./createDocument";
import Document from "./document";
import Menu from "./menu.jsx"
import NameNewDocument from "./nameNewDocument";
import NavBar from "../navBar/NavBar";
class Folder extends Component {

    constructor(props) {
        super(props);
        this.createDocumentHandler = this.createDocumentHandler.bind(this);
        this.cancelNaming = this.cancelNaming.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.renameDocument = this.renameDocument.bind(this);
        this.removeDocument = this.removeDocument.bind(this);
    }
    state = {  
        documents: [],
        renaming: "false"
    };


    prependDocument(name){
        this.setState(this.state.documents.unshift({name})) // this is going into this.state -> documents -> {prepending a document}. 
    }
    removeDocument(name){
        this.setState({
            documents: this.state.documents.filter(document => document != name )
        })
    }
    createDocumentHandler(){
        this.setState({
            renaming:"true"
        })
    }
    cancelNaming(){
        this.setState({
            renaming:"false"
        })
    }
    addDocument(documentName){
        this.setState({
            documents: this.state.documents.concat([documentName])
        })
    }
    

    renameDocument(oldName, newName){
        if(this.state.documents.includes(oldName)){
            let index = this.state.documents.indexOf(oldName);
            this.state.documents[index] = newName;
            this.setState({
                documents: this.state.documents 
            })
        }
    }
    renderDocuments(){
        if(this.state.documents.length === 0){
            return(
                <CreateDocument handler={this.createDocumentHandler}> </CreateDocument>
            )
        }
        else{
            return(
                <>
                    {this.state.documents.map(document => (<Document removeHandler = {this.removeDocument} renameHandler = {this.renameDocument} name={document}> </Document>) )}
                    <CreateDocumentCircle handler = {this.createDocumentHandler}></CreateDocumentCircle>
                </>
            )
        }

    }
    renderNaming(){
        if(this.state.renaming === "true"){
            return <NameNewDocument cancelHandler = {this.cancelNaming} addDocumentHandler = {this.addDocument}></NameNewDocument>
        }
    }
    render() { 
        return (
            <>
                <NavBar />
                <div className = "folder" >
                    {this.renderDocuments()}
                    {this.renderNaming()}
                </div>
            </>
        );
    }
}
 
export default Folder;