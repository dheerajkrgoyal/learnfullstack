import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const fetchAllCountries = () => {
    const promise = axios.get(`${baseURL}/all`)
    return promise.then(response => response.data)
}

export default {fetchAllCountries}