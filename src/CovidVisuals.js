import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import CovidGraph from './components/CovidGraph'
import CardBox from './components/CardBox'
import Map from './components/Map'

function CovidVisuals({
  handleOnChange,
  countryCode,
  countries,
  sortedCountries,
  countryInfo,
  casesType,
  setCasesType,
  worldInfo,
  view,
  zoom,
  center,
}) {
  return (
    <>
      <Container className='mt-5'>
        <h3
          style={{ fontWeight: '600' }}
          className='text-center mb-4 graph-header'>
          {view} Graph Data
        </h3>
        <Row>
          <Col md={9}>
            <CovidGraph
              view={view}
              casesType={casesType}
              className='p-3 border-light'
              countryCode={countryCode}
            />
          </Col>
          <Col md={3}>
            <h5 className='text-center select-country'>Select A Country</h5>
            <Form.Group className='w-100 mx-auto'>
              <Form.Control
                className='select-menu'
                as='select'
                onChange={handleOnChange}
                value={countryCode}>
                <option value='worldwide'>Worldwide</option>
                {sortedCountries
                  .sort((a, b) => b.country - a.country)
                  .map((country) => (
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
              total={countryInfo.cases ? countryInfo.cases : worldInfo.cases}
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
              total={countryInfo.deaths ? countryInfo.deaths : worldInfo.deaths}
            />
          </Col>
        </Row>
      </Container>

      <Container className='mb-5'>
        <h3
          style={{ fontWeight: '600' }}
          className='text-center mb-4 mt-5 map-header'>
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
    </>
  )
}

export default CovidVisuals
