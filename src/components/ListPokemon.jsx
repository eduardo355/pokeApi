import { getPokemonData } from '../Function/PokemonGet'
import { useEffect, useState } from 'react'

export const PokemonList = ({
  pokemonUrls,
  setPokemonUrls,
  isLoading,
  setIsLoading,
  searchQuery,
  page,
  setPage,
}) => {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    if (pokemonUrls.length > 0) {
      getPokemonData(pokemonUrls)
        .then((data) => {
          if (page === 0) {
            setPokemonList(data)
            setPokemonUrls([])
          } else {
            setPokemonList((prevPokemon) => [...prevPokemon, ...data])
            setPokemonUrls([])
          }
        })
        .catch((error) => {
          console.error('Error fetching Pokemon data:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [pokemonUrls, page])

  const filteredList = searchQuery
    ? pokemonList.filter((pokemon) => pokemon.name.includes(searchQuery))
    : pokemonList

  const typeColors = {
    fire: 'from-red-200 to-red-500',
    water: 'from-blue-200 to-blue-500',
    grass: 'from-green-200 to-green-500',
    electric: 'from-yellow-200 to-yellow-500',
    poison: 'from-purple-200 to-purple-500',
    fairy: 'from-pink-200 to-pink-500',
    bug: 'from-emerald-200 to-emerald-500',
    normal: 'from-yellow-400 to-yellow-700',
  }

  return (
    <section className="p-4 max-lg:mt-2 max-sm:p-0">
      <article className="flex flex-wrap justify-center items-center gap-2 max-lg:flex-nowrap max-lg:flex-col">
        {filteredList.length === 0 && (
          <div className="flex h-[80vh] items-center">
            <span className="text-5xl font-bold">No results found.</span>
          </div>
        )}
        {filteredList.map((pokemon) => {
          const type = pokemon.types[0].type.name
          const gradientClasses =
            typeColors[type] || 'from-gray-200 to-gray-500'
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
          return (
            <div
              className={`flex flex-row items-center w-1/3 max-lg:w-[60vw] max-sm:w-[95vw] bg-gradient-to-r ${gradientClasses} md:hover:-translate-y-1 ease-in-out duration-200 shadow-sm`}
              key={pokemon.id}
            >
              <picture className="w-[40%] flex justify-center">
                <img src={img} alt={pokemon.name} />
              </picture>
              <div className="flex flex-col p-1 ">
                <span className="text-white font-bold text-3xl ">
                  {pokemon.name}
                </span>
                <span className="text-lg">
                  <strong>Attack:</strong> {pokemon.stats[1].base_stat}
                </span>
                <span className="text-lg">
                  <strong>Special Attack:</strong> {pokemon.stats[3].base_stat}
                </span>
                <span className="text-lg">
                  <strong>Defense:</strong> {pokemon.stats[2].base_stat}
                </span>
                <span className="text-lg">
                  <strong>HP:</strong> {pokemon.stats[0].base_stat}
                </span>
                <span className="text-lg">
                  <strong>Type:</strong> {pokemon.types[0].type.name}
                </span>
              </div>
            </div>
          )
        })}
      </article>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <span className="border mt-3 p-2 text-xl shadow-md font-bold">
            Loading...
          </span>
        ) : (
          <button
            className="border mt-3 p-2 text-xl shadow-md font-bold"
            onClick={() => setPage(page + 21)}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  )
}
