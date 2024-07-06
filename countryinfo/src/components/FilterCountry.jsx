const FilterCountry = ({inputCountry, handleInputCountry}) => {
    return (
        <div>
            Search Country: <input value={inputCountry} onChange={handleInputCountry}/>
        </div>
    )
}

export default FilterCountry