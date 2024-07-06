import CountryInfo from "./CountryInfo"

const DisplayCountry = ({filteredCountries, handleCountryClick}) => {
    if(filteredCountries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    else if(filteredCountries.length === 1){
        return (
            <CountryInfo country={filteredCountries[0]} />
        )
    }

    return (
        <div>
            {filteredCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => handleCountryClick(country.name.common)}>Show</button></div>)}
        </div>
    )
}

export default DisplayCountry