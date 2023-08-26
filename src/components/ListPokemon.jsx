import React, { useEffect, useState } from "react";
import ObtenerUrlPokemon from "./urlPokemons";
import '../css/EstilosListaPokemon.css'
import Modal from "./Modal";

const ListaPokemon = ({ buscarPoke }) => {
  const [PokemonUrl, setPokemonUrls] = useState([])
  const [ListaPokemon, setListaPokemon] = useState([])
  const [Cargando, setCargando] = useState(null)
  const [pagina, setPagina] = useState(0)
  const [IdPokemon, setIdPokemon] = useState([])
  const [obj, setObj] = useState(false)

  useEffect(() => {
    const FetchData = async () => {
      try {
        const URLS = await ObtenerUrlPokemon(pagina);
        setPokemonUrls(URLS);
      } catch (error) {
        alert(error);
      }
    }
    FetchData();
  }, [pagina]);

  useEffect(() => {
    if (PokemonUrl.length > 0) {
      Promise.all(
        PokemonUrl.map((pokemon) =>
          fetch(pokemon).then((response) => response.json())
        )
      )
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
          setCargando(true)
        })
    }
  }, [PokemonUrl, pagina])

    const listaFiltrada = buscarPoke
      ? ListaPokemon.filter(pokemon => pokemon.name.includes(buscarPoke))
      : ListaPokemon


  function VerMas(id) {
    const objPokemon = listaFiltrada.filter(pokemon => pokemon.id === id)
    setIdPokemon(objPokemon)
    setObj(true)
  }

  const CloseModal = () => {
    setObj(false)
  }

  if (!Cargando) {
    return <h1>Cargando....</h1>
  }

  return (
    <div>
      <main className="Main">
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

      {obj && <Modal IdPokemon={IdPokemon} onClose={CloseModal} />}
    </div>
  )
}

export default ListaPokemon
