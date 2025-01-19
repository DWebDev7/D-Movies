import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard.jsx";
import "./App.css";
import "./index.css";
import SearchIcon from "./search.svg";

// TMDb API
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "47485daddf0d4fc629525be346309c39";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the most recent blockbuster movies
  const fetchBlockbusterMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_date.gte=2023-01-01&vote_average.gte=7.5`
      );
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching blockbuster movies:", error);
      setMovies([]);
    }
  };

  // Search movies based on a title (or fetch blockbusters if no title is given)
  const searchMovies = async (title) => {
    if (!title) {
      return fetchBlockbusterMovies(); // Fetch blockbusters if no search term
    }

    try {
      const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          title
        )}`
      );
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchBlockbusterMovies(); // Fetch the latest blockbuster movies on initial load
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-transparent bg-clip-text text-transparent">
        DMovies
      </h1>
      <div className="flex items-center bg-gray-800 rounded-full shadow-lg p-4 mt-8 w-5/6 md:w-1/2">
        <input
          type="text"
          className="flex-grow bg-transparent outline-none text-lg text-gray-300"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          className="w-8 h-8 cursor-pointer"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={{
                title: movie.title,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null,
                release_date: movie.release_date,
                overview: movie.overview,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center">
          <h2 className="text-xl text-yellow-300">No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
