import { useEffect } from 'react';
import React from 'react'
import './App.css';
import SearchIcon from './search.svg';

//2d4a1de1

const API_URL = 'http://www.omdbapi.com?apikey=2d4a1de1';
const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data);
  }

  useEffect(() => {
    searchMovies('spy')
  }, [])
  return (
    <div className='app'>
      <h1>DMovies</h1>
      <div className='search'>
        <input placeholder='searh for movies' />
      </div>
    </div>
  )
}

export default App