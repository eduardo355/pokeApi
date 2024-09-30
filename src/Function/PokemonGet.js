export const getPokemonData = (pokemonUrls) => {
  return Promise.all(
    pokemonUrls.map((url) => fetch(url).then((response) => response.json()))
  )
}
