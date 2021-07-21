import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function GraphLoader() {
  return (
    <div className='spinner'>
      <Spinner
        animation='border'
        role='status'
        variant='danger'
        style={{
          height: '50px',
          width: '50px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '300px',
        }}>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}
