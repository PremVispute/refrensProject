import React from 'react'
import styles from './Pagination.module.css'

export default function Pagination({ currentPage, totalPages, nextPage, prevPage, handlePageChange }) {
  return (
    <div className={styles['pagination']}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!prevPage}
        className={styles['pagination-button']}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!nextPage}
        className={styles['pagination-button']}
      >
        Next
      </button>
    </div>
  )
}
