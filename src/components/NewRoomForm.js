import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {URL} from '../constant'
import './NewRoomForm.css';
// import './RoomForm.css';

class NewRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
    };
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const updatedState={};
    updatedState[field] = value

    this.setState(updatedState)

    // const newRoomCode = `${this.state.code1}${this.state.code2}${this.state.code3}${this.state.code4}${this.state.code5}${this.state.code6}`
    // this.setState ({
    //   roomCode: newRoomCode
    // })
  }

  handleSubmit = (event) => {
    // alert('Thanks for joining the party!')
    event.preventDefault()
    this.props.enterRoomCallback(this.state.roomCode)

  }

  render() {
    return (
      <div className="p-5">
      <form className="text-center border border-light p-5 roomForm" onSubmit={this.handleSubmit}>
        <p className="h4 mb-4">
          Enter Room Code
        </p>
        <div className="form-group mb-4">
          <input type="text" value={this.state.roomCode} onChange={this.onFormChange} name="roomCode" className="form-control" maxLength={6} pattern="^[a-zA-Z0-9]{6}" />
        </div>
        <small id="passwordHelpBlock" className="form-text text-muted mb-4">
          Room code can only be letters or numbers e.g. "AAA123"
        </small>
        <div className="form-group">
          <input type="submit" className="form-control" value="Submit" onSubmit={this.handleSubmit}/>
        </div>
        <p>Want to host? <a href={`${URL}callback/`}>Login to Spotify <i className='fa fa-spotify'/></a></p>
        </form>
      </div>

    );
  }
}

NewRoomForm.propTypes = {
  enterRoomCallback: PropTypes.func

};

export default NewRoomForm;
