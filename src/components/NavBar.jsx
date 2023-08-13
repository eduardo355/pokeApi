import React, { useState } from "react";
import '../css/NavBar.css'



const NavBar = ({ onBuscar }) => {
    const [buscar, setBuscar] = useState('')

    const handleChange = (e) => {
        setBuscar(e.target.value)
        onBuscar(buscar)
    }

    const handleResetear = () => {
        onBuscar()
        setBuscar('')
    }

    return (
        <div className="container-nav-bar">
            <div className="tituloContainer">
                <h1 className="Titulo">POKE-API</h1>
            </div>

            <div className="containerInput">
                <input 
                    className="Input" 
                    type="text" 
                    placeholder="bulbasaur....." 
                    name="" 
                    id=""
                    value={buscar}
                    onChange={handleChange} 
                />
                {buscar && <button className="btnBuscar" onClick={handleResetear}>restaurar</button>}
            </div>
        </div>
    )
}

export default NavBar