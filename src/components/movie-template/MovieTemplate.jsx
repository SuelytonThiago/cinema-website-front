import React from 'react'
import './MovieTemplate.css'
import { Link } from 'react-router-dom'
import StarRating from './../starRating/StarRating'

const MovieTemplate = ({ item }) => {
  return (
    <div>
      <div className="movieContainer" >
        <div className="movieInfoContainer">
          <div className="movieImg">
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="movieInfo">
            <h2>{item.name}</h2>
            <StarRating rating={item.rating} />
            <Link to={`/movie/${item.id}`}>
              ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieTemplate