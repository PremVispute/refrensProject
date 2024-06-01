import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchLocationData, getCharactersByLocation } from "../utils/api"
import styles from "./LocationDetails.module.css"
import CharacterList from "../components/CharacterList"

export default function LocationDetails() {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const locationData = await fetchLocationData(id)
      setLocation(locationData)

      const characterData = await getCharactersByLocation(locationData.residents)
      setCharacters(characterData)
    }

    fetchData()
  }, [id])

  if (!location) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles['location-details-container']}>
      <button>
        <Link to={"/"}>
          Home
        </Link>
      </button>
      <button>
        <Link to={"/locations"}>
          Locations
        </Link>
      </button>
      <h1>{location.name}</h1>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <CharacterList characters={characters} />
    </div>
  )
}
