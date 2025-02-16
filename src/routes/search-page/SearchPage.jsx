import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Pagination from '../../components/pagination/Pagination'
import MovieTemplate from '../../components/movie-template/MovieTemplate'
import backend from '../../../api/index'
import { InputBtn, InputContainer, SearchContainer } from './styles'
import Error from '../../components/error/Error'
import RandomMovies from '../../components/random-movies/RandomMovies'
import SearchMoviesSkeleton from '../../components/skeleton-loading/search-movies/SearchMoviesSkeleton'
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';


const SearchPage = () => {

  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setServerError(null);
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      if (name.trim()) {
        try {
          const res = await backend.movieAPI.findByName(name);
          setMovies(res.data);
          setIsLoading(false);
        } catch (err) {
          setServerError(err.response.data);
        }
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [name]);

  const cleanName = () => {
    setName('');
    setMovies([]);
  }


  return (
    <div>
      <SearchContainer >
        <InputContainer>
          <input type="text"
            id='search'
            name='search'
            placeholder={t('buscar')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='off' />
          {
            name &&
            <InputBtn onClick={cleanName}>
              <FaTimes />
            </InputBtn>
          }
        </InputContainer>
        {!name ? (
          <>
            <h2>{t('link-filmes')}: </h2>
            <RandomMovies />
          </>

        ) : (
          !!serverError ? (
            <Error code={serverError.status} message={serverError.Message} />
          ) : (
            isLoading ? (<SearchMoviesSkeleton />) : (
              <Pagination objectList={movies} itemsPerPage={12}>
                <MovieTemplate />
              </Pagination>
            )
          )
        )}

      </SearchContainer>
    </div>
  )
}

export default SearchPage 