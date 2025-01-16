import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./search.svg";

//2d4a1de1

const API_URL = "https://www.omdbapi.com?apikey=2d4a1de1";

const App = () => {


  const [movies, setMovies] = useState([]);

  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spy");
  }, []);


  
  return (
    <div className="app">
      <h1>DMovies</h1>
      <div className="search">

        <input placeholder="searh for movies" 
        value={searchTerm} 
        onChange={(e) => setsearchTerm(e.target.value)} />

        <img src={SearchIcon} 
        alt="search"        
        onClick={() =>{searchMovies(searchTerm)}} />
      </div>

      
      {
        movies?.length > 0
          ?(
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )
      }

    </div>
  );
};

export default App;
