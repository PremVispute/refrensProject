import React from "react"
import { Link } from "react-router-dom"
import styles from "./Characters.module.css"

export default function Characters({ characterdata, page, setPage, totalPages }) {
  return (
    <>
      <div className={styles['char-row']}>
        {characterdata.map((characterdataItem) => (
          <div className={styles.card} key={characterdataItem.id}>
            <img className={styles.img} src={characterdataItem.image} alt="Avatar" />
            <div className={styles['card-text']}>
              <div className=''>
                <Link to={`/character/${characterdataItem.id}`}>
                  {characterdataItem.name}
                </Link>
              </div>
              <div className={styles['card-inner-space']}>
                {characterdataItem.status} - {characterdataItem.species}
              </div>
              Last known location:
              <div className={styles['card-inner-text']}>
                {characterdataItem.location.name}
              </div>
              <div className={styles['card-inner-space']}>
                First seen in:
              </div>
              <div className={styles['card-inner-text']}>
                {characterdataItem.origin.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}
