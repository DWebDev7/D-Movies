import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./search.svg";

// Use HTTPS to avoid mixed content errors
const API_URL = "https://www.omdbapi.com?apikey=2d4a1de1";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]); // Clear movies if none found
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Clear movies on error
    }
  };

  useEffect(() => {
    searchMovies("spy"); // Initial movie search
  }, []);

  return (
    <div className="app">
      <h1>DMovies</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
