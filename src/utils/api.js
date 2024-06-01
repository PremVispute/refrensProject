const baseUrl = "https://rickandmortyapi.com/api/character"

export const getCharacterData = async (page = 1) => {
  try {
    const response = await fetch(`${baseUrl}/?page=${page}`)
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error("Failed to fetch character data:", error)
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } }
  }
}

export const filterCharacterData = (originalData, filters) => {
  const { character, status, location, episode, gender, species, type } = filters

  let filteredData = originalData

  if (character) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.name.toLowerCase().includes(character.toLowerCase())
    )
  }

  if (status) {
    filteredData = filteredData.filter(
      (characterdata) => characterdata.status === status
    )
  }

  if (location) {
    filteredData = filteredData.filter(
      (characterdata) => characterdata.location.name === location
    )
  }

  if (episode) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.episode.includes(episode)
    )
  }

  if (gender) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.gender.includes(gender)
    )
  }

  if (species) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.species.includes(species)
    )
  }

  if (type) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.type.includes(type)
    )
  }

  return filteredData
}

export async function fetchProfileData(id) {
  try {
    const url = `https://rickandmortyapi.com/api/character/${id}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching profile data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch profile data:", error)
    return null
  }
}

export async function fetchLocationData(id) {
  try {
    const url = `https://rickandmortyapi.com/api/location/${id}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching location data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch location data:", error)
    return null
  }
}

export async function fetchOriginData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching origin data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch origin data:", error)
    return null
  }
}

export async function fetchEpisodeData(episodeUrls) {
  try {
    const episodes = await Promise.all(
      episodeUrls.map(async (episodeUrl) => {
        const response = await fetch(episodeUrl)
        if (!response.ok) {
          throw new Error(`Error fetching episode data: ${response.statusText}`)
        }
        return response.json()
      })
    )
    return episodes
  } catch (error) {
    console.error("Failed to fetch episode data:", error)
    return []
  }
}

const locationsUrl = "https://rickandmortyapi.com/api/location"

export const getLocationsData = async (page = 1) => {
  try {
    const response = await fetch(`${locationsUrl}?page=${page}`)
    if (!response.ok) {
      throw new Error(`Error fetching locations: ${response.statusText}`)
    }
    const jsonData = await response.json()
    return jsonData // Return the full response to get pagination info
  } catch (error) {
    console.error("Failed to fetch locations data:", error)
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } }
  }
}


export async function getCharactersByLocation(urls) {
  try {
    const characters = await Promise.all(
      urls.map(async (characterUrl) => {
        const response = await fetch(characterUrl)
        if (!response.ok) {
          throw new Error(`Error fetching character data: ${response.statusText}`)
        }
        return await response.json()
      })
    )
    return characters
  } catch (error) {
    console.error("Failed to fetch characters by location:", error)
    return []
  }
}

// src/utils/api.js
const episodesUrl = "https://rickandmortyapi.com/api/episode"

export const getEpisodesData = async (page = 1) => {
  try {
    const response = await fetch(`${episodesUrl}?page=${page}`)
    if (!response.ok) {
      throw new Error(`Error fetching episodes: ${response.statusText}`)
    }
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error("Failed to fetch episodes data:", error)
    return []
  }
}

export const fetchEpisodeDataList = async (id) => {
  try {
    const url = `https://rickandmortyapi.com/api/episode/${id}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching episode data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch episode data:", error)
    return null
  }
}

export async function getCharactersByEpisode(urls) {
  try {
    const characters = await Promise.all(
      urls.map(async (characterUrl) => {
        const response = await fetch(characterUrl)
        if (!response.ok) {
          throw new Error(`Error fetching character data: ${response.statusText}`)
        }
        return await response.json()
      })
    )
    return characters
  } catch (error) {
    console.error("Failed to fetch characters by episode:", error)
    return []
  }
}
