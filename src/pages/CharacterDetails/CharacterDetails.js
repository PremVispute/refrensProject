import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from "./CharacterDetails.module.css"
import Loader from '../../components/Loader/Loader'
import { fetchProfileData, fetchLocationData, fetchOriginData, fetchEpisodeData } from "../../utils/api"

export default function CharacterDetails() {
  const { id } = useParams()
  const [profileData, setProfileData] = useState({ location: {}, origin: {} })
  const [locationData, setLocationData] = useState(null)
  const [originData, setOriginData] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true)

  // Fetch character, location, origin, and episode data when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfileData(id)
      setProfileData(profileData)

      if (profileData.location.url) {
        const locationData = await fetchLocationData(profileData.location.url)
        setLocationData(locationData)
      }

      if (profileData.origin.url) {
        const originData = await fetchOriginData(profileData.origin.url)
        setOriginData(originData)
      }

      if (profileData.episode) {
        const episodesData = await fetchEpisodeData(profileData.episode)
        setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData])
        setIsLoadingEpisodes(false)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className={styles.container}>
    <button>
      <Link to={"/"}>
        Home
      </Link>
    </button>
    <div className={styles.profile}>
      <img className={styles.img} src={profileData.image} alt={`${profileData.name} Avatar`} />
      <div className={styles.info}>
        <h2>{profileData.name}</h2>
        <p><strong>Status:</strong> {profileData.status}</p>
        <p><strong>Species:</strong> {profileData.species}</p>
        <p><strong>Gender:</strong> {profileData.gender}</p>
        <p><strong>Last known location:</strong> {profileData.location.name}</p>
        {locationData && (
          <div className={styles.locationDetails}>
            <p><strong>Type:</strong> {locationData.type}</p>
            <p><strong>Dimension:</strong> {locationData.dimension}</p>
            {locationData.residents && <p><strong>Residents:</strong> {locationData.residents.length}</p>}
          </div>
        )}
        <p><strong>First seen in:</strong> {profileData.origin.name}</p>
        {originData && (
          <div className={styles.originDetails}>
            <p><strong>Type:</strong> {originData.type}</p>
            <p><strong>Dimension:</strong> {originData.dimension}</p>
            {originData.residents && <p><strong>Residents:</strong> {originData.residents.length}</p>}
          </div>
        )}
      </div>
    </div>
    <div className={styles.episodes}>
      <h3>Related Episodes:</h3>
      {isLoadingEpisodes ? (
        <Loader />
      ) : (
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>{episode.name}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
}
