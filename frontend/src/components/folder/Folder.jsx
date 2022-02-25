import React from "react";
import CreateDocument from "./createDocument";
import Document from "./document";

class Folder extends Component {
    state = {  
        documents: [
            {id: 1, name:"CSE442"},
            {id: 2, name:"CSE116"}
        ]
    } 
    render() { 
        return (
            <div className = "folder">
                {this.state.documents.map(document => (<Document key = {document.id} name = {document.name}> </Document>) )}
            </div>
        );
    }
}
 
export default Folder;