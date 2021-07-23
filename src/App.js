import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import InfoBox from './InfoBox'
import Map from './Map'
import TableData from './TableData'
import LineGraph from './LineGraph'
import { sort } from './utils'
import Loader from './Loader'
import GraphLoader from './GraphLoader'
import CovidCarousel from './CovidCarousel'
import MiddleCarousel from './MiddleCarousel'
import CardBox from './CardBox'

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
      }, 3000)
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
      }, 3000)
    } else {
      setCenter([data.countryInfo.lat, data.countryInfo.long])
      setZoom(8)
      setImage(data.countryInfo.flag)
      setTimeout(() => {
        setMapLoading(false)
      }, 3000)
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CovidCarousel />

          <Container className='mt-5'>
            <h1
              style={{ fontWeight: '600', color: '#7e89d4' }}
              className='text-center mb-4'>
              Tracking COVID-19 Across The World
            </h1>
            <Form.Group className='w-50 mx-auto mt-4 mb-4'>
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

            <Row>
              {countryInfo && (
                <>
                  <Col>
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
                      }
                    />
                  </Col>
                  <Col>
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
                      }
                    />
                  </Col>
                  <Col>
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
                        countryInfo.deaths
                          ? countryInfo.deaths
                          : worldInfo.deaths
                      }
                    />
                  </Col>
                </>
              )}
            </Row>
            <h1
              style={{ fontWeight: '600', color: '#7e89d4' }}
              className='text-center mb-4 mt-5'>
              Click On A Card And Visualize Data Below
            </h1>
          </Container>

          <MiddleCarousel />

          <Container className='mt-5'>
            <h3 style={{ fontWeight: '600' }} className='text-center mb-4'>
              {view} Graph Data
            </h3>
            <Row>
              <Col md={9}>
                <LineGraph
                  view={view}
                  casesType={casesType}
                  className='p-3 border-light'
                  countryCode={countryCode}
                  mapLoading={mapLoading}
                />
              </Col>
              <Col md={3}>
                <h5 className='text-center'>Select A Country</h5>
                <Form.Group className='w-100 mx-auto'>
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
                <CardBox
                  red
                  active={casesType === 'cases'}
                  onClick={() => setCasesType('cases')}
                  title='Cases'
                  cases={
                    countryInfo.todayCases === 0
                      ? '0'
                      : countryInfo.todayCases
                      ? countryInfo.todayCases
                      : worldInfo.todayCases
                  }
                  total={
                    countryInfo.cases ? countryInfo.cases : worldInfo.cases
                  }
                />
                <CardBox
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
                  }
                />
                <CardBox
                  className='w-100'
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
                  }
                />
              </Col>
            </Row>
          </Container>
          <Container className='mb-5'>
            <h3 style={{ fontWeight: '600' }} className='text-center mb-4 mt-5'>
              COVID-19 Map Data
            </h3>
            <Map
              countries={countries}
              worldInfo={worldInfo}
              center={center}
              zoom={zoom}
              casesType={casesType}
            />
          </Container>

          {/* <Container fluid className='mt-5 country-graph-container'>
            <Row>
              <Col className='mx-auto'>
                <Card
                  style={{ width: '25em', backgroundColor: '#dee0ec' }}
                  className='mb-3 mx-auto'>
                  <Card.Title className='p-3 text-center'>
                    Live Cases By Country
                  </Card.Title>
                  <TableData countries={countries} />
                </Card>
              </Col>
            </Row>
          </Container> */}
        </>
      )}
    </>
  )
}

export default App
