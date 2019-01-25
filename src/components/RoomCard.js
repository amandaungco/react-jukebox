import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {URL} from '../constant'
import './RoomCards.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './RoomForm.css';

class RoomCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
    };
  }


  render() {
    return (
      <aside className="setPlaylist-module">
        <h6 className="setPlaylist-module__header">Set Playlist:</h6>
        <div className="row">
          <div className="col-4 setPlaylist-module__movie">
            { typeof(this.state.currentPlaylist) !== 'object' ?
              <div className="setPlaylist-module__image--placeholder">
                 <Link to="/playlist/">Select Playlist</Link>
              </div> :
              <img
                src={this.state.currentPlaylist.images[0].url}
                alt={this.state.currentPlaylist.name}
                className="setPlaylist-module__image"
              />
            }
          </div>
          <div className="col-8">
            Room Code:<br />
            { this.state.roomCode ?
              <strong>{this.state.roomCode.toUpperCase()}</strong> :
              <Link to="/playlist/">Select Playlist <i className='fa fa-compact-disc'/></Link>
            }
            <hr/>
            <button className="btn btn-green" onClick={() => {this.onEndParty()}}>
              End Party
            </button>
          </div>
        </div>
      </aside>

    );
  }
}

RoomCards.propTypes = {
  enterRoomCallback: PropTypes.func

};

export default RoomCards;
