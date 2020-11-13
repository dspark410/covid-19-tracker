import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { Form, Card } from 'react-bootstrap'
import InfoBox from './InfoBox'
import Map from './Map'
import TableData from './TableData'
import LineGraph from './LineGraph'
import { sort, capitalize } from './utils'

function App() {
  const [sortedCountries, setSortedCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [worldInfo, setWorldInfo] = useState({})
  const [countryInfo, setCountryInfo] = useState({})
  const [center, setCenter] = useState([32.80746, -40.4796])
  const [zoom, setZoom] = useState(3)
  const [casesType, setCasesType] = useState('cases')

  // Load country list on table
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries')
      const data = await response.json()

      setSortedCountries(data)
      console.log(data)
      const sortedData = sort(data)
      setCountries(sortedData)
    }
    getCountries()
  }, [])

  //Load Worldwide stats on cards
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

    setCountryInfo(data)

    if (e.target.value === 'worldwide') {
      setCenter([32.80746, -40.4796])
      setZoom(3)
      console.log('Worldwide: ', center, zoom)
    } else {
      setCenter([data.countryInfo.lat, data.countryInfo.long])
      setZoom(4)
      console.log('Country: ', center, zoom)
    }
  }

  return (
    <div className='app'>
      <div className='app_left'>
        <Form.Group className='app_selectmenu'>
          <h1>COVID-19 TRACKER</h1>
          <Form.Control
            className='select-menu'
            as='select'
            onChange={handleOnChange}
          >
            <option value='worldwide'>Worldwide</option>
            {sortedCountries.map((country) => (
              <option key={country.country} value={country.countryInfo.iso3}>
                {country.country}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className='app_cardinfo'>
          <InfoBox
            red
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title='Coronavirus Cases'
            cases={
              countryInfo.todayCases
                ? countryInfo.todayCases
                : worldInfo.todayCases
            }
            total={countryInfo.cases ? countryInfo.cases : worldInfo.cases}
          ></InfoBox>
          <InfoBox
            green
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
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
            orange
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title='Deaths'
            cases={
              countryInfo.todayDeaths
                ? countryInfo.todayDeaths
                : worldInfo.todayDeaths
            }
            total={countryInfo.deaths ? countryInfo.deaths : worldInfo.deaths}
          ></InfoBox>
        </div>

        <Map
          countries={countries}
          worldInfo={worldInfo}
          center={center}
          zoom={zoom}
          casesType={casesType}
        />
      </div>

      <div className='app_right'>
        <Card className='mb-3'>
          <Card.Title className='p-3 text-center'>
            Live Cases By Country
          </Card.Title>
          <TableData countries={countries} />
        </Card>

        <Card>
          <Card.Title className='p-3 text-center'>
            Worldwide New {capitalize(casesType)}
          </Card.Title>
          <LineGraph casesType={casesType} className='p-3 border-light graph' />
        </Card>
      </div>
    </div>
  )
}

export default App
