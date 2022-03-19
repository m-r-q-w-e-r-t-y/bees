import React from "react";
import { useNavigate } from "react-router-dom";

const Folder = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')
    };

    return (
        <div>
            <h1>This is the folder page</h1>
            <h1>You are here because you are user</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
export default Folder;

/*
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
*/