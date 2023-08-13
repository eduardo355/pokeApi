import React from "react";
import '../css/Modal.css'


const Modal = ({ IdPokemon, onClose }) => {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IdPokemon[0].id}.png`
    console.log(img);
    return(
        <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{IdPokemon[0].name}</h2>
            <button className="close-button" onClick={onClose}>
              X
            </button>
          </div>
          <div className="modal-body">
            <picture>
              <img src={img} alt={IdPokemon[0].id}/>
            </picture>

            <div className="ContainerCaracteristicas">
                <div className="FilasCaracteristicas">
                    <span>Ataque</span>
                    <span className="SpanColor">{IdPokemon[0].stats[1].base_stat}</span>     
                </div>
                <div className="FilasCaracteristicas">
                    <span>Defensa</span>
                    <span className="SpanColor">{IdPokemon[0].stats[2].base_stat}</span>     
                </div>
                <div className="FilasCaracteristicas">
                    <span>Ataque-Especial</span>
                    <span className="SpanColor">{IdPokemon[0].stats[3].base_stat}</span>     
                </div>
                <div className="FilasCaracteristicas">
                    <span>HP</span>
                    <span className="SpanColor">{IdPokemon[0].stats[0].base_stat}</span>
                </div>
                <div className="FilasCaracteristicas">
                    <span>Tipo</span>
                    <span className="SpanColor">{IdPokemon[0].types[0].type.name}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default Modal