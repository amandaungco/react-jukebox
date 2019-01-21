import React from 'react';
import UserDetails from '../UserDetails';
import SearchBar from '../TrackSearch';
import './Header.css';

const Header = () => {

  return(
    <div className='header'>
      <SearchBar/>
      <UserDetails />
    </div>
  );
};

export default Header ;
