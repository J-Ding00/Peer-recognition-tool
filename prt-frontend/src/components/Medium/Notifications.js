import React, { Component} from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { BiBell } from 'react-icons/bi';
import {SignOutIcon, BellIcon  } from '@primer/octicons-react'
import './Notifications.css';

import axios from 'axios';


export default class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
          newNotifications: 4,
          elements: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateNotifications = this.updateNotifications.bind(this);
        console.log(this.props)
    }
    
    componentDidMount() {
      axios.get('http://localhost:3001/notifications', { withCredentials: true })
          .then((res) => this.updateNotifications(res));
    }

    updateNotifications(res) {
      // res.body is [
      //   {
      //     message: "a was recognized by god",
      //     arrivalTime: Date.now(),
      //     recognitionID: "23dfvhaosdgaeorghafb"
      //   },
      // ]

     


      // set this.state.newNotifications = length of res.body
      // for each notification object in res.body
      //    add a notification to the dropdown

      this.setState({
        newNotifications: res.data.length,
        elements: res.data.flatMap((notification) => {
          return [
            <Dropdown.Item href="#/mention">{notification.message}<p>{notification.arrivalTime}</p> </Dropdown.Item>,
            <Dropdown.Divider/>
          ];
        })
      });
    }

    CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button class = "notificationButton jelly"
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
            this.setState((state)=>{return{newNotifications:0}});
            this.componentDidMount();
          }}
        >
          {children}
        </button>
      ));
      
    render() {
        let badge = null;
        if(this.state.newNotifications > 0){
            badge =<span class="badge badge-pill x2">{this.state.newNotifications}</span>;
        }
        return (
        <Dropdown>
            <Dropdown.Toggle as={this.CustomToggle}>
                <BiBell size = {30}/>  
                {/* <BellIcon size={30}/> */}
                {badge}
            </Dropdown.Toggle>  
            
            <Dropdown.Menu> 
            <Dropdown.Header>Notifications</Dropdown.Header>
              {this.state.elements}
            </Dropdown.Menu>
        </Dropdown>
        );
      }
}

