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

export const filterCharacterData = async (page = 1, filters) => {
  const { character, status, gender, species, type } = filters;

  const queryParams = new URLSearchParams();
  if (character) queryParams.append("name", character);
  if (status) queryParams.append("status", status);
  if (gender) queryParams.append("gender", gender);
  if (species) queryParams.append("species", species);
  if (type) queryParams.append("type", type);

  const queryString = queryParams.toString();

  try {
    const response = await fetch(`${baseUrl}/?page=${page}${queryString ? `&${queryString}` : ''}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch filtered character data:", error);
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
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

export const filterLocationsData = async (page = 1, searchQuery = '') => {
  const queryParams = new URLSearchParams();
  if (searchQuery) queryParams.append("name", searchQuery);

  try {
    const response = await fetch(`${locationsUrl}?page=${page}${queryParams.toString() ? `&${queryParams.toString()}` : ''}`);
    if (!response.ok) {
      throw new Error(`Error fetching locations data: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch filtered locations data:", error);
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
};


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

const episodesUrl = "https://rickandmortyapi.com/api/episode"

export const filterEpisodesData = async (page = 1, searchQuery = '') => {
  const queryParams = new URLSearchParams();
  if (searchQuery) queryParams.append("name", searchQuery);

  try {
    const response = await fetch(`${episodesUrl}?page=${page}${queryParams.toString() ? `&${queryParams.toString()}` : ''}`);
    if (!response.ok) {
      throw new Error(`Error fetching episodes data: ${response.statusText}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch filtered episodes data:", error);
    return { results: [], info: { count: 0, pages: 0, next: null, prev: null } };
  }
};

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