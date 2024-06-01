import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLocationsData } from '../utils/api'
import LocationCard from '../components/LocationCard'
import SearchBarLocations from '../components/SearchBarLocations'
import Pagination from '../components/Pagination'
import styles from './Locations.module.css'

export default function Locations() {
  const [locations, setLocations] = useState([])
  const [search, setSearch] = useState('')
  const [filteredLocations, setFilteredLocations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)

  useEffect(() => {
    const fetchLocations = async (page = 1) => {
      const data = await getLocationsData(page)
      setLocations(data.results)
      setFilteredLocations(data.results)
      setTotalPages(data.info.pages)
      setNextPage(data.info.next)
      setPrevPage(data.info.prev)
    }

    fetchLocations(currentPage)
  }, [currentPage])

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, locations])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles['locations-container']}>
      <SearchBarLocations search={search} setSearch={setSearch} />
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
      <div className={styles['locations-grid']}>
        {filteredLocations.map((location) => (
          <Link to={`/location/${location.id}`} key={location.id} className={styles['location-card-link']}>
            <LocationCard location={location} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}
