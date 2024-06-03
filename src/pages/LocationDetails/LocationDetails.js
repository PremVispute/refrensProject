import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchLocationData, getCharactersByLocation } from "../../utils/api"
import styles from "./LocationDetails.module.css"
import CharacterList from "../../components/CharacterList/CharacterList"
import Loader from "../../components/Loader/Loader"

export default function LocationDetails() {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [characters, setCharacters] = useState([])
  const [isLoadingLocDetails, setIsLoadingLocDetails] = useState(true);

  // Fetch location and character data when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      const locationData = await fetchLocationData(id)
      setLocation(locationData)

      const characterData = await getCharactersByLocation(locationData.residents)
      setCharacters(characterData)
      setIsLoadingLocDetails(false)
    }

    fetchData()
  }, [id])

  if (isLoadingLocDetails) {
    return <Loader />
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
