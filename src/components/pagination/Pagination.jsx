import React, { useState } from 'react';
import './Pagination.css';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import MovieTemplate from '../movie-template/MovieTemplate';

const Pagination = ({ objectList }) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(objectList.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = objectList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1); 
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
  };

  return (
    <div>
      <div className='moviesResultContainer'>
        {currentItems.map((movie) => (
          <MovieTemplate key={movie.id} movie={movie} /> 
        ))}
      </div>
      {currentItems.length > 0 && (
        <div className='paginationControls'>
          <button 
            className='paginationBtn fixed'
            onClick={goToFirstPage} 
            disabled={currentPage === 1}
          >
            <FiChevronsLeft />
          </button>

          <button 
            className='paginationBtn' 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1} 
          >
            {currentPage > 1 ? currentPage - 1 : null}
          </button>

          <span className='paginationBtn atualPage'>{currentPage}</span>

          <button
            className='paginationBtn' 
            onClick={goToNextPage} 
            disabled={currentPage >= totalPages}
          >
            {currentPage < totalPages ? currentPage + 1 : null}
          </button>

          <button
            className='paginationBtn fixed' 
            onClick={goToLastPage} 
            disabled={currentPage === totalPages} 
          >
            <FiChevronsRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
