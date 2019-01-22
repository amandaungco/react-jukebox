import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './RoomForm.css';

class RoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Thanks for joining the party!')
    event.preventDefault();
    this.props.enterRoomCallback(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="Room_Code">
            Room Code:
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
          <small id="passwordHelpBlock" class="form-text text-muted">
            Room code is only 6 Characters long e.g. "AAA123"
          </small>
          <input type="submit" className="form-control-lg" value="Submit" />
        </div>
      </form>
    );
  }
}

RoomForm.propTypes = {
  enterRoomCallback: PropTypes.func

};

export default RoomForm;
