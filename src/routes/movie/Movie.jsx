import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Movie.css';
import { FiUser } from 'react-icons/fi';

import StarRating from '../../components/starRating/StarRating';

const Movie = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState({});

    const getMovieInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
            const data = response.data;
            setMovie(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovieInfo();
    }, []);


    return (
        <div className="movieContainer">
            {!movie.name ? (
                <p>Carregando...</p>
            ) : (
                <div className="movie">
                    <div className='movieHeader'>
                        <div>
                            <img src={movie.imageUrl} alt={movie.name} />
                        </div>
                        <div className ='infoContainer'>
                            <div className='infoHeader'>
                                <div>
                                    <h2>{movie.name}</h2>
                                    <StarRating rating={movie.rating}/>
                                    <p>data de lançamento: {movie.releaseData}</p>
                                </div>
                                <div>
                                    <h3>Sinopse</h3>
                                    <p>{movie.description}</p>
                                </div>
                            </div>
                            <div className='linkSessionContainer'>
                                <Link className="buyTicketBtn">Comprar ingresso</Link>
                            </div>
                        </div>
                    </div>
                   
                    <div className="commentsContainer">
                        {movie.reviews.length === 0 ? (
                            <p>Nenhum Comentário</p>
                        ) : (
                            movie.reviews.map((review) => (
                                <div key={review.id} className="review">
                                    <FiUser className='userIcon'/>
                                    <div className='reviewInfo'>
                                        <div className = 'reviewUserInfo'>
                                            <h4>{review.userName}</h4>
                                            <StarRating rating={review.rating}/>
                                        </div>
                                        <div classNname= 'commentInfo'>
                                            <p>{review.comment}</p>
                                            <p className='date'>{review.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Movie