// if the user is logged in, allow them to do whatever

// if not logged in, redirect to the login page

import React, { Component } from "react";
// import { Input, TextArea, FormBtn } from "./../components/Form";
// import API from "./../utils/API.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css';

class Home extends Component {
  
    render() {
        return (
            <div>
                {/* <a href="/login">CLICK HERE to see login options</a>
                <br></br>
                <a href="/form">CLICK HERE to go straight to the meeting form</a>
                <br></br>
                <a href="/meetings">CLICK HERE to see all the meetings</a>
                <br></br>
                <a href="/users">CLICK HERE to see all the users</a> */}


                <div className="container-fluid">
                  <h1>Encontro</h1>
                  <div className="jumbotron jumbotron-1 ">
                    <h2>Join Meeting</h2>                  
                        <button type="button" className="btn btn-join">→</button>                   
                   </div>
                  <div className="jumbotron jumbotron-2">
                    <h2>Create Meeting</h2>                    
                        <button type="button" className="btn btn-create">+</button>                  
                  </div>
                </div>

            </div>
      );
    }
  }

export default Home;