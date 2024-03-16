import React, { useState } from "react";
import { Global } from "../global/Global";


const NavBar = () => {
    const {busqueda, setBusqueda, busquedaReset } = Global()

    const handleChange = (e) => {
        const valor = e.target.value
        setBusqueda(valor)
    }
    const handleResetear = () => {
        busquedaReset()
    }
    const urlImg = './pokedex.png'
    return (
        <div className=" flex p-4 items-center justify-between bg-red-500 max-sm:w-screen ">
            <div className="flex items-center gap-4">
                <img src={urlImg} alt="Pokedex" />
                <h1 className="text-4xl font-bold text-white max-sm:text-2xl max-sm:hidden">POKEDEX</h1>
            </div>
            <div className=" flex gap-4">
                <input 
                    className=" p-1 w-80 max-sm:w-40 focus:outline-none bg-transparent text-white border-b-2" 
                    type="text" 
                    placeholder="bulbasaur....." 
                    name="" 
                    id=""
                    value={busqueda}
                    onChange={handleChange} 
                />
                {busqueda && <button className=" text-white border p-1 font-bold hover:bg-red-800" onClick={handleResetear}>restaurar</button>}
            </div>
        </div>
    )
}

export default NavBar