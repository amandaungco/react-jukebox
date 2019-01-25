import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import PlaylistList from './components/PlaylistList';
import Splash from './components/Splash';
import TracksView from './components/TracksView';
import MainSection2 from './components/MainSection2'
import NewRoomForm from './components/NewRoomForm'
import {URL} from './constant'
import axios from 'axios';
import moment from 'moment';


// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlaylist: '',
      songList: [],
      playlistList: [],
      playlistSongs: [],
      viewType: '',
      roomCode:'',
    };

  }


  onSearchSubmit = (value) => {
    this.getSearch(value);
  }

  getSearch = (value) => {
    console.log(value);
    if (this.state.roomCode === '') {
      axios.get(URL + "search/", {
        withCredentials: true,
        params: {
          q: value.searchValue, // value.q,
          type: value.type, //value.type,
        },
        headers: {'X-spotify-token': window.access_token},
      }
        )
        .then((response) => {
          const songs = response.data.tracks.items.map((song) => {
              return { ...song }
            });

          this.setState({
            songList: songs,
            playlistList: [],
            playlistSongs: [],
          });

          console.log(songs);
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
          });
        });
    } else {
      axios.get(URL + "search/", {
        withCredentials: true,
        params: {
          q: value.searchValue, // value.q,
          type: value.type, //value.type,
          room_code: this.state.roomCode,
        }
      }
        )
        .then((response) => {
          const songs = response.data.tracks.items.map((song) => {
              return { ...song }
            });

          this.setState({
            songList: songs,
            playlistList: [],
            playlistSongs: [],
          });

          console.log(songs);
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
          });
        });
    }

  }
  getPlaylistSongs = (playlist) => {
    axios.get(URL + "playlist/", {
      withCredentials: true,
      params: {
        playlist_id: playlist.id, // value.q,
      },
      headers: {'X-spotify-token': window.access_token},
    }
      )
      .then((response) => {
        const songs = response.data.items.map((song) => {
            return { ...song.track }
          });
        this.setState({
          currentPlaylist: {...playlist},
          playlistSongs: songs,
          playlistList: [],
          songList: [],
        });
        console.log('was the state set?');
        console.log(this.state.currentPlaylist);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  setPlaylist = (playlist) => {
    axios.post(URL + "playlist_save/",
      {
        playlistId: playlist.id, // value.q,
      }  ,
      {
      withCredentials: true,
      headers: {'X-spotify-token': window.access_token,
                'Content-Type': 'application/json'},
      }
      )
      .then((response) => {
        const playlistDB = response.data
        this.setState({
          roomCode: playlistDB.room_code,
        });

      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  addSong = (song) => {
    console.log(song)
    axios.get(URL + "add_track/", {
      withCredentials: true,
      params: {
        track_id: song.id,
        room_code: this.state.roomCode // value.q,
      },
    }
      )
      .then((response) => {
        console.log(response);
        const selectedTrack = this.state.songList.findIndex((track) => {
          return track.id === song.id
        });

        this.state.songList.splice(selectedTrack, 1)

        this.setState ({
          songList: this.state.songList,
        })
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  updateRoomCode = (newRoomCode) => {
    this.setState({
      roomCode: newRoomCode
    })
    axios.get(URL + "playlist/", {
      withCredentials: true,
      params: {
        room_code: newRoomCode,
      }
    }
      )
      .then((response) => {
        const songs = response.data.items.map((song) => {
            return { ...song.track }
          });
        this.setState({
          playlistSongs: songs,
          playlistList: [],
          songList: [],
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  onEndParty = () => {
    this.setState ({
      roomCode: ''
    })
  }




  render() {
    const Index = () => <h2>Home</h2>;
    const Playlist = () => <PlaylistList getPlaylistSongs = {(playlist) => this.getPlaylistSongs(playlist)}/>;
    const Form = () => <NewRoomForm enterRoomCallback = {(newRoomCode) => this.enterRoomCallback(newRoomCode)}/>;


    return (
      <Router>
        <div className="App .bg-dark">
            <SearchBar onSearchSubmitCallback={this.onSearchSubmit} />
          <div>
          {typeof(window.access_token)!=="undefined" && <ul>
            <li>
              <Link to="/playlist/">Playlists</Link>
            </li>
          </ul> }
            {typeof(this.state.currentPlaylist) !== 'object' ? (null) : (<MainSection2 playlist={this.state.currentPlaylist} setPlaylist = {(playlist) => this.setPlaylist(playlist)} />)}
           {this.state.songList.length === 0 ? (null): (<TracksView songs={this.state.songList} addSong={(song) => this.addSong(song)}/>)}
          <div>
            {typeof(this.state.currentPlaylist) !== 'object' ? (null) : (<TracksView
              songs={this.state.playlistSongs}
            />)}
          </div>
          {(this.state.roomCode !== '' || typeof(window.access_token)!=="undefined" ) && <NewRoomForm enterRoomCallback={(newRoomCode) => this.updateRoomCode(newRoomCode)} />}
          { (this.state.roomCode !== '') && <aside className="setPlaylist-module d-flex justify-content-end">
            {/*<h6 className="setPlaylist-module__header">Set Playlist:</h6>*/}
            <div>
              <div className="setPlaylist-module__code pl-2">
                Room Code:<br />
                { this.state.roomCode ?
                  <strong>{this.state.roomCode.toUpperCase()}</strong> :
                  <Link to="/playlist/">Select Playlist <i className='fas fa-compact-disc'/></Link>
                }
              </div>
            </div>
          </aside>}
          <Route path="/" exact component={Splash} />
          <Route path="/playlist/" component={Playlist} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
