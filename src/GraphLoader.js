import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function GraphLoader() {
  return (
    <div style={{ position: 'absolute', top: '40%', left: '50%' }}>
      <Spinner
        animation='border'
        role='status'
        variant='danger'
        style={{
          width: '50px',
          height: '50px',
        }}>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}
