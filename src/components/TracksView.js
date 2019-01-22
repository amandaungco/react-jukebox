import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


class TracksView extends Component {

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  renderSongs() {
    return this.props.songs.map((song, i) => {
      // const buttonClass = song.track.id === this.props.songId && !this.props.songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";
      return (
        <tr key={ i }>
          <th scope="row"><i onClick= {() => this.props.addSong(song)} className="fa fa-check" aria-hidden="true"/></th>
          <td>{song.name}</td>
          <td>{song.artists[0].name}</td>
          <td>{song.album.name}</td>
          <td className="d-none d-sm-table-cell">{moment(song.added_at).format('YYYY-MM-DD')}</td>
          <td>{this.msToMinutesAndSeconds(song.duration_ms)}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Album</th>
              <th scope="col" className="d-none d-sm-table-cell"><i className="fa fa-calendar-plus-o" aria-hidden="true"/></th>
              <th scope="col"><i className="fa fa-clock-o" aria-hidden="true" /></th>
            </tr>
          </thead>
          <tbody>
            { this.renderSongs() }
          </tbody>
        </table>
      </div>
    )
  }

}

TracksView.propTypes = {
  viewType: PropTypes.string,
  songs: PropTypes.array,
  playlist: PropTypes.object,
};

export default TracksView
