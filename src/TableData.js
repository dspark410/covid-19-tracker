import React from 'react'
import './TableData.css'
import numeral from 'numeral'

function TableData({ countries }) {
  return (
    <div className='table border-light'>
      <table>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format('0,0')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableData
