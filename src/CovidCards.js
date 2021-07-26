import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import InfoBox from './components/InfoBox'

function CovidCards({
  handleOnChange,
  countryCode,
  countries,
  sortedCountries,
  countryInfo,
  casesType,
  setCasesType,
  worldInfo,
  image,
}) {
  return (
    <Container className='mt-5'>
      <h1
        style={{ fontWeight: '600', color: '#7e89d4' }}
        className='text-center mb-4 tracking'>
        Tracking COVID-19 Across The World
      </h1>
      <Form.Group className='w-50 mx-auto mt-4 mb-4'>
        <Form.Control
          className='select-menu'
          as='select'
          onChange={handleOnChange}
          value={countryCode}>
          <option value='worldwide'>Worldwide</option>
          {sortedCountries.map((country) => (
            <option key={country.country} value={country.countryInfo.iso3}>
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
                total={countryInfo.cases ? countryInfo.cases : worldInfo.cases}
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
                  countryInfo.deaths ? countryInfo.deaths : worldInfo.deaths
                }
              />
            </Col>
          </>
        )}
      </Row>
      <h1
        style={{ fontWeight: '600', color: '#7e89d4' }}
        className='text-center mb-4 mt-5 click'>
        Click On A Card And Visualize Data Below
      </h1>
    </Container>
  )
}

export default CovidCards
