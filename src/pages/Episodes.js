import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEpisodesData } from '../utils/api'
import EpisodeCard from '../components/EpisodeCard'
import SearchBarEpisodes from '../components/SearchBarEpisodes'
import Pagination from '../components/Pagination'
import styles from './Episodes.module.css'

export default function Episodes() {
  const [episodes, setEpisodes] = useState([])
  const [search, setSearch] = useState('')
  const [filteredEpisodes, setFilteredEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)

  useEffect(() => {
    const fetchEpisodes = async (page = 1) => {
      const data = await getEpisodesData(page)
      setEpisodes(data.results)
      setFilteredEpisodes(data.results)
      setTotalPages(data.info.pages)
      setNextPage(data.info.next)
      setPrevPage(data.info.prev)
    }

    fetchEpisodes(currentPage)
  }, [currentPage])

  useEffect(() => {
    setFilteredEpisodes(
      episodes.filter((episode) =>
        episode.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, episodes])

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
      <div className={styles['episodes-grid']}>
        {filteredEpisodes.map((episode) => (
          <Link to={`/episode/${episode.id}`} key={episode.id} className={styles['episode-card-link']}>
            <EpisodeCard episode={episode} />
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
