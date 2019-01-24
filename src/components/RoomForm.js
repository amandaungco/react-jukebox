import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './RoomForm.css';
import Autotab from './Autotab.js'

class RoomForm extends Component {
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

    const newRoomCode = `${this.state.code1}${this.state.code2}${this.state.code3}${this.state.code4}${this.state.code5}${this.state.code6}`
    this.setState ({
      roomCode: newRoomCode
    })
  }

  handleInputChange = (e) => {
    const input = e.target.value;
    this.props.onChange(input);
  }

  handleTab = (e) => {
    const target = e.target;
    const input = target.value;
    if (input.length >= this.props.maxLength) {
      let next = target;
      next = next.nextElementSibling;
      while (next) {
        if (next === null) break;
        if (next.tagName.toLowerCase() === 'input') {
          next.focus();
          break;
        }
      }
    }
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
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code1"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code2"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code3"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code4"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code5"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
          <Autotab
            className="form-control"
            value={this.state.code1}
            name="code6"
            type="text"
            maxLength={1}
            hint="Enter a letter or number"
            onChange={this.onFormChange}
            autoFocus={true}
          />
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

RoomForm.propTypes = {
  enterRoomCallback: PropTypes.func

};

export default RoomForm;
