import ListaPokemon from "./components/ListPokemon"
import './css/EstilosListaPokemon.css'
import NavBar from "./components/NavBar"
import { useState } from "react"

function App() {
  const [buscar, setBuscar] = useState('')

  return (
    <div className="divColor">
      <div className="centrar">
        <NavBar onBuscar={setBuscar} />
        <ListaPokemon buscarPoke={buscar}/>
      </div>
    </div>

  )
}

export default App
