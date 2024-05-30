const baseUrl = "https://rickandmortyapi.com/api/character";

export const getCharacterData = async (page = 1) => {
  const response = await fetch(`${baseUrl}/?page=${page}`);
  const jsonData = await response.json();
  return jsonData;
};

export const filterCharacterData = (originalData, filters) => {
  const { character, status, location, episode, gender, species, type } = filters;

  let filteredData = originalData;

  if (character) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.name.toLowerCase().includes(character.toLowerCase())
    );
  }

  if (status) {
    filteredData = filteredData.filter(
      (characterdata) => characterdata.status === status
    );
  }

  if (location) {
    filteredData = filteredData.filter(
      (characterdata) => characterdata.location.name === location
    );
  }

  if (episode) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.episode.includes(episode)
    );
  }

  if (gender) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.gender.includes(gender)
    );
  }

  if (species) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.species.includes(species)
    );
  }

  if (type) {
    filteredData = filteredData.filter((characterdata) =>
      characterdata.type.includes(type)
    );
  }

  return filteredData;
};

export async function fetchProfileData(id) {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url);
    return await response.json();
}

export async function fetchLocationData(url) {
    const response = await fetch(url);
    return await response.json();
}

export async function fetchOriginData(url) {
    const response = await fetch(url);
    return await response.json();
}

export async function fetchEpisodeData(episodeUrls) {
    const episodes = await Promise.all(
        episodeUrls.map(async (episodeUrl) => {
            const response = await fetch(episodeUrl);
            return response.json();
        })
    );
    return episodes;
}