import React, { Component} from "react";
import "./CoreValuesButton.css";
import Button from "react-bootstrap/Button";
import Fade from 'react-reveal/Fade';
// import 'node_modules/motion-css-animation/main';


export default class CoreValues extends Component{
    constructor(props){
        super(props);
        this.state = {
          company: localStorage.getItem('company'),
          coreValues: ["Teamwork","Leadership","Passion", "Collaboration"]

      }
    }
    load(values){
      var strin = {backgroundColor:"rgb(" + [values.charCodeAt(0)*2,values.charCodeAt(1)*2,values.charCodeAt(2)/122*255].toString() + ")"};

      return (
        <div className = "corevalue">
        {/* <Fade left> */}
          <button className = "fade-in" style = {strin}>
            <strong><center class = "hi">{values} </center> </strong>
          </button>
        {/* </Fade > */}
        </div>
      )
    }
  render(){
    return (
      
        <div>
            {this.state.coreValues.map(this.load)}
        </div>
        
    );
    }

}


