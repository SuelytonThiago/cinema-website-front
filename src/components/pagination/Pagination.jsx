import React, { useState } from 'react';
import './Pagination.css';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import MovieTemplate from '../movie-template/MovieTemplate';

const Pagination = ({ objectList, itemsPerPage, children }) => {
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
    <div className='PaginationContainer'>

      <div className='itemsResultContainer'>
        {currentItems.map((item, index) => (
          React.cloneElement(children, { key: index, item: item })
        ))}
      </div>

      <div className='paginationControls'>
        {currentItems.length > 0 && (
          <div >
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
      
    </div>
  );
};

export default Pagination;
