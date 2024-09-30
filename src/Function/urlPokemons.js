export const getPokemonUrls = async (page) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    const pokemonUrls = data.results.map((result) => result.url)
    return pokemonUrls
  } catch (error) {
    console.error('Error fetching Pokémon URLs:', error)
    throw new Error(error)
  }
}
