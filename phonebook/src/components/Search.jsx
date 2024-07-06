
const Search = ({searchTerm, handleSearchTerm}) => {
    return (
        <div>
            Search: <input value={searchTerm} onChange={handleSearchTerm}/>
        </div>
    )
}

export default Search