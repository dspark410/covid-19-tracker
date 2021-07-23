import React from 'react'
import { Spinner } from 'react-bootstrap'
export default function Loader() {
  return (
    <div style={{ position: 'fixed', top: '40%', left: '50%' }}>
      <Spinner
        animation='border'
        role='status'
        variant='danger'
        style={{
          width: '100px',
          height: '100px',
        }}>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}
