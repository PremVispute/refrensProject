import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchEpisodeDataList, getCharactersByEpisode } from "../../utils/api"
import styles from "./EpisodeDetails.module.css"
import CharacterList from "../../components/CharacterList/CharacterList"
import Loader from "../../components/Loader/Loader"

export default function EpisodeDetails() {
  const { id } = useParams()
  const [episode, setEpisode] = useState(null)
  const [characters, setCharacters] = useState([])
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true);

  // Fetch episode and character data when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      const episodeData = await fetchEpisodeDataList(id)
      setEpisode(episodeData)

      const characterData = await getCharactersByEpisode(episodeData.characters)
      setCharacters(characterData)
      setIsLoadingEpisodes(false);
    }

    fetchData()
  }, [id])

  if (isLoadingEpisodes) {
    return <Loader />
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
