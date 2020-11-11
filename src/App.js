import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Card } from 'react-bootstrap'
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
  const [countries, setCountries] = useState([])
  const [worldInfo, setWorldInfo] = useState({})
  const [countryInfo, setCountryInfo] = useState({})

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries')
      const data = await response.json()
      setCountries(data)
    }
    getCountries()
  }, [])

  useEffect(() => {
    const getWorldWideInfo = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/all')
      const data = await response.json()
      setWorldInfo(data)
    }
    getWorldWideInfo()
  }, [])

  const handleOnChange = async (e) => {
    const url =
      e.target.value === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${e.target.value}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setCountryInfo(data)
  }

  return (
    <div className='app'>
      <div className='app_left'>
        <Form.Group className='app_selectmenu'>
          <h1>COVID-19 TRACKER</h1>
          <Form.Control as='select' onChange={handleOnChange}>
            <option value='worldwide'>Worldwide</option>
            {countries.map((country) => (
              <option key={country.country} value={country.countryInfo.iso3}>
                {country.country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className='app_cardinfo'>
          <InfoBox
            title='Cornavirus Cases'
            cases={
              countryInfo.todayCases
                ? countryInfo.todayCases
                : worldInfo.todayCases
            }
            total={countryInfo.cases ? countryInfo.cases : worldInfo.cases}
          ></InfoBox>
          <InfoBox
            title='Recovered'
            cases={
              countryInfo.todayRecovered
                ? countryInfo.todayRecovered
                : worldInfo.todayRecovered
            }
            total={
              countryInfo.recovered
                ? countryInfo.recovered
                : worldInfo.recovered
            }
          ></InfoBox>
          <InfoBox
            title='Deaths'
            cases={
              countryInfo.todayDeaths
                ? countryInfo.todayDeaths
                : worldInfo.todayDeaths
            }
            total={countryInfo.deaths ? countryInfo.deaths : worldInfo.deaths}
          ></InfoBox>
        </div>

        <Map />
      </div>

      <Card className='app_right'>
        <Card.Text>Live Cases By Country</Card.Text>
        <Card.Text>Worldwide New Cases</Card.Text>
      </Card>
    </div>
  )
}

export default App
