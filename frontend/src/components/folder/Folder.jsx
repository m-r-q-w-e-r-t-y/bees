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