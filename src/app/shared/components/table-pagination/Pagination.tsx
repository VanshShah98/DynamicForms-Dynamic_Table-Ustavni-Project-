// Pagination.tsx

import React from 'react';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import './Pagination.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ForwardIcon from '@mui/icons-material/Forward';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  page: number;
  setPage: (newPage: number) => void;
  maxVisiblePages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageSize,
  page,
  setPage,
  maxVisiblePages,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goToPage: page,
    },
  });

  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, page - halfVisiblePages);
    const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

    if (endPage === pageCount) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const onSubmit = (data: { goToPage: number }) => {
    const maxPage = Math.ceil(totalCount / pageSize);
    const newPage = Math.min(Math.max(data.goToPage, 1), maxPage);
    setPage(newPage);
  };

  return (
    <div className="pagination-container">
      <Button
        className="pagination-button"
        onClick={() => handlePageChange(1)}
        disabled={page <= 1}
      >
        <FirstPageIcon />
      </Button>
      <Button
        className="pagination-button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        <NavigateBeforeIcon />
      </Button>

      <div className="pagination-page-numbers">
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-number-button ${page === pageNumber && 'active'}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <Button
        className="pagination-button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pageCount}
      >
        <NavigateNextIcon />
      </Button>
      <Button
        className="pagination-button"
        onClick={() => handlePageChange(pageCount)}
        disabled={page === pageCount}
      >
        <LastPageIcon />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="go-to-page-form">
        <div className="input-container">
          <label htmlFor="goToPage" className="placeholder">
            Go to:
          </label>
          <input
            type="number"
            id="goToPage"
            {...register('goToPage', {
              required: false,
              min: 1,
              max: pageCount,
            })}
          />
          {errors.goToPage && errors.goToPage.type === 'min' && (
            <span className="error-message">Value must be greater than 0</span>
          )}
          {errors.goToPage && errors.goToPage.type === 'max' && (
            <span className="error-message">Value must be less than or equal to {pageCount}</span>
          )}
        </div>
        <button type="submit">
          <ForwardIcon />
        </button>
      </form>

      <span className="total-items">{`out of ${pageCount}`}</span>
    </div>
  );
};

export default Pagination;
