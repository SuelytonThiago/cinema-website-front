import React from 'react'
import {useState, useEffect} from 'react'
import './Pagination.css'
import {Link} from 'react-router-dom'
import { FiChevronsLeft } from 'react-icons/fi';
import { FiChevronsRight } from 'react-icons/fi';
import StarRating from './../starRating/StarRating'
import { useMovieData } from '../../hooks/UseMovieData'

const Pagination = ({nameMovie}) => {


  const [currentPage, setCurrentPage] = useState(0);
  const {data: moviesData = []} = useMovieData(nameMovie, currentPage);
  
  const movies = moviesData.content || [];
  const totalPages = moviesData.totalPages || 0;
  
  useEffect(() => {
    setCurrentPage(0);
    
  }, [nameMovie]);

  const goToFirstPage = () => {
    setCurrentPage(0);
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages - 1)
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1 , totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage -1, 0))
  }
  
  return (
    <div>
      <div className='moviesResultContainer'>
        { 
          movies.map((movie) => (
            <div className="movieContainer" key={movie.id}>
              <div className="movieInfoContainer">
                <div className="movieImg">
                  <img src={movie.imageUrl} alt={movie.name} />
                </div>
                <div className="movieInfo">
                  <h2>{movie.name}</h2>
                  <StarRating rating={movie.averageRating}/>
                  <Link to = {`/movie/${movie.id}`}>
                    ver detalhes
                  </Link> 
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {movies.length > 0 && 
        <div className='paginationControls'>
          <button 
          className='paginationBtn fixed'
          onClick={goToFirstPage} disabled={currentPage == 0 }>
            <FiChevronsLeft/>
          </button>
    
          {currentPage >= 1 && 
            <button
            className='paginationBtn' 
            onClick={goToPreviousPage}>
              {currentPage }
            </button>
          }

          <span className='paginationBtn atualPage'>{currentPage + 1}</span>

          { currentPage < totalPages -1  &&
            <button
            className='paginationBtn' 
            onClick={goToNextPage}>
            {currentPage + 2}
            </button>
          }
          <button
          className='paginationBtn fixed' 
          onClick={goToLastPage} disabled={currentPage == totalPages}>
              <FiChevronsRight/>
          </button>
        </div>
      }
    </div>
  )
}

export default Pagination