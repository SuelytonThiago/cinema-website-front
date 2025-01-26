import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Movie.css';
import RateMovie from '../../components/starRating/RateMovie';
import StarRating from '../../components/starRating/StarRating';
import { useSelector } from 'react-redux';
import LoginModal from '../login/LoginModal';
import CommentTemplate from '../../components/comments-template/CommentTemplate';
import SessionTemplate from '../../components/session-template/SessionTemplate';
import formatDate from '../../js/formatDate';
import classificationMovie from '../../js/Classification.js'
import backend from '../../../api/index.ts'
import Cookies from 'js-cookie'
import { connect } from '../../../web-socket.js';

const Movie = () => {
    const { id } = useParams();
    const { isVisible } = useSelector((rootReducer) => rootReducer.loginModalReducer);
    const [movieData, setMovieData] = useState(null);
    const [sessionsMovieData, setSessionsMovieData] = useState([]);
    const [showSessions, setShowSessions] = useState(false);
    const [comments, setComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        connect((receivedComment) => {
            setComments((prevComments) => [...prevComments, receivedComment]);
        });
    }, []);

    useEffect(() => {
        async function handleGetMovieData() {
            try {
                const res = await backend.movieAPI.findMovieById(id);
                setMovieData(res.data)
            } catch (err) {
                console.log('algo de de errado')
            }
        }
        handleGetMovieData();
    }, [])

    useEffect(() => {
        async function handleGetSessiosDate() {
            try {
                const res = await backend.sessionAPI.findByMovie(id, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`
                    }
                })

                setSessionsMovieData(res.data)

            } catch (err) {
                console.log('Algo deu errado')
            }
        }

        handleGetSessiosDate();
    }, [])

    const toggleShowSessions = (shouldShowSessions) => {
        if (shouldShowSessions !== showSessions) {
            setShowSessions(shouldShowSessions);
        }
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


    if (!movieData || !sessionsMovieData) {
        return <p>Carregando...</p>;
    }

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
                            <div className='categoriesFilm'>
                                {movieData.categories.map((category) => (
                                    <p key={category.name}>{category.name}</p>
                                ))}
                            </div>
                            <div className='classificationControl'>
                                classificação: <p className={`classificationMovie ${classificationMovie(movieData.classification)}`}>{movieData.classification}</p>
                            </div>
                            <div>
                                <h3>Sinopse</h3>
                                <p className={isExpanded ? 'showFullDescript' : 'description'}>
                                    {movieData.description}
                                </p>

                                <button className='showDescrptBtn' onClick={toggleDescription}>
                                    {isExpanded ? 'Ler menos' : 'Ler mais'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='btnMovieContainer'>
                    <button className={`btnMovieInfoControl ${showSessions ? 'isVisible' : ''}`} onClick={() => toggleShowSessions(true)}>Sessoes</button>
                    <button className={`btnMovieInfoControl ${!showSessions ? 'isVisible' : ''}`} onClick={() => toggleShowSessions(false)}>Comentários</button>
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
                            {comments === 0 ? (
                                <p>Sem comentários ainda. Seja o primeiro a comentar!</p>
                            ) : (
                                comments.map((review) => (
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
