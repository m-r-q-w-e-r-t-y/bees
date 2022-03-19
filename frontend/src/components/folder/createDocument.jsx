import React, { Component } from 'react';
class CreateDocument extends Component {
    state = {  }
    cardStyle = {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "220px",
        width: "150px",
        backgroundColor: "white",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.25)",
        margin: "48px 24px 48px 24px",
        padding: "32px 4px 24px 4px",
        cursor: "default"
    }
    imageStyle = {
        width: "120px",
        height: "120px"
    }
    handleHover = () => {
        this.cardStyle.cursor = "pointer";
        this.setState();
        console.log(this);
    }
    handleClick(){

    }
    render() { 
        return (
            <div className='createDocumentCard' style = {this.cardStyle} onMouseEnter = {this.handleHover}>
                <img src={require("./newFile.svg")} style = {this.imageStyle} alt="" />
            </div>
            
        );
    }
}
 
export default CreateDocument;