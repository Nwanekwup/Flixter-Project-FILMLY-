import React from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null; // Don't render if no movie is selected

  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Runtime: {movie.runtime} minutes</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Overview: {movie.overview}</p>
            <button className= "close-button" onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default MovieModal;









