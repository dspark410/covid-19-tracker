import React from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import TableData from './components/TableData'
import VaccineData from './components/VaccineData'
import VaccineGraph from './components/VaccineGraph'
import VaccineCardbox from './components/VaccineCardbox'

function VaccineVisuals({
  handleOnChange,
  countryCode,
  countries,
  sortedCountries,
  countriesVaccine,
  worldLineData,
  lineData,
  view,
  countryVaccineCount,
  vaccineCount,
}) {
  return (
    <>
      <Container className='mt-5 country-graph-container'>
        <Row>
          <Col className='mx-auto' md={6}>
            <Card
              style={{ backgroundColor: '#dee0ec' }}
              className='mb-3 mx-auto total-card-container'>
              <Card.Title className='p-3 text-center'>
                Total Cases By Country
              </Card.Title>
              <TableData countries={countries} />
            </Card>
          </Col>
          <Col className='mx-auto' md={6}>
            <Card
              style={{ backgroundColor: '#dee0ec' }}
              className='mb-3 mx-auto'>
              <Card.Title className='p-3 text-center'>
                Total Vaccinations By Country
              </Card.Title>
              <VaccineData
                className='p-3 border-light'
                countriesVaccine={countriesVaccine}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className='mt-5 mb-5'>
        <Row>
          <h3
            style={{ fontWeight: '600' }}
            className='text-center mb-4 graph-header mx-auto'>
            {view} Vaccination Graph Data
          </h3>

          <Col md={9}>
            <VaccineGraph
              worldLineData={worldLineData}
              lineData={lineData}
              countryCode={countryCode}
              view={view}
              className='p-3 border-light'
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
                {sortedCountries.map((country) => (
                  <option
                    key={country.country}
                    value={country.countryInfo.iso3}>
                    {country.country}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <VaccineCardbox
              className='w-100'
              title='Vaccinations'
              cases={
                lineData[lineData.length - 1]
                  ? lineData[lineData.length - 1].y
                  : ''
              }
              total={countryVaccineCount}
              totalWorld={vaccineCount}
              view={view}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default VaccineVisuals
