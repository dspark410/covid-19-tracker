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
import Loader from './Loader'
import GraphLoader from './GraphLoader'

function App() {
  const [sortedCountries, setSortedCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [worldInfo, setWorldInfo] = useState({})
  const [countryInfo, setCountryInfo] = useState({})
  const [center, setCenter] = useState([32.80746, -40.4796])
  const [zoom, setZoom] = useState(3)
  const [casesType, setCasesType] = useState('cases')
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('Worldwide')
  const [countryCode, setCountryCode] = useState('')
  const [mapLoading, setMapLoading] = useState(true)

  // Load country list on table
  useEffect(() => {
    let timer
    const getCountries = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries')
      const data = await response.json()

      setSortedCountries(data)

      const sortedData = sort(data)
      setCountries(sortedData)
      setLoading(false)
      timer = setTimeout(() => {
        setMapLoading(false)
      }, 2000)
    }
    getCountries()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Load Worldwide stats on cards
  useEffect(() => {
    const getWorldWideInfo = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/all')
      const data = await response.json()
      setWorldInfo(data)
      setImage(process.env.PUBLIC_URL + '/images/world.jpg')
      setLoading(false)
    }
    getWorldWideInfo()
  }, [])

  // Display info on cards with select menu
  const handleOnChange = async (e) => {
    const url =
      e.target.value === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${e.target.value}`

    const response = await fetch(url)
    const data = await response.json()
    setCountryInfo(data)
    if (e.target.value === 'worldwide') {
      setView('Worldwide')
    } else {
      setView(data.country)
      setCountryCode(e.target.value)
    }

    setMapLoading(true)

    if (e.target.value === 'worldwide') {
      setCenter([34.80746, -40.4796])
      setZoom(3)
      setImage(process.env.PUBLIC_URL + '/images/world.jpg')
      setTimeout(() => {
        setMapLoading(false)
      }, 2000)
    } else {
      setCenter([data.countryInfo.lat, data.countryInfo.long])
      setZoom(8)
      setImage(data.countryInfo.flag)
      setTimeout(() => {
        setMapLoading(false)
      }, 2000)
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='app'>
          <div className='app_left'>
            <Form.Group className='app_selectmenu'>
              <h1>COVID-19 TRACKER</h1>
              <Form.Control
                className='select-menu'
                as='select'
                onChange={handleOnChange}>
                <option value='worldwide'>Worldwide</option>
                {sortedCountries.map((country) => (
                  <option
                    key={country.country}
                    value={country.countryInfo.iso3}>
                    {country.country}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {countryInfo && (
              <div className='app_cardinfo'>
                <InfoBox
                  image={image}
                  name={countryInfo.country ? countryInfo.country : ''}
                  red
                  active={casesType === 'cases'}
                  onClick={() => setCasesType('cases')}
                  title='Coronavirus Cases'
                  cases={
                    countryInfo.todayCases === 0
                      ? '0'
                      : countryInfo.todayCases
                      ? countryInfo.todayCases
                      : worldInfo.todayCases
                  }
                  total={
                    countryInfo.cases ? countryInfo.cases : worldInfo.cases
                  }></InfoBox>
                <InfoBox
                  image={image}
                  name={countryInfo.country ? countryInfo.country : ''}
                  countries={countries}
                  green
                  active={casesType === 'recovered'}
                  onClick={() => setCasesType('recovered')}
                  title='Recovered'
                  cases={
                    countryInfo.todayRecovered === 0
                      ? '0'
                      : countryInfo.todayRecovered
                      ? countryInfo.todayRecovered
                      : worldInfo.todayRecovered
                  }
                  total={
                    countryInfo.recovered
                      ? countryInfo.recovered
                      : worldInfo.recovered
                  }></InfoBox>
                <InfoBox
                  image={image}
                  name={countryInfo.country ? countryInfo.country : ''}
                  countries={countries}
                  orange
                  active={casesType === 'deaths'}
                  onClick={() => setCasesType('deaths')}
                  title='Deaths'
                  cases={
                    countryInfo.todayDeaths === 0
                      ? '0'
                      : countryInfo.todayDeaths
                      ? countryInfo.todayDeaths
                      : worldInfo.todayDeaths
                  }
                  total={
                    countryInfo.deaths ? countryInfo.deaths : worldInfo.deaths
                  }></InfoBox>
              </div>
            )}

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

            {mapLoading ? (
              <GraphLoader />
            ) : (
              <Card className='graph_container'>
                <Card.Title className='p-3 text-center'>
                  {view} New {capitalize(casesType)}
                </Card.Title>

                <LineGraph
                  casesType={casesType}
                  className='p-3 border-light graph'
                  countryCode={countryCode}
                  view={view}
                  mapLoading={mapLoading}
                />
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
