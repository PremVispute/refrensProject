import React from "react"
import styles from "./LocationCard.module.css"

export default function LocationDetails({ location }) {
    return (
        <div className={styles['location-card']}>
          <h3>{location.name}</h3>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
        </div>
      )
}
