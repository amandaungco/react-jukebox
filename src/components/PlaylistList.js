import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PlaylistList.css';
import TracksView from './TracksView'
import {URL} from '../constant'


class PlaylistList extends Component {


  constructor(props) {
    super(props);

    this.state = {
      playlistList: '',
      errorMessages: '',
      songs: '',
      isReady: false,

    };
  }

  componentDidMount() {
    axios.get(URL + "playlists/", {
      withCredentials: true,
      headers: {'X-spotify-token': window.access_token},
    }
      )
      .then((response) => {
        const playlists = response.data.items.map((playlist) => {
            return { ...playlist }
          });

        this.setState({
          playlistList: playlists,
          isReady: true
        });
        console.log(this.state.playlistList);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });


  }



  renderPlaylists() {
    return this.state.playlistList.map(playlist => {

      return (
        <tr onClick= {() => this.props.getPlaylistSongs(playlist)} key={ playlist.id }>
        { (playlist.images[0] !== undefined) ?
          <th scope="row"><img src={playlist.images[0].url} alt="Album Artwork" className='playlist-icon'/></th> :
          <th scope="row"></th>
        }
          <td>{ playlist.name }</td>
          <td>{ playlist.tracks.total}</td>
        </tr>
      );
    });
  }





  render() {
    return (

      <div className='user-playlist-container'>
        <h3 className='user-playlist-header'>Playlists</h3>
        {this.state.isReady &&
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Playlist Name</th>
                <th scope="col">Tracks</th>
              </tr>
            </thead>
            <tbody>
              {this.renderPlaylists()}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

PlaylistList.propTypes = {
  getPlaylistSongs: PropTypes.func,
  getPlaylist: PropTypes.func,

};

export default PlaylistList;
