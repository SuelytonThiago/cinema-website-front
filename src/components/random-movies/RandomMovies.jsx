import React, { useEffect, useState, useRef} from 'react'
import MovieTemplate from '../movie-template/MovieTemplate';
import { ArrowLeft, ArrowRight, Carousel, Container } from './style';
import backend from '../../../api/index'
import SearchMoviesSkeleton from '../skeleton-loading/search-movies/SearchMoviesSkeleton';


const RandomMovies = () => {

    const [movies, setMovies] = useState([]);
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const carousel = useRef(null);

    async function getRandomMovies() {
        setServerError(null);
        try {
            const res = await backend.movieAPI.get10RandomMovies();
            setMovies(res.data);
            setIsLoading(false);
        }
        catch (err) {
            setServerError(err.response.data);
        }
    }

    useEffect(() => {
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
            {!!serverError ? (<Error code={serverError.status} message={serverError.Message} />) : (
                isLoading ? (<SearchMoviesSkeleton />) : (
                    <Container>
                        <Carousel ref={carousel}>
                            {
                                movies.map(movie => (
                                    <MovieTemplate item={movie} />
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