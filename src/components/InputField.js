import React, { Component } from 'react';
import Autotab from './Autotab';

class InputField extends Component {


  handleChange(response) {
    console.log(response);
  }

  render() {
    return (
      <Autotab
        name="code1"
        type="text"
        maxLength={1}
        hint="Enter a letter or number"
        onChange={this.handleChange}
        autoFocus={true}
      />
    )
  }
}

export default InputField;
