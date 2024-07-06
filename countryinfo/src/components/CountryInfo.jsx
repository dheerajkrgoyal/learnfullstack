const CountryInfo = ({country}) => {


    return (
        <div>
            <h2>{country.name.common}</h2>

            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <strong>Languages:</strong>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
        </div>
    )
}

export default CountryInfo