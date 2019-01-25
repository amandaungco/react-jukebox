import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      type: 'track',
    };
  }
  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  }

  resetState = () => {
    this.setState({
      searchValue: '',
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchSubmitCallback(this.state);
    this.resetState();
  }



  render() {
    return (
      <div className='track-search-container d-flex'>
        <form onSubmit={this.onSearchSubmit} className="p-1 bd-highlight">

            <input
              onChange={this.handleSearchChange}
              value={this.state.searchValue}
              name="searchValue"
              className="search-bar cu-search-input"
              placeholder="Search..."
              id ="Search"
            />
          <button onClick={this.onSearchSubmit}>
            <i className="fa fa-search search" aria-hidden="true"/>
          </button>
        </form>
        <div className="ml-auto">
          <h2 id="logo">JUKEBOX</h2>
        </div>
      </div>

    );
  }
}

SearchBar.propTypes = {
  onSearchSubmitCallback: PropTypes.func,
};

export default SearchBar;
