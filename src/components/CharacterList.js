import React from "react"
import styles from "./CharacterList.module.css"

export default function CharacterList({characters}) {
  return (
    <div className={styles['characters-grid']}>
        {characters.map((character) => (
          <div key={character.id} className={styles['character-card']}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
  )
}
