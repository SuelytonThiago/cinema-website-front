import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Pagination from '../../components/pagination/Pagination'
import MovieTemplate from '../../components/movie-template/MovieTemplate'
import backend from '../../../api/index'
import { toast } from 'react-toastify'
import { InputBtn, InputContainer, SearchContainer } from './styles'


const SearchPage = () => {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (name.trim()) {
        try {
          const res = await backend.movieAPI.findByName(name);
          setMovies(res.data);
        } catch (err) {
          toast.error(err.response?.data?.Message);
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
    <SearchContainer >
      <InputContainer>
        <input type="text"
          id='search'
          name='search'
          placeholder='Buscar...'
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

      <Pagination objectList={movies} itemsPerPage={12}>
        <MovieTemplate />
      </Pagination>
    </SearchContainer>
  )
}

export default SearchPage 