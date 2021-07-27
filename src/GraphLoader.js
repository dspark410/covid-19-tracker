import React from 'react'
import { Spinner } from 'react-bootstrap'

function GraphLoader() {
  return (
    <div className='spinner'>
      <div style={{ position: 'absolute', top: '40%', left: '50%' }}>
        <Spinner
          animation='border'
          role='status'
          variant='danger'
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

export default GraphLoader
