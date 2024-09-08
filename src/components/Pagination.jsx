import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './Pagination.css'
import {Link} from 'react-router-dom'
import { FiChevronsLeft } from 'react-icons/fi';
import { FiChevronsRight } from 'react-icons/fi';
import StarRating from './StarRating'

const Pagination = ({nameMovie}) => {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages , setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  useEffect(() => {
    setCurrentPage(0);
  }, [nameMovie]);

  useEffect(() => {

    if(typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if(nameMovie){
          fetchMovies(currentPage,pageSize,nameMovie);
        }
        else{
          setMovies([]);
          setTotalPages(0);
        }
      }, 500)
    ) ;

    return () => clearTimeout(typingTimeout);
  }, [currentPage,pageSize, nameMovie]);

  const fetchMovies = async(page, size, name)=> {
    try{
      const response = await axios.get('http://localhost:8080/api/movies/search', {
        params: {
          name: name,
          page: page,
          size: size
        }
      });
      setMovies(response.data.content);
      setTotalPages(response.data.totalPages - 1);
      console.log(totalPages)
    } catch(error){
      console.log(error)
    }
  } 

  const goToFirstPage = () => {
    setCurrentPage(0);
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages)
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
                  <StarRating rating={movie.rating}/>
                  <Link to = {`/movie/${movie.id}`}>
                    ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {movies.length >0 && 
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

          { currentPage < totalPages  &&
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