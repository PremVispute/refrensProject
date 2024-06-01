import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchEpisodeDataList, getCharactersByEpisode } from "../utils/api"
import styles from "./EpisodeDetails.module.css"
import CharacterList from "../components/CharacterList"

export default function EpisodeDetails() {
  const { id } = useParams()
  const [episode, setEpisode] = useState(null)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const episodeData = await fetchEpisodeDataList(id)
      setEpisode(episodeData)

      const characterData = await getCharactersByEpisode(episodeData.characters)
      setCharacters(characterData)
    }

    fetchData()
  }, [id])

  if (!episode) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles['episode-details-container']}>
      <button>
        <Link to={"/"}>
          Home
        </Link>
      </button>
      <button>
        <Link to={"/episodes"}>
          Episodes
        </Link>
      </button>
      <h1>{episode.name}</h1>
      <p>Air Date: {episode.air_date}</p>
      <p>Episode: {episode.episode}</p>
      <CharacterList characters={characters} />
    </div>
  )
}
