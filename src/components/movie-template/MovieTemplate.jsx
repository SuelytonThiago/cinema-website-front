import React from 'react'
import './MovieTemplate.css'
import { Link } from 'react-router-dom'
import StarRating from './../starRating/StarRating'

const MovieTemplate = ({ movie }) => {
  return (
    <div>
      <div className="movieContainer" key={movie.id}>
        <div className="movieInfoContainer">
          <div className="movieImg">
            <img src={movie.imageUrl} alt={movie.name} />
          </div>
          <div className="movieInfo">
            <h2>{movie.name}</h2>
            <StarRating rating={movie.rating} />
            <Link to={`/movie/${movie.id}`}>
              ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieTemplate