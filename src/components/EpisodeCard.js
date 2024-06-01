// src/components/EpisodeCard.js
import React from 'react'
import styles from './EpisodeCard.module.css'

export default function EpisodeCard({ episode }) {
  return (
    <div className={styles.card}>
      <h3>{episode.name}</h3>
      <p>{episode.episode}</p>
      <p>{episode.air_date}</p>
    </div>
  )
}
