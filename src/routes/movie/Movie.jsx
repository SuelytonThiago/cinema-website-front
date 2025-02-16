import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RateMovie from '../../components/rate-movie/RateMovie.jsx';
import StarRating from '../../components/starRating/StarRating';
import { useSelector } from 'react-redux';
import LoginModal from '../login/LoginModal';
import CommentTemplate from '../../components/comments-template/CommentTemplate.jsx';
import SessionTemplate from '../../components/session-template/SessionTemplate';
import formatDate from '../../js/formatDate';
import classificationMovie from '../../js/Classification.js'
import backend from '../../../api/index.ts'
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { BtnMovieContainer, BtnMovieInfoControl, CategoriesFilm, ClassificationControl, ClassificationMovie, Description, InfoContainer, InfoHeader, MovieHeader, MovieImg, SessionsMovieContainer, ShowDescriptBtn } from './styles.js';
import SkeletonMovie from '../../components/skeleton-loading/skeleton-movie/SkeletonMovie.jsx';
import Error from '../../components/error/Error.jsx';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const Movie = () => {
    const { t } = useTranslation();

    const { id } = useParams();
    const { isVisible } = useSelector((rootReducer) => rootReducer.loginModalReducer);
    const [movieData, setMovieData] = useState(null);
    const [sessionsMovieData, setSessionsMovieData] = useState([]);
    const [showSessions, setShowSessions] = useState(false);
    const [comments, setComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionServerError, setSessionServerError] = useState(null);
    const [movieServerError, setMovieServerError] = useState(null);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/comments", (message) => {
                const updatedComment = JSON.parse(message.body);

                setComments((prevComments) => {
                    const existingCommentIndex = prevComments.findIndex(comment => comment.id === updatedComment.id);

                    if (existingCommentIndex !== -1) {

                        const updatedComments = [...prevComments];
                        updatedComments[existingCommentIndex] = updatedComment;
                        return updatedComments;
                    } else {
                        return [...prevComments, updatedComment];
                    }
                });
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    useEffect(() => {
        async function handleGetMovieData() {
            try {
                const res = await backend.movieAPI.findMovieById(id);
                setMovieData(res.data);
                setComments(res.data.reviews);
                setIsLoading(false)
            } catch (err) {
                setMovieServerError(err.response.data);
            }
        }
        async function handleGetSessiosDate() {
            try {
                const res = await backend.sessionAPI.findByMovie(id)

                setSessionsMovieData(res.data)

            } catch (err) {
                setSessionServerError(err.response.data);
            }
        }

        handleGetSessiosDate();
        handleGetMovieData();
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

    if(!!movieServerError) {
        return <Error code={movieServerError.status} message={movieServerError.Message}/>
    }

    return (
        <div >
            {isLoading ? (<SkeletonMovie />) : (
                <>
                    <>
                        <MovieHeader>
                            <div>
                                <MovieImg src={movieData.imageUrl} alt={movieData.name} />
                            </div>
                            <InfoContainer>
                                <InfoHeader>
                                    <div>
                                        <h2>{movieData.name}</h2>
                                        <StarRating rating={movieData.rating} />
                                        <p>{t('p-data-de-lancamento')} {movieData.releaseData}</p>
                                    </div>
                                    <CategoriesFilm>
                                        {movieData.categories.map((category) => (
                                            <p key={category.name}>{category.name}</p>
                                        ))}
                                    </CategoriesFilm>
                                    <ClassificationControl>
                                        {t('classificação')}
                                        <ClassificationMovie
                                            className={classificationMovie(movieData.classification)}>
                                            {movieData.classification}
                                        </ClassificationMovie>
                                    </ClassificationControl>
                                    <div>
                                        <h3>{t('h3-sinopse')}</h3>
                                        <Description $isExpanded={isExpanded}>
                                            {movieData.description}
                                        </Description>

                                        <ShowDescriptBtn onClick={toggleDescription}>
                                            {isExpanded ? t('ler-menos') : t('ler-mais')}
                                        </ShowDescriptBtn>
                                    </div>
                                </InfoHeader>
                            </InfoContainer>
                        </MovieHeader>
                        <BtnMovieContainer>
                            <BtnMovieInfoControl
                                className={showSessions ? 'isVisible' : ''}
                                onClick={() => toggleShowSessions(true)}>
                                {t('sessoes')}
                            </BtnMovieInfoControl>
                            <BtnMovieInfoControl
                                className={!showSessions ? 'isVisible' : ''}
                                onClick={() => toggleShowSessions(false)}>
                                {t('comentarios')}
                            </BtnMovieInfoControl>
                        </BtnMovieContainer>
                        {showSessions ? (
                            <SessionsMovieContainer>
                                <div>
                                    {groupSessionsByDate(sessionsMovieData).length === 0 ? (
                                        <Error code={sessionServerError.status} message={sessionServerError.Message}/>
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
                            </SessionsMovieContainer>
                        ) : (
                            <div>
                                <div className='commentUserData'>
                                    <RateMovie id={id} />
                                </div>
                                <div className="commentsContainer">
                                    {comments === 0 ? (
                                        <p>{t('p-sem-comentarios')}</p>
                                    ) : (
                                        comments.map((review) => (
                                            <CommentTemplate review={review} key={review.id} />
                                        ))
                                    )}
                                </div>
                            </div>

                        )
                        }
                    </>
                    {isVisible && <LoginModal />}

                </>

                )
            }
        </div >
    );
};

export default Movie;
