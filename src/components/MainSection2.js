import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MainSection2.css';
const URL = "http://127.0.0.1:8000/";

const MainSection2 = props => (
      <div className='d-flex flex-row bd-highlight pb-3 mb-3 trackList_Header'>
          <div className='p-4'>
            <img id='playlist-art'src='https://i.scdn.co/image/760a3356c7be6c1dc2bb26e1f973ad225d61a45f' />
          </div>
          <div>
            <p className='playlist-text'>PLAYLIST</p>
            <h3 className='header-title'>Playlist Title</h3>
            <p className='created-by'>By <span className='lighter-text'>Danielle Metzner</span></p>
            <p>10 Songs</p>
            <button className="btn btn-green">Set Playlist</button>
          </div>
      </div>
)


export default MainSection2;
