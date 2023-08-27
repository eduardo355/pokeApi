
const ObtenerUrlPokemon = async (pagina) => {
  let URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pagina}`

  try {
    const respuesta = await fetch(URL)
    const data = await respuesta.json()

      const urlPokemon = data.results.map((url) => url.url)
      return urlPokemon
  } catch (error) {
    throw new Error(error)
  }
};

export default ObtenerUrlPokemon;