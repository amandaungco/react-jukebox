# react-jukebox

## REACT - JUKEBOX
This project will connect with a django backend to use the spotify API to help user collaborate on a single spotify playlist.
## Motivation

Have you ever had a song request that you want your friends to play but couldn't do it because the phone connected to the speaker was locked? Or maybe you needed to download an application, well with Jukebox you can collaborate on a single spotify playlist to queue up the next song!

This is a Capstone project for [Ada Developers Academy](https://www.adadevelopersacademy.org/).

See the React front end hosted on Heroku, [Ada Jukebox](https://ada-jukebox.herokuapp.com/).
 
## Screenshots
* <b>Mobile:</b>     

![Login Screen](/public/images/capstone_login.png?raw=true)<!-- .element height="50%" width="50%" --> ![Playlist_List](/public/images/capstone_playlistList.png?raw=true) ![Playlist](/public/images/capstone_playlist.png?raw=true) ![Set_Playlist](/public/images/capstone_setPlaylist.png?raw=true)


## Tech/framework used
<b>Built with</b>
- [React](https://reactjs.org/) (This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).)
- [Django/Python](https://www.djangoproject.com/)
- [PostgreSQL](https://www.postgresql.org/)


## Features
By having one user login they can share a room-code with friends to enter on the same url and they will be able to contribute to a single playlist

## Installation
To download and edit this project:

1) Clone this repository:
```
git clone https://github.com/danimetz/react-jukebox.git
```
2) In the project directory, you can install dependencies:
```
npm install
```
3) In the project directory, you can run:
```
npm start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

4) In order to get full functionality the backend API will need to also be cloned and running, please see [Jukebox_API](https://github.com/danimetz/Jukebox_API)

## How to use?
* To be a Host
  * Click Host Party button or Login with Spotify button to login as the host.
  * The page will be redirected to Spotify where the user will use their spotify credentials to login.
  * Once redirected back to the home page of the web-app the user can select "Playlists".
  * All the users Spotify playlists will load.
  * Any of the plalists can be clicked to view the songs in the playlist.
  * Once the desired playlist has been found you can set the playlist by clicking the "Set Playlist" button. 
  * A room code will generate and pop up in the bottom right corner of the screen. 
  * Pass out the code to guests and they can login to add music to the playlist!
* To be a Guest
  * Login by typing in the Room Code for a given party playlist.
  * Search songs by typing songs in the search bar and clicking the search icon.
  * Click the plus sign next to a song to add it to the party playlist, the song will disappear from the search results once it has been successfully added
  * Keep searching and adding songs to the playslist!


## Credits
Icons made by [Material](https://material.io/) from [Icons - Material Design](https://material.io/tools/icons/?style=baseline), licensed by [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html), 

