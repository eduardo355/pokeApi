import { getPokemonUrls } from './Function/urlPokemons'
import { PokemonList } from './components/ListPokemon'
import { NavBar } from './components/NavBar'
import { useState, useEffect } from 'react'

function App() {
  const [pokemonUrls, setPokemonUrls] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const urls = await getPokemonUrls(page)
        setPokemonUrls(urls)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
        alert('Error fetching Pokémon data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page])

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PokemonList
        searchQuery={searchQuery}
        pokemonUrls={pokemonUrls}
        isLoading={isLoading}
        setPage={setPage}
        page={page}
      />
    </>
  )
}

export default App
