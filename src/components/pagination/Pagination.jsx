import React, { useState } from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { AtualPage, ItemsResultContainer, PaginationBtn, PaginationContainer, PaginationControls } from './styles';

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
    <PaginationContainer>

      <ItemsResultContainer>
        {currentItems.map((item, index) => (
          React.cloneElement(children, { key: index, item: item })
        ))}
      </ItemsResultContainer>

      <PaginationControls>
        {currentItems.length > 0 && (
          <div >
            <PaginationBtn
              className='fixed'
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FiChevronsLeft />
            </PaginationBtn>

            <PaginationBtn
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              {currentPage > 1 ? currentPage - 1 : null}
            </PaginationBtn>

            <AtualPage className='atualPage'>{currentPage}</AtualPage>

            <PaginationBtn
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              {currentPage < totalPages ? currentPage + 1 : null}
            </PaginationBtn>

            <PaginationBtn
              className='fixed'
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FiChevronsRight />
            </PaginationBtn>
          </div>
        )}
      </PaginationControls>
      
    </PaginationContainer>
  );
};

export default Pagination;
