import React from 'react'
import styles from './SearchBarLocations.module.css'

export default function SearchBarLocations({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search locations by name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles['location-search']}
    />
  )
}
