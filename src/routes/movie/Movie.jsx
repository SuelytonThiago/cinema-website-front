import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Movie.css';
import RateMovie from '../../components/starRating/RateMovie';
import StarRating from '../../components/starRating/StarRating';
import { useSelector } from 'react-redux';
import LoginModal from '../login/LoginModal';
import { useGetMovieData } from '../../hooks/useGetMovieData';
import { useSessionsByMovie } from '../../hooks/UseSessionsByMovie';
import CommentTemplate from '../../components/comments-template/CommentTemplate';
import SessionTemplate from '../../components/session-template/SessionTemplate';
import formatDate from '../../js/formatDate';

const Movie = () => {
    const { id } = useParams();
    const { isVisible } = useSelector((rootReducer) => rootReducer.loginModalReducer);
    const { data: movieData, error } = useGetMovieData(id);
    const { data: sessionsMovieData = [] } = useSessionsByMovie(id);
    const [showSessions, setShowSessions] = useState(false);

    if (error) {
        return <p>Erro ao carregar os dados do filme.</p>;
    }

    if (!movieData) {
        return <p>Carregando...</p>;
    }

    const toggleShowSessions = () => {
        setShowSessions(prevState => !prevState);
    }

    const groupSessionsByDate = (sessions) => {
        const grouped = {};

        sessions.forEach(session => {
            const dateKey = formatDate(new Date(session.dateStart)).formattedDate;
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(session);
        });
        const sortedGrouped = Object.keys(grouped).sort((a, b) => new Date(a.split('/').reverse().join('/')) - new Date(b.split('/').reverse().join('/')));

        return sortedGrouped.map(date => ({
            date,
            sessions: grouped[date],
        }));
    };



    return (
        <div className="movieContainer">
            <div className="movie">
                <div className='movieHeader'>
                    <div className='movieHeaderImg'>
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
                    </div>
                </div>
                <div className='btnMovieContainer'>
                    <button className={`btnMovieInfoControl ${showSessions ? 'isVisible' : ''}`} onClick={toggleShowSessions}>Sessoes</button>
                    <button className={`btnMovieInfoControl ${!showSessions ? 'isVisible' : ''}`} onClick={toggleShowSessions}>Comentários</button>
                </div>
                {showSessions ? (
                    <div className='sessionsMovieContainer'>
                        <div className='Sessoes'>
                            {groupSessionsByDate(sessionsMovieData).length === 0 ? ( 
                                <p>Nenhuma sessão encontrada para este filme.</p>
                            ) : (
                                groupSessionsByDate(sessionsMovieData).map(group => (
                                    <div className='sessionInfo' key={group.dateKey}>
                                        {group.sessions.map(session => (
                                            <SessionTemplate key={session.id} session={session} />
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className=''>
                        <div className='commentUserData'>
                            <RateMovie id={id} />
                        </div>
                        <div className="commentsContainer">
                            {movieData.reviews.length === 0 ? (
                                <p>Nenhum Comentário</p>
                            ) : (
                                movieData.reviews.map((review) => (
                                    <CommentTemplate review={review} />
                                ))
                            )}
                        </div>
                    </div>

                )
                }
            </div>
            {isVisible && <LoginModal />}
        </div>
    );
};

export default Movie;
