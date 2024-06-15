
import './movieCard.css'

const MovieCard = ({ movie, onOpenModal }) =>{
    // define movie card and map to Tmbd data
    return(
        
        <div className="movie-card" onClick={() => onOpenModal(movie)}> 
            <img className='movie-card-image' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="av-rating">Rating: {movie.vote_average}</p>
        </div>
        
    )
}

export default MovieCard