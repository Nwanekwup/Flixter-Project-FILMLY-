import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './movieList.css';

function MovieList({ movies: initialMovies, onOpenModal }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState(initialMovies); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (currentPage === 1) {
        // If it's the first page, use the initialMovies prop
        setAllMovies(initialMovies);
      } else {
        // If not the first page, fetch more movies
        setIsLoading(true); 
        try {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDcwNGQwMzQxZDI0MTExYTMxM2QxNjNjNWMxMDc3NSIsInN1YiI6IjY2NjdkMmZhZTBlMDgyMGNjYmQwMjlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ma2zCVqaOURVBKbMaDOrPdxDx0lTX8C83eqTEZw5ctk'
            }
          };

          const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`, options);
          const data = await response.json();
          setAllMovies(prevMovies => [...prevMovies, ...data.results]); // Append new movies
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false); 
        }
      }
    };

    fetchMovies();
  }, [currentPage, initialMovies]); 

  const movieCardList = allMovies.map((movie, index) => (
    <MovieCard key={index} movie={movie} onOpenModal={onOpenModal}/>
  ));

  return(
    <div>
      <div className="movie-list">
      {movieCardList}
      </div>
      <button className="load-more" onClick={() => setCurrentPage(currentPage + 1)} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  )
}

export default MovieList;





