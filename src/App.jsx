import ListaPokemon from "./components/ListPokemon"
import NavBar from "./components/NavBar"
import { useState } from "react"

function App() {
  const [buscar, setBuscar] = useState('')

  return (
    <div className="">
        <NavBar />
        <ListaPokemon/>
    </div>

  )
}

export default App
