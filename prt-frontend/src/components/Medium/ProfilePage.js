
import React, { Component } from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import profilePic from "./genericProfilePicture.jpeg";
import './ProfilePage.css';
import axios from 'axios';
import { AiOutlineConsoleSql } from "react-icons/ai";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);



    this.state = {
        username: localStorage.getItem('fullName'), 
        email: localStorage.getItem('email'),
        company: localStorage.getItem('company'),
        position: localStorage.getItem('position')
    }
  } 



  componentDidMount() {
    this.setState((state) => ({
      username: state.username,
      email: state.email,
      company: state.company,
      position: state.position,
    }));
    console.log(this.state.username)
  }


  profile(){
    return <div class = "relative"> 
            <div class= "entireProfile">
              <div class = "fade-in"> 
                <div className= "profile">       
                  <div className = "profUserInfo">

                      <div className = "profileHeader">   
                        <p id= "name"><strong>{this.state.username}</strong></p>
                      </div>

              
                        <p class = "info" ><strong>Email: </strong><i> {this.state.email}</i> </p>
                        <p class = "info" ><strong>Company: </strong>{this.state.company} </p>
                        <p class = "info"> <strong>Position: </strong>{this.state.position} </p>
         

              {/* <div className="details">
                <p class="info" ><strong>Email: </strong><i> {this.state.email}</i> </p>
                <p class="info" ><strong>Company: </strong>{this.state.company} </p>
                <p class="info"> <strong>Position: </strong>{this.state.position} </p>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  }

  handleShow = () => { //this is for the post button for open the textarea 
    this.setState({
      isActive: !this.state.isActive
    })
    console.log(this.state.isActive)
  }

  render() {
    return (
      <div>
        {this.state.isActive && this.profile()}
        <button class="open" onClick={this.handleShow}></button>
      </div>
    );
  }

}