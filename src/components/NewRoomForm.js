import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './RoomForm.css';

class NewRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
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

      <form onSubmit={this.handleSubmit}>
      <label htmlFor="Room_Code">
        Room Code:
      </label>
        <div className='row'>
          <div className="form-group col-2">
            <input type="text" value={this.state.roomCode} onChange={this.onFormChange} name="roomCode" className="form-control" maxLength={6} pattern="^[a-zA-Z0-9]{6}" />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" className="form-control-md" value="Submit" onSubmit={this.handleSubmit}/>
        </div>

        <small id="passwordHelpBlock" className="form-text text-muted">
          Room code is only 6 Characters long e.g. "AAA123"
        </small>
      </form>

    );
  }
}

NewRoomForm.propTypes = {
  enterRoomCallback: PropTypes.func

};

export default NewRoomForm;
