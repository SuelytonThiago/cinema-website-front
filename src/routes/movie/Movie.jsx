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
import backend from '../../../api/index.ts';
import { AddSessionContainer, AdmBtns, BtnMovieContainer, BtnMovieInfoControl, CategoriesFilm, ClassificationControl, ClassificationMovie, Description, Header, InfoContainer, InfoHeader, MovieHeader, MovieImg, SessionsContainer, SessionsMovieContainer, ShowDescriptBtn } from './styles.js';
import SkeletonMovie from '../../components/skeleton-loading/skeleton-movie/SkeletonMovie.jsx';
import Error from '../../components/error/Error.jsx';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';
import DeleteMovie from '../../components/admin-components/delete-movie/DeleteMovie.jsx';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/modal/Modal.jsx';
import AddCategoryToMovie from '../../components/admin-components/add-category-to-movie/AddCategoryToMovie.jsx';
import AddSession from '../../components/admin-components/add-session/AddSession.jsx';
import UpdateMovie from '../../components/admin-components/update-movie/UpdateMovie.jsx';

const Movie = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const { id } = useParams();
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
    const [movieData, setMovieData] = useState(null);
    const [sessionsMovieData, setSessionsMovieData] = useState([]);
    const [showSessions, setShowSessions] = useState(false);
    const [comments, setComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionServerError, setSessionServerError] = useState(null);
    const [movieServerError, setMovieServerError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function handleGetMovieData() {
            if (location.pathname.includes(`/movie/`)) {
                try {
                    const res = await backend.movieAPI.findMovieById(id);
                    setMovieData(res?.data);
                    setComments(res?.data.reviews);
                    setIsLoading(false)
                    console.log(res.data.backgroundCover);
                    document.body.style.backgroundImage = `url(${res.data.backgroundCover})`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center';
                    document.body.style.backgroundAttachment = 'fixed';

                } catch (err) {
                    setMovieServerError(err.response?.data || {});
                }
            }
        }

        async function handleGetSessiosDate() {
            try {
                const res = await backend.sessionAPI.findByMovie(id)
                setSessionsMovieData(res?.data)
                console.log("response" + res);
            } catch (err) {
                console.log("erro" + err);
                setSessionServerError(err.response?.data || {});
            }
        }

        handleGetMovieData();
        handleGetSessiosDate();

        return () => {
            document.body.style.backgroundImage = '';
        };

    }, [id, location.pathname]);

    const toggleShowSessions = (shouldShowSessions) => {
        if (shouldShowSessions !== showSessions) {
            setShowSessions(shouldShowSessions);
        }
    }

    const groupSessionsByDate = (sessions) => {
        if (!sessions || !Array.isArray(sessions)) {
            return [];
        }

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

    if (movieServerError && movieServerError.status) {
        return <Error code={movieServerError.status} message={movieServerError.Message} />
    }

    const onClose = () => {
        return setIsOpen(!isOpen);
    }

    return (
        <div >
            {isLoading ? (<SkeletonMovie />) : (
                <>
                    <Modal isOpen={isOpen} onClose={onClose} >
                        <DeleteMovie movieId={id} onClose={onClose} />
                    </Modal>

                    <MovieHeader>
                        <Header>
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

                                        {currentUser?.roles.map(role => role.nameRole).includes('ROLE_ADMIN') && (
                                            <AddCategoryToMovie movieId={id} />
                                        )}

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
                        </Header>

                        {currentUser?.roles.map(role => role.nameRole).includes('ROLE_ADMIN') && (
                            <AdmBtns>
                                <DeleteMovie movieId={id} />
                                <UpdateMovie movie={movieData} />
                            </AdmBtns>
                        )}
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
                                    <AddSessionContainer>
                                        <Error code={sessionServerError?.status} message={sessionServerError?.Message} />
                                        {currentUser?.roles.map(role => role.nameRole).includes('ROLE_ADMIN') && (
                                            <AddSession MovieData={movieData} movieId={id} />
                                        )}
                                    </AddSessionContainer>
                                ) : (
                                    <SessionsContainer>
                                        {groupSessionsByDate(sessionsMovieData).map(group => (
                                            <div className='sessionInfo' key={group.date}>
                                                {group.sessions.map(session => (
                                                    <SessionTemplate key={session.id} session={session} />
                                                ))}
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {currentUser?.roles.some(role => role.nameRole === 'ROLE_ADMIN') && (
                                                <AddSession MovieData={movieData} movieId={id} />
                                            )}
                                        </div>
                                    </SessionsContainer>

                                )}
                            </div>
                        </SessionsMovieContainer>
                    ) : (
                        <div>
                            <div>
                                <RateMovie id={id} />
                            </div>
                            <div >
                                {comments.length === 0 ? (
                                    <Error message={t('p-sem-comentarios')} />
                                ) : (
                                    comments.map((review) => (
                                        <CommentTemplate review={review} key={review.id} />
                                    ))
                                )}
                            </div>
                        </div>

                    )}
                </>

            )}
        </div>
    );
};

export default Movie;
