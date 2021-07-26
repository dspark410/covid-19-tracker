import React from 'react'
import { Table } from 'react-bootstrap'

import numeral from 'numeral'

function VaccineData({ countriesVaccine }) {
  return (
    <div style={{ height: '418px', overflow: 'auto' }}>
      <Table striped bordered hover>
        <tbody>
          {countriesVaccine
            .sort((a, b) => b.vaccineCount - a.vaccineCount)
            .map((country) => (
              <tr key={country.country}>
                <td className='text-center'>{country.country}</td>
                <td>
                  <strong>{numeral(country.vaccineCount).format('0,0')}</strong>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default VaccineData
