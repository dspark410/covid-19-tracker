import React from 'react'
import './TableData.css'

function TableData({ countries }) {
  return (
    <div className='table'>
      <table>
        {countries.map((country) => (
          <tr key={country.country}>
            <td>{country.country}</td>
            <td>
              <strong>{country.cases}</strong>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TableData
