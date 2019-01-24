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

    // this.handleTypeChange = this.handleTypeChange.bind(this);
    // this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  onSearchSubmit = (event) => {
    event.preventDefault()
    this.props.onSearchSubmitCallback(this.state);
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


        {/*
        <div className="form-group">
          <label forhtml="search-type">Type</label>

          <select className="form-control" id="type" value={this.state.type} onChange={this.handleTypeChange}>

            <option value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="playlist">Playlist</option>

          </select> }

        </div>
        */}
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
