import React, { useEffect, useState } from "react"
import ObtenerUrlPokemon from "../Function/urlPokemons"
import PokemonGet from "../Function/PokemonGet"
import '../css/EstilosListaPokemon.css'
import Modal from "./Modal"

const ListaPokemon = ({ buscarPoke }) => {
  const [PokemonUrl, setPokemonUrls] = useState([])
  const [ListaPokemon, setListaPokemon] = useState([])
  const [IdPokemon, setIdPokemon] = useState([])
  const [Cargando, setCargando] = useState(true)
  const [modalActivo, setModalActivo] = useState(false)
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
    PokemonUrl.length > 0
    ?
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
    : console.log('Cargando')
  }, [PokemonUrl, pagina])

  const listaFiltrada = buscarPoke
    ? ListaPokemon.filter(pokemon => pokemon.name.includes(buscarPoke))
    : ListaPokemon


  const VerMas = (id) => {
    const objPokemon = listaFiltrada.filter(pokemon => pokemon.id === id)
    setIdPokemon(objPokemon)
    setModalActivo(true)
  }

  const CloseModal = () => {
    setModalActivo(false)
  }

  return (
    <div>
      <main className="Main">
        {Cargando && <h1>Cargando....</h1>}
        {listaFiltrada.map((mapeoPokemon) => {
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mapeoPokemon.id}.png`
          return (
            <div className="container" key={mapeoPokemon.id}>
              <div className="card" >
                <picture>
                  <img src={img} alt={mapeoPokemon.name} />
                </picture>
                <p className="Nombre">{mapeoPokemon.name}</p>
                <button className="btnVerMas" onClick={() => VerMas(mapeoPokemon.id)}>Ver Mas</button>
              </div>
            </div>
          )
        })}
      </main>
      <div className="btnContainer">
        {listaFiltrada.length > 0 
          ? 
          <button className="BtnMas" onClick={() => setPagina(pagina + 21)}>Cargar Mas</button> 
          : 
          <p className="sinResultado">NO HAY RESULTADOS 😥</p>
        }
      </div>

      {modalActivo && <Modal IdPokemon={IdPokemon} onClose={CloseModal} />}
    </div>
  )
}

export default ListaPokemon
