import React from 'react'
import { Spinner } from 'react-bootstrap'
export default function Loader() {
  return (
    <div className='spinner'>
      <Spinner
        animation='border'
        role='status'
        variant='danger'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}
