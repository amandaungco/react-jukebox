import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './PlaylistList.css';
import TracksView from './TracksView'
const URL = "http://127.0.0.1:8000/";

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
    console.log("Mounted");

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
    // const playlists = this.getPlaylists()
    return this.state.playlistList.map(playlist => {
      // const getPlaylistSongs = (id) => {
      //   console.log(id);
      //   axios.get(URL + "playlist/", {
      //     withCredentials: true,
      //     params: {
      //       playlist_id: id, // value.q,
      //     },
      //     headers: {'X-spotify-token': 'BQDpHI3z5kwrRIe7vVQ9-RdiGeTG2pSEqDqiEoILzI_deBHf1mkxWgU1kx5UxhabPH6iSNbSHPwdsAOvovLBgBnz7K4qcfvo8tU42ykf0Jocbso4v5UA37LEyMNyS80zY30U8mOd4i0qM0v5Yuq7VRd5xSXrdkqCsVd-AwtlfY86eYsSrSkfP76Q5Z7H'},
      //   }
      //     )
      //     .then((response) => {
      //       const songs = response.data.items.map((song) => {
      //           return { ...song }
      //         });
      //
      //       this.setState({
      //         songs: songs,
      //       });
      //       console.log(songs);
      //     })
      //     .catch((error) => {
      //       this.setState({
      //         errorMessage: error.message,
      //       });
      //     });
      // }
      return (
        <tr onClick= {() => this.props.getPlaylistSongs(playlist)} key={ playlist.id }>
        { (playlist.images[0] !== undefined) ?
          <th scope="row"><img src={playlist.images[0].url} alt="Album Artwork"/></th> :
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
      // <div>
      //   {this.state.isReady ? this.renderPlaylists() : <div>Not Ready</div>}
      // </div>
    );
  }
}

PlaylistList.propTypes = {
  getPlaylistSongs: PropTypes.func,

};

export default PlaylistList;
