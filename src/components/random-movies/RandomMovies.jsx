import React, { useEffect, useState, useRef } from 'react'
import MovieTemplate from '../movie-template/MovieTemplate';
import { ArrowLeft, ArrowRight, Carousel, Container } from './style';
import backend from '../../../api/index'
import SearchMoviesSkeleton from '../skeleton-loading/search-movies/SearchMoviesSkeleton';
import Error from '../error/Error';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';


const RandomMovies = () => {

    const [movies, setMovies] = useState([]);
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const carousel = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        async function getRandomMovies() {
            setServerError(null);
            setIsLoading(true);
            setIsError(false);

            try {
                const res = await backend.movieAPI.get10RandomMovies();
                setMovies(res.data);
                setIsLoading(false);
            }
            catch (err) {
                setIsError(true);
                setServerError({
                    status: err.response?.data?.status || 500,
                    Message: err.response?.data.Message || t('erro-mensagem'),
                });
            }
        }

        getRandomMovies();
    }, [])

    const handleLeftCLick = () => {
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }

    const handleRightCLick = () => {
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    return (
        <div>
            {isError ? (<Error code={serverError.status} message={serverError.Message} />) : (
                isLoading ? (<SearchMoviesSkeleton />) : (
                    <Container>
                        <Carousel ref={carousel}>
                            {
                                movies.map(movie => (
                                    <MovieTemplate item={movie} key={movie.id}/>
                                ))
                            }
                        </Carousel>
                        <div>
                            <ArrowLeft onClick={handleLeftCLick}>&lt;</ArrowLeft>
                            <ArrowRight onClick={handleRightCLick}>&gt;</ArrowRight>
                        </div>
                    </Container>
                )
            )}
        </div>
    )
}

export default RandomMovies