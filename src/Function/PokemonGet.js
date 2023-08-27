
const PokemonGet = ( PokemonUrl ) => {
    return Promise.all(
        PokemonUrl.map(
            (pokemon) => fetch(pokemon).then((response) => response.json())
        )
    )
}

export default PokemonGet