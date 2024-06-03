import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { filterEpisodesData } from '../../utils/api'
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard'
import SearchBarEpisodes from '../../components/SearchBarEpisodes/SearchBarEpisodes'
import Pagination from '../../components/Pagination/Pagination'
import styles from './Episodes.module.css'
import debounce from 'lodash/debounce'
import Loader from '../../components/Loader/Loader'

export default function Episodes() {
  const [search, setSearch] = useState('')
  const [filteredEpisodes, setFilteredEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true)

  // Function to fetch episodes data with debounce for optimizing API calls
  const fetchEpisodes = useCallback(
    debounce(async (page, searchQuery) => {
      const data = await filterEpisodesData(page, searchQuery)
      setIsLoadingEpisodes(false)
      setFilteredEpisodes(data.results)
      setTotalPages(data.info.pages)
      setNextPage(data.info.next)
      setPrevPage(data.info.prev)
    }, 300),
    []
  )

  // Effect hook to fetch episodes when current page or search query changes
  useEffect(() => {
    fetchEpisodes(currentPage, search)
  }, [currentPage, search, fetchEpisodes])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles['episodes-container']}>
      <SearchBarEpisodes search={search} setSearch={setSearch} />
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
      {isLoadingEpisodes ? (
        <Loader />
      ) : (
      <div className={styles['episodes-grid']}>
        {filteredEpisodes.map((episode) => (
          <Link to={`/episode/${episode.id}`} key={episode.id} className={styles['episode-card-link']}>
            <EpisodeCard episode={episode} />
          </Link>
        ))}
      </div>
      )}
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
