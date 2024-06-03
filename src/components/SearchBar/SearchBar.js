import React, { useState, useEffect, useCallback } from "react"
import styles from "./SearchBar.module.css"
import { Link } from "react-router-dom"
import { getCharacterData, filterCharacterData } from "../../utils/api"
import debounce from "lodash/debounce"

export default function SearchBar({ setCharacterdata, setTotalPages, page }) {
  const [originalData, setOriginalData] = useState([])
  const [character, setCharacter] = useState("")
  const [status, setStatus] = useState("")
  const [gender, setGender] = useState("")
  const [species, setSpecies] = useState("")
  const [type, setType] = useState("")

  // Fetch initial character data when the component mounts or page changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacterData(page)
      setOriginalData(data.results)
      setCharacterdata(data.results)
      setTotalPages(data.info.pages)
    }

    fetchData()
  }, [page, setCharacterdata, setTotalPages])

  // Debounced function to fetch filtered character data
  const debouncedFetchFilteredData = useCallback(
    debounce(async (filters, page) => {
      const filteredData = await filterCharacterData(page, filters)
      setCharacterdata(filteredData.results || [])
      setTotalPages(filteredData.info.pages || 0)
    }, 300),
    []
  )

  // Update filtered data whenever filter inputs or page change
  useEffect(() => {
    const filters = { character, status, gender, species, type }
    debouncedFetchFilteredData(filters, page)
  }, [character, status, gender, species, type, page, debouncedFetchFilteredData])

  return (
    <div className={styles.header}>
      <input
        placeholder="Search by character"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">All Genders</option>
        {Array.from(new Set(originalData.map(item => item.gender))).map((gender, index) => (
          <option key={index} value={gender}>{gender}</option>
        ))}
      </select>
      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option value="">All Species</option>
        {Array.from(new Set(originalData.map(item => item.species))).map((species, index) => (
          <option key={index} value={species}>{species}</option>
        ))}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        {Array.from(new Set(originalData.map(item => item.type))).map((type, index) => (
          <option key={index} value={type}>{type || 'Unknown'}</option>
        ))}
      </select>
      <button>
        <Link to={"/locations"}>Locations</Link>
      </button>
      <button>
        <Link to={"/episodes"}>Episodes</Link>
      </button>
    </div>
  )
}
