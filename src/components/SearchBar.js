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

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
    console.log(this.state.type);
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    console.log(this.state.searchValue);
  }

  onSearchSubmit = (event) => {
    console.log(event)
    event.preventDefault()
    this.props.onSearchSubmitCallback(this.state);

  }



  render() {
    return (
      <section className='track-search-container'>
        <form onSubmit={this.onSearchSubmit}>
        <input
          onChange={this.handleSearchChange}
          value={this.state.searchValue}
          name="searchValue"
          className="search-bar cu-search-input"
          placeholder="Search..."
        />
        <div className="form-group">
          <label forhtml="search-type">Type</label>
          <select className="form-control" id="type" value={this.state.type} onChange={this.handleTypeChange}>

            <option value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="playlist">Playlist</option>

          </select>
        </div>
        <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

SearchBar.propTypes = {
  onSearchSubmitCallback: PropTypes.func,
};

export default SearchBar;
