import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative h-80 w-56 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <div className="absolute top-0 left-0 p-4 text-yellow-300 opacity-0 hover:opacity-100 transition-opacity">
        <p>{movie.release_date}</p>
      </div>
      <div className="h-80 w-56">
        <img
          src={
            movie.poster !== "N/A"
              ? movie.poster
              : "https://via.placeholder.com/400"
          }
          alt="movieposter"
          className="h-full w-full rounded-md"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-yellow-400">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
