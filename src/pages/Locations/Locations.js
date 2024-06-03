import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { filterLocationsData } from '../../utils/api';
import LocationCard from '../../components/LocationCard/LocationCard';
import SearchBarLocations from '../../components/SearchBarLocations/SearchBarLocations';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Locations.module.css';
import debounce from 'lodash/debounce';
import Loader from '../../components/Loader/Loader';

export default function Locations() {
  const [search, setSearch] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Function to fetch locations data with debounce for optimizing API calls
  const fetchLocations = useCallback(
    debounce(async (page, searchQuery) => {
      const data = await filterLocationsData(page, searchQuery);
      setIsLoadingLocations(false);
      setFilteredLocations(data.results);
      setTotalPages(data.info.pages);
      setNextPage(data.info.next);
      setPrevPage(data.info.prev);
    }, 300),
    []
  );

  // Effect hook to fetch locations when current page or search query changes
  useEffect(() => {
    fetchLocations(currentPage, search);
  }, [currentPage, search, fetchLocations]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles['locations-container']}>
      <SearchBarLocations search={search} setSearch={setSearch} />
      <button>
        <Link to={'/'}>
          Home
        </Link>
      </button>
      <button>
        <Link to={'/episodes'}>
          Episodes
        </Link>
      </button>
      {isLoadingLocations ? (
        <Loader />
      ) : (
      <div className={styles['locations-grid']}>
        {filteredLocations.map((location) => (
          <Link to={`/location/${location.id}`} key={location.id} className={styles['location-card-link']}>
            <LocationCard location={location} />
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
  );
}
