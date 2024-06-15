import { useState, useEffect } from 'react';
import './App.css';
import FlixterHeader from './components/FlixterHeader';
import MovieList from './components/MovieList';
import MovieModal from './components/movieModal'; // Import the modal component

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('nowPlaying'); // State for active tab
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [sortBy, setSortBy] = useState('popularity.desc'); // Default sorting
  const [filter, setFilter] = useState(''); // No filter initially

  useEffect(() => {
    searchForMovies('now_playing'); 
  }, []);
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    applyFilterAndSort(); 
  };


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    applyFilterAndSort();
  };
const searchForMovies = async (searchTerm) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDcwNGQwMzQxZDI0MTExYTMxM2QxNjNjNWMxMDc3NSIsInN1YiI6IjY2NjdkMmZhZTBlMDgyMGNjYmQwMjlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ma2zCVqaOURVBKbMaDOrPdxDx0lTX8C83eqTEZw5ctk'
      }
    };
    const url = searchTerm === 'now_playing'?`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`
      : `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results); 
        setActiveTab(searchTerm === 'now_playing' ? 'nowPlaying' : 'search');

      }
    catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };
  const applyFilterAndSort = () => {
    let filteredMovies = movies;
    if (filter) {
      filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(parseInt(filter, 10)));
    }
    if (sortBy === 'popularity.desc') {
      filteredMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'popularity.asc') {
      filteredMovies.sort((a, b) => a.popularity - b.popularity);
    } else if (sortBy === 'release_date.desc') {
      filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortBy === 'release_date.asc') {
      filteredMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    } else if (sortBy === 'title.asc') {
      filteredMovies.sort((a, b) => b.title - a.title);
    } else if (sortBy === 'title.desc') {
      filteredMovies.sort((a, b) => a.title - b.title);
    }
    setMovies(filteredMovies);
  };

return (
    <div className="App">
      <div className='main-header'>
        <FlixterHeader />
        <div className="sub-header">
          <button className={activeTab === 'nowPlaying' ? 'now-playing active' : 'now-playing'} onClick={() => searchForMovies('now_playing')}>Now Playing</button>
          <div className="search-box">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>

            <input type="text" onChange={handleSearchChange} placeholder='Search'></input>
              <button type='submit' className="search-button" onClick={() => searchForMovies(query)}>Search</button>
            </form>
          </div>
          <select value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
          <option value="title.asc">Title A-Z</option>
          <option value="title.desc">Title Z-A</option>
          </select>

        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Genres</option>
          <option value="12">Comedy</option>
          {/* ... (Add options for different genres) ... */}
        </select>
        </div>
      </div>
      
      {activeTab === 'nowPlaying' ? (
        <MovieList movies={movies} onOpenModal={handleOpenModal} /> // Pass onOpenModal function
      ) : (
        <MovieList movies={movies} onOpenModal={handleOpenModal} /> // Pass onOpenModal function
      )}

      {showModal && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <div className="footer">
        <p className="footer-text">© 2024 Flixter</p> 
      </div>
    </div>
 );
};

export default App
