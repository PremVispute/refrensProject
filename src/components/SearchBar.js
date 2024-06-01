import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import { getCharacterData, filterCharacterData } from "../utils/api";

export default function SearchBar({ setCharacterdata, setTotalPages, page }) {
  const [originalData, setOriginalData] = useState([]);
  const [character, setCharacter] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [episode, setEpisode] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacterData(page);
      setOriginalData(data.results);
      setCharacterdata(data.results);
      setTotalPages(data.info.pages);
    };

    fetchData();
  }, [page, setCharacterdata, setTotalPages]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const filters = { character, status, location, episode, gender, species, type };
      const filteredData = await filterCharacterData(page, filters);
      setCharacterdata(filteredData.results);
      setTotalPages(filteredData.info.pages);
    };

    fetchFilteredData();
  }, [character, status, location, episode, gender, species, type, page, setCharacterdata, setTotalPages]);

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
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        {Array.from(new Set(originalData.map(item => item.location.name))).map((loc, index) => (
          <option key={index} value={loc}>{loc}</option>
        ))}
      </select>
      <select value={episode} onChange={(e) => setEpisode(e.target.value)}>
        <option value="">All Episodes</option>
        {Array.from(new Set(originalData.flatMap(item => item.episode))).map((ep, index) => (
          <option key={index} value={ep}>{`Episode ${ep.split('/').pop()}`}</option>
        ))}
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
  );
}
