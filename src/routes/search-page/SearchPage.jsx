import React, { useEffect } from 'react'
import { useState } from 'react'
import './SearchPage.css'
import { FaTimes } from 'react-icons/fa'
import Pagination from '../../components/pagination/Pagination'
import { useMovieData } from '../../hooks/UseMoviesData'


const SearchPage = () => {
  const [name, setName] = useState('');
  const { data: moviesData = [] } = useMovieData(name);

  const cleanName = () => {
    setName("");
  }
  return (
    <div>
      <div className='inputContainer'>
        <input type="text"
          id='search'
          name='search'
          placeholder='Buscar...'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off' />
        {
          name &&
          <button className='inputBtn' onClick={cleanName}>
            <FaTimes />
          </button>
        }
      </div>

      <Pagination objectList={moviesData} />
    </div>
  )
}

export default SearchPage 