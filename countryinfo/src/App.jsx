import { useEffect, useState } from "react"
import FilterCountry from "./components/FilterCountry"
import countryService from "./services/CountryService"
import DisplayCountry from "./components/DisplayCountry"

const App = () => {
  const[inputCountry, setInputCountry] = useState('')
  const[allCountries, setAllCountries] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])

  const handleInputCountry = (event) => {
    setInputCountry(event.target.value)
  }

  const fetchCountry = () => {
    if(inputCountry.length == 0){
      setFilteredCountries([])
    }
    else{
      setFilteredCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(inputCountry.toLowerCase())))
    }
  }

  const fetchAllCountries = () => {
    countryService
      .fetchAllCountries()
      .then(allCountries => {
        setAllCountries(allCountries)
      })
  }

  useEffect(fetchCountry, [allCountries, inputCountry])

  useEffect(fetchAllCountries, [])

  const handleCountryClick = (countryName) => {
    setFilteredCountries(allCountries.filter(country => country.name.common === countryName))
  }

  return (
    <div>
      <FilterCountry inputCountry={inputCountry} handleInputCountry={handleInputCountry}/>

      <DisplayCountry filteredCountries={filteredCountries} handleCountryClick={handleCountryClick}/>
    </div>
  )
}

export default App
