import React from 'react'
import numeral from 'numeral'
import { Table } from 'react-bootstrap'

function TableData({ countries }) {
  return (
    <div style={{ height: '418px', overflow: 'auto' }}>
      <Table striped bordered hover>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td className='text-center'>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format('0,0')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TableData
