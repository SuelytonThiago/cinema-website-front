import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Movie.css';
import RateMovie from '../../components/starRating/RateMovie';
import StarRating from '../../components/starRating/StarRating';
import { useSelector } from 'react-redux';
import LoginModal from '../login/LoginModal';
import { useGetMovieData } from '../../hooks/useGetMovieData';

const Movie = () => {
    const { id } = useParams();
    const { isVisible } = useSelector((rootReducer) => rootReducer.loginModalReducer);
    const { data: movieData, error } = useGetMovieData(id);

    if (error) {
        return <p>Erro ao carregar os dados do filme.</p>;
    }

    if (!movieData) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="movieContainer">
            <div className="movie">
                <div className='movieHeader'>
                    <div>
                        <img src={movieData.imageUrl} alt={movieData.name} />
                    </div>
                    <div className='infoContainer'>
                        <div className='infoHeader'>
                            <div>
                                <h2>{movieData.name}</h2>
                                <StarRating rating={movieData.rating} />
                                <p>Data de lançamento: {movieData.releaseData}</p>
                            </div>
                            <div>
                                <h3>Sinopse</h3>
                                <p>{movieData.description}</p>
                            </div>
                        </div>
                        <div className='linkSessionContainer'>
                            <Link className="buyTicketBtn">Comprar ingresso</Link>
                        </div>
                    </div>
                </div>
                <div className='commentUserData'>
                    <RateMovie id={id} />
                </div>
                <div className="commentsContainer">
                    {movieData.reviews.length === 0 ? (
                        <p>Nenhum Comentário</p>
                    ) : (
                        movieData.reviews.map((review) => (
                            <div key={review.id} className="review">
                                <img className='userIcon' src={review.profileImgUser} alt={review.userName} />
                                <div className='reviewInfo'>
                                    <div className='reviewUserInfo'>
                                        <h4>{review.userName}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <div className='commentInfo'>
                                        <p>{review.comment}</p>
                                        <p className='date'>{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {isVisible && <LoginModal />}
        </div>
    );
};

export default Movie;
