import React, {Component } from 'react';

class Document extends Component {
    state = { 
        name:"CSE 442"
      }
    
    documentStyle = {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        width: "160px",
        margin: "20px 20px 20px 20px"
    }
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
        padding: "32px 4px 24px 4px"
    }
    hamburgerStyle = {
        alignSelf: "flex-end",
        width: "1.3rem",
        height: "1.3rem"
    }
    nameStyle = {
       fontSize: "28px",
       fontWeight: 700,
       lineHeight: "16px"
    }
    imageStyle = {
        width: "120px",
        height: "120px"
    }
    render() { 
        return (
            <div className = "document" style={this.documentStyle}>
                <div className = "card" style={this.cardStyle}>  
                    <img src={require("./file.svg")} alt="document image" style={this.imageStyle}  />
                    <img style = {this.hamburgerStyle} src={require("./hamburger.svg")} alt="" />
                </div>
                <h1 style = {this.nameStyle}>{this.state.name}</h1>
            </div>
        );
    }
}
 
export default Document;