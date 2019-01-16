import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import PlaylistList from './components/PlaylistList';
import Splash from './components/Splash';

import axios from 'axios';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const URL = "http://127.0.0.1:8000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
      playlistList: '',
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
      headers: {'X-spotify-token': 'BQB3-CA06DnKM1YF_VViF-9HYG6bUbU_XFyxJjnuxMpDxTvJf1bZQHxY7La4m96OHrbRSb-EC-gIKslDqZotQjxb29SHLUVp4JPTR52qlLpWQgM4KYpPB6RVDbD0NWsmk-0sJoB3YTE1XDCHw1Nusi8wW9VaRmtkf1E0M5ixik-UtSUv2H7zqA-Qo9Lz'},
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




  render() {
    const Index = () => <h2>Home</h2>;
    const Login = () => <h2>Login</h2>;
    const Playlist = () => <PlaylistList />;

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
              <Link to="/splash">Splash</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/playlist/">Playlists</Link>
            </li>
          </ul>
          <SearchBar onSearchSubmitCallback={this.onSearchSubmit} />
          <SongList songs={this.state.songList}/>
          <Route path="/" exact component={Index} />
          <Route path="/splash/" component={Splash} />
          <Route path="/login/" component={Login} />
          <Route path="/playlist/" component={Playlist} />
        </div>
      </Router>
    );
  }
}

export default App;
