import React from 'react'
import styles from './SearchBarEpisodes.module.css'

export default function SearchBarEpisodes({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search episodes by name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles['episode-search']}
    />
  )
}
