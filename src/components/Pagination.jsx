import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './Pagination.css'
import {Link} from 'react-router-dom'
import StarRating from './StarRating.jsx'

const Pagination = ({nameMovie}) => {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages , setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [offSet, setOffSet] = useState();
  
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
      setTotalPages(response.data.totalPages);
      setOffSet(response.data.offSet)
    } catch(error){
      console.log(error)
    }
  } 

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
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
                  <StarRating rating ={movie.rating}/>
                  <Link to = {`/movies/${movie.id}`}>
                    ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
        <div>
          {totalPages > 1 && (
          <div className="paginationControls">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Página Anterior
            </button>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              Próxima Página
            </button>
          </div>
        )}

        {totalPages > 0 && (
          <div>
            <span>Página {currentPage + 1} de {totalPages}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pagination