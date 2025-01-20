import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div className="w-56   overflow-hidden transform transition-transform ease-in-out hover:-translate-y-4 duration-300">
        <div>
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto rounded-sm shadow-lg"
            />
            ) : (
              <div className="w-full h-64 bg-gray-700 shadow-sm rounded-sm flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-200">{movie.title}</h3>
          <div className="text-sm text-gray-200">
            {movie.release_date.length > 4 ? (
              // Calculate the year outside the JSX and use it in the rendered output
              (() => {
                const year = movie.release_date.slice(0, 4);
                return <h3>{year}</h3>;
              })()
            ) : (
              <h3>{movie.release_date}</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
