import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import PlaylistList from './components/PlaylistList';
import Splash from './components/Splash';
import TracksView from './components/TracksView';
import MainSection2 from './components/MainSection2'
import RoomForm from './components/RoomForm'
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
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }




  render() {
    const Index = () => <h2>Home</h2>;
    const Playlist = () => <PlaylistList getPlaylistSongs = {(playlist) => this.getPlaylistSongs(playlist)}/>;

    // const playlistTracks = this.state.playlistSongs.map((track) => {
    //   console.log(track)
    //   return
    // })

    let name = "Jukebox"
    return (
      <Router>
        <div className="App .bg-dark">
          <div className='header'>
            <SearchBar onSearchSubmitCallback={this.onSearchSubmit} />
          </div>
          <h1>{name}</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/splash/">Splash</Link>
            </li>
            <li>
              <Link to="/playlist/">Playlists</Link>
            </li>
            <li>
              {this.state.roomCode}
            </li>
          </ul>
            {typeof(this.state.currentPlaylist) !== 'object' ? (null) : (<MainSection2 playlist={this.state.currentPlaylist} setPlaylist = {(playlist) => this.setPlaylist(playlist)} />)}
           {this.state.songList.length === 0 ? (null): (<TracksView songs={this.state.songList} addSong={(song) => this.addSong(song)}/>)}
          <div>
            <TracksView
              songs={this.state.playlistSongs}
            />
          </div>
           {/*<RoomForm />*/}
          <Route path="/" exact component={Index} />
          <Route path="/splash/" component={Splash} />
          <Route path="/playlist/" component={Playlist} />
        </div>
      </Router>
    );
  }
}

export default App;
