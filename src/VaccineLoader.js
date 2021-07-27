import React from 'react'
import { Spinner } from 'react-bootstrap'

function VaccineLoader() {
  return (
    <div className='spinner'>
      <div style={{ position: 'absolute', top: '40%', left: '50%' }}>
        <Spinner
          animation='border'
          role='status'
          variant='info'
          style={{
            height: '50px',
            width: '50px',
          }}>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default VaccineLoader
