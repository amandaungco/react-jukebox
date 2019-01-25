import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import './MainSection2.css';

const MainSection2 = props => (

      <div className='d-flex flex-row bd-highlight pb-3 mb-3 trackList_Header'>
          <div className='pr-4 pl-4'>
            <img className='playlist-art'src={props.playlist.images[0].url} alt="" />
          </div>
          <div className='pr-4'>
            <p className='playlist-text'>PLAYLIST</p>
            <p className='header-title'>{props.playlist.name}</p>
            <h4 className='created-by'>By <span className='lighter-text'>{props.playlist.owner.display_name}</span></h4>
            <p>{props.playlist.tracks.total} Songs</p>
            <button className="btn btn-green" onClick= {() => props.setPlaylist(props.playlist)}>Set Playlist</button>
          </div>
      </div>
)

MainSection2.propTypes = {
  playlist: PropTypes.object,
  setPlaylist: PropTypes.func,

};


export default MainSection2;
