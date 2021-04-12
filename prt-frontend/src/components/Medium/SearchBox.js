import React, {Component} from "react";
import axios from "axios";

export default class SearchBox extends Component{
    constructor(props){
        super(props);

        this.inputClassName = props.inputClassName;
        this.refExpression = props.refExpression;
        this.placeholder = props.placeholder;
    }

    render(){
        return(
            <input
                className={this.inputClassName}
                ref={this.refExpression}
                placeholder={this.placeholder}
            >
            </input>
        );
    }
}