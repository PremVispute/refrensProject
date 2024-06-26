import React, {useState} from "react"
import Characters from "../Characters/Characters"
import SearchBar from "../../components/SearchBar/SearchBar"
import styles from "./Home.module.css"

export default function Home() {
  const [characterData, setCharacterData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <>
      <h1 className={styles.header}>The Rick and Morty API</h1>
      <SearchBar 
        setCharacterdata={setCharacterData}
        setTotalPages={setTotalPages} 
        page={page}
      />
      <Characters
        characterdata={characterData}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  )
}