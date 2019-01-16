import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import './Splash.css';
const URL = "http://127.0.0.1:8000/";

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


  render() {
    return (
      <div>
        <h1>Splash Page</h1>
        <a href="http://127.0.0.1:8000/callback/">Host Party</a>
        <button onClick={this.onClickJoinRoom} className="button" type="button">Join Party</button>
      </div>
    );
  }
}

// Splash.propTypes = {
//
// };

export default Splash;
