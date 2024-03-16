import React, { useEffect, useState } from "react"
import ObtenerUrlPokemon from "../Function/urlPokemons"
import PokemonGet from "../Function/PokemonGet"
import { Global } from "../global/Global"

const ListaPokemon = () => {
  const { busqueda } = Global()
  const [PokemonUrl, setPokemonUrls] = useState([])
  const [ListaPokemon, setListaPokemon] = useState([])
  const [Cargando, setCargando] = useState(true)
  const [pagina, setPagina] = useState(0)

  useEffect(() => {
    const FetchData = async () => {
      try {
        const URLS = await ObtenerUrlPokemon(pagina)
        setPokemonUrls(URLS)
      } catch (error) {
        alert(error)
      }
    }
    FetchData()
  }, [pagina])

  useEffect(() => {
    if( PokemonUrl.length > 0) {
      PokemonGet(PokemonUrl)
        .then((data) => {
          if (pagina === 0) {
            setListaPokemon(data)
            setPokemonUrls([])
          } else {
            setListaPokemon(prevPokemon => [...prevPokemon, ...data])
            setPokemonUrls([])
          }
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          setCargando(false)
        })
    }
  }, [PokemonUrl, pagina])

  const listaFiltrada = busqueda
    ? ListaPokemon.filter(pokemon => pokemon.name.includes(busqueda))
    : ListaPokemon

  const typeColors = {
      fire: 'from-red-200 to-red-500',
      water: 'from-blue-200 to-blue-500',
      grass: 'from-green-200 to-green-500',
      electric: 'from-yellow-200 to-yellow-500',
      poison: 'from-purple-200 to-purple-500',
      fairy: 'from-pink-200 to-pink-500',
      bug: 'from-emerald-200 to-emerald-500',
      normal: 'from-yellow-400 to-yellow-700'
  }

  return (
    <section className="p-4 max-lg:mt-2 max-sm:p-0">
      <article className="flex flex-wrap justify-center items-center gap-2 max-lg:flex-nowrap max-lg:flex-col">
        {listaFiltrada.length == 0 && 
        <div className="flex h-[80vh] items-center">
          <span className=" text-5xl font-bold">No hay resultados.</span>
        </div>
        }
        {listaFiltrada.map((mapeoPokemon) => {
          const type = mapeoPokemon.types[0].type.name;
          const gradientClasses = typeColors[type] || 'from-gray-200 to-gray-500';
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mapeoPokemon.id}.png`
          return (
            <div 
            className={`flex flex-row items-center w-1/3 max-lg:w-[60vw] max-sm:w-[95vw] bg-gradient-to-r ${gradientClasses} md:hover:-translate-y-1 ease-in-out duration-200 shadow-sm` }
            key={mapeoPokemon.id}
            >
              <picture className="w-[40%] flex justify-center">
                <img src={img} alt={mapeoPokemon.name} />
              </picture>
              <div className=" flex flex-col p-1 ">
                <span className=" text-white font-bold text-3xl ">{mapeoPokemon.name}</span>
                <span className=" text-lg"><strong>Ataque:</strong> {mapeoPokemon.stats[1].base_stat}</span>
                <span className=" text-lg"><strong>Ataque-Especial:</strong> {mapeoPokemon.stats[3].base_stat}</span>
                <span className=" text-lg"><strong>Defensa:</strong> {mapeoPokemon.stats[2].base_stat}</span>
                <span className=" text-lg"><strong>HP:</strong> {mapeoPokemon.stats[0].base_stat}</span>
                <span className=" text-lg"><strong>Tipo:</strong> {mapeoPokemon.types[0].type.name}</span>
              </div>
            </div>
          )
        })}
      </article>
      <div className=" flex items-center justify-center">
        {listaFiltrada.length > 0
          ?
          <button className=" border mt-3 p-2 text-xl shadow-md font-bold " onClick={() => setPagina(pagina + 21)}>Cargar Mas</button>
          :
          ''
        }
      </div>
    </section>
  )
}

export default ListaPokemon
