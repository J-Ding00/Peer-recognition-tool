//this file is where the program disply the input common on the screen
//file include the area text bar and the submit button at the buttom right corner
//flip move is a animation libary under react

//this file using a empty array take all the input and assign them a unique key
//using the items.map(this.createTasks), map take the element from items one by one and pass into createTasks(item)
//createTasks(item) this function will retuen one by one base the the unique key
import React, { Component } from "react";
import SearchBox from "../Medium/SearchBox.js"
import "./UserPostLayOut.css";
import AwardsButton from "./AwardsButton";
import CommentButton from "../Small/CommentButton";
import shrek from "../Other/shrek.jpeg";
import p1 from "../Other/p1.jpg";
import p2 from "../Other/p2.jpg";
import p3 from "../Other/p3.jpg";
import p4 from "../Other/p4.jpg";
import marius from "../Other/marius.JPG";
import { CpuIcon, PaperAirplaneIcon, SquirrelIcon } from '@primer/octicons-react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from 'react-reveal/Fade'; //fade animation
import CoreValuesButton from "./CoreValuesButton";
import "./CoreValuesButton.css";



export default class UserPostLayOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username'), //call username from localstorage
            fullName: localStorage.getItem('fullName'),
            cid: localStorage.getItem('cid'), //company id
            employeeID: localStorage.getItem('employeeID'),
            recognition: '',
            items: [], //the empty array is for getting the input from the textarea
            showCoreValue: false,

            pic: '',//
            recognizedName: '',//
        };
        console.log(this.state.cid);
        console.log(props)
        this.addItem = this.addItem.bind(this);
        this.createTasks = this.createTasks.bind(this);
        this.showCVB = this.showCVB.bind(this);
        this.hideCVB = this.hideCVB.bind(this);
    }

    componentDidMount() {
        this.updateFeed();
    }

    getUserFromID(employeeId) {
        var result;
        axios.post('http://localhost:3001/lookupUser', { id: employeeId }, { withCredentials: true })
            .then((result) => function (result) {
                return result['1'].data.firstName + " " + result['1'].data.lastName;
            });
    }
    updateUsers(res, callback) {
        for (var i = 0; i < Object.keys(res.data).length; i++) {
            res.data[i]["giver"] = this.getUserFromID(res.data[i]["reco"].giverID);
            console.log(this.getUserFromID(res.data[i]["reco"].giverID))

            res.data[i]["receiver"] = this.getUserFromID(res.data[i]["reco"].receiverID);
        }
        console.log(res.data[1]["giver"])
    }

    updateFeed() {
        axios.get("http://localhost:3001/recogs", {withCredentials: true})
            .then(res => this.updateFeedHelper(res));
    };

    updateFeedHelper(res){

        for (var i = 0; i < Object.keys(res.data).length; i++) {
            var newItem = {
                fullName: res.data[i].giverName,
                recognized: res.data[i].receiverName,
                text: res.data[i].message,
            };

            this.setState((prevState) => {
                return {
                    items: [newItem].concat(prevState.items)
                };
            });
        }
    }

    addItem(e) { //add recognition to database
        console.log(this._recognized.value);

        if (this._recognition.value !== "") {
            var newItem = {
                companyID: parseInt(this.state.cid),
                giverID: this.state.employeeID,
                receiverID: -1, //todo: set this to real person
                value: [],
                message: this._recognition.value,
                giverName: this.state.fullName,
                receiverName: this._recognized.value,
            };

            axios.post('http://localhost:3001/postRec', newItem, { withCredentials: true })
                // .then((res) => console.log(res.data));
                .then(res => this.updateFeed());
        }

        this._recognized.value = "";
        this._recognition.value = "";
        e.preventDefault(); //prevent refreash page
    }

    createTasks(item) { // Create element from item
        var profilePics = Math.floor(Math.random() * 7); //
        // console.log(profilePics);
        this.state.recognizedName = item.recognized;//
        if (profilePics === 0) {//
            this.state.pic = <img class="profilePictures" src={marius} />
            this.state.recognizedName = "Marius";
        }
        else if (profilePics === 1) {//
            this.state.pic = <img class="profilePictures" src={shrek} />
            this.state.recognizedName = "Shrek";
        }
        else if (profilePics === 2)//
            this.state.pic = <img class="profilePictures" src={p1} />
        else if (profilePics === 3)//
            this.state.pic = <img class="profilePictures" src={p2} />
        else if (profilePics === 4)//
            this.state.pic = <img class="profilePictures" src={p3} />
        else if (profilePics === 5)//
            this.state.pic = <img class="profilePictures" src={p4} />


        return <Fade left>
                <li key={item.key}>
                    <Container>
                        <Row className="postHeader" style={{ fontSize: "20px" }}>
                            <right>
                                {this.state.pic}  
                                {/*<strong> {item.recognized} </strong>*/} 
                                <strong> {this.state.recognizedName} </strong>{/* */}
                                    received a recognition from
                                <strong> {item.fullName}</strong>
                            </right>
                        </Row>

                        <div className='postLineH'></div>

                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

                            <Card.Text className="commentArea">
                                {item.text}
                            </Card.Text>
                        </Card.Body>

                        <div className='postLineH'></div>

                        <div className="postFooter">
                            <Row >
                                &nbsp;
                                <Col>
                                    <CommentButton />
                                </Col>

                                <Col>
                                    <AwardsButton />  
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </li>
            </Fade>
    }

    postList() {
        return this.state.items.map(this.createTasks)
    }

    showCVB(){
        this.setState({ showCoreValue: true });
        
    }
    hideCVB(){
        this.setState({ showCoreValue: false });
    }
    

    postArea() { // Form for posting a recognition
        const {showCoreValue} = this.state;
        return <div className="recognition">
            <form className="post" onSubmit={this.addItem}>
                <SearchBox
                    inputClassName="recognitionFor"
                    refExpression={(a) => this._recognized = a}
                    placeholder="who are you recognizing"
                    >   
                </SearchBox>

                <div className='line'></div>

                <textarea className="box" ref={(a) => this._recognition = a}
                    placeholder="recognition"
                    onClick={() => this.showCVB("showCoreValue")}>
                </textarea>

                <button type="submit" className = "squre" onClick={() => this.hideCVB("showCoreValue")}>
                    <SquirrelIcon size={25} />
                </button>

                <div className ={this.state.showCoreValue? "visible":"hidden"} >
                <CoreValuesButton/>
                </div>
               {/* {showCoreValue && <CoreValuesButton />} */}
               

            </form>
        </div>
    }

    render() {
        return (
            <div className='todoListMain'>
                {this.postArea()}
                <ul className="thisList">
                    {this.postList()}      
                </ul>
               
            </div>

        )
    }
}