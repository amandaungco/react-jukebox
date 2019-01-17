import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import PlaylistList from './components/PlaylistList';
import Splash from './components/Splash';
import TracksView from './components/TracksView';
import axios from 'axios';
import moment from 'moment';


// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const URL = "http://127.0.0.1:8000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
      playlistList: '',
      playlistSongs: [],
    };

  }

  // const Main = ({children}) => {
  //     return (
  //         <div>
  //             {children}
  //         </div>
  //     );
  // };


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
          songList: songs
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
        console.log(response.data.items);
        const songs = response.data.items.map((song) => {
            return { ...song.track }
          });

        this.setState({
          playlistSongs: songs,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
          </ul>
          <SearchBar onSearchSubmitCallback={this.onSearchSubmit} />
          <TracksView songs={this.state.songList}/>
          <div>
            <TracksView
              songs={this.state.playlistSongs}
            />
          </div>
          <Route path="/" exact component={Index} />
          <Route path="/splash/" component={Splash} />
          <Route path="/playlist/" component={Playlist} />
        </div>
      </Router>
    );
  }
}

export default App;
