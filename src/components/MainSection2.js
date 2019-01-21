import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MainSection.css';
const URL = "http://127.0.0.1:8000/";

const MainSection2 = props => (
      <div className='TrackListHeader row'>
            <div className='col-2'>
              <img src='https://i.scdn.co/image/760a3356c7be6c1dc2bb26e1f973ad225d61a45f' />
            </div>
            <div className='TracklistHeader__body'>
              <p className='playlist-text'>PLAYLIST</p>
              <h3 className='header-title'>Playlist Title</h3>
              <p className='created-by'>By <span className='lighter-text'>Danielle Metzner</span></p>
              <p>10 Songs</p>
              <button className="btn btn-green">Set Playlist</button>
            </div>
        </div>
)


export default MainSection2;
