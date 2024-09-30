export const NavBar = ({ searchQuery, setSearchQuery }) => {
  const handleReset = () => setSearchQuery('')
  const imgUrl = './pokedex.png'

  return (
    <div className="flex p-4 items-center justify-between bg-red-500 max-sm:w-screen">
      <div className="flex items-center gap-4">
        <img src={imgUrl} alt="Pokedex" />
        <h1 className="text-4xl font-bold text-white max-sm:text-2xl max-sm:hidden">
          POKEDEX
        </h1>
      </div>
      <div className="flex gap-4">
        <input
          className="p-1 w-80 max-sm:w-40 focus:outline-none bg-transparent text-white border-b-2"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="bulbasaur....."
          value={searchQuery}
          type="text"
        />
        {searchQuery && (
          <button
            className="text-white border p-1 font-bold hover:bg-red-800"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
