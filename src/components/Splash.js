import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {URL} from '../constant'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import NewRoomForm from './NewRoomForm.js'
import './Splash.css';


class Splash extends Component {

  onClickLogin = () => {
    axios.get(URL + "callback/")
      .then((response) => {
          console.log(response);
      })
      .catch((error) => {

      })
  }

  onClickJoinRoom() {
    console.log('The Join Room was clicked.');
  }

  enterRoomCallback = (newRoomCode) => {
    console.log(newRoomCode);
    this.props.enterRoomCallback(newRoomCode)
  }

  render() {
    const Form = () => <NewRoomForm enterRoomCallback = {(newRoomCode) => this.enterRoomCallback(newRoomCode)}/>;
    return (
      <div>
        <div className= 'row justify-content-center'>
          <button className="button"><a className= "button" href={`${URL}callback/`}>Host Party</a></button>
        </div>
        <div className= 'row justify-content-center'>
          <button onClick={this.onClickJoinRoom} className="button" type="button"><Link to="/form/">Join Party</Link></button>
        </div>
      </div>

    );
  }
}

Splash.propTypes = {
  enterRoomCallback: PropTypes.func
};

export default Splash;
