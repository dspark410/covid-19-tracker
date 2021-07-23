import React from 'react'
import { Carousel } from 'react-bootstrap'

function CovidCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ maxHeight: '300px', objectFit: 'cover' }}
          className='d-block w-100'
          src='https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
          alt='covid-19 tracker'
        />
        <Carousel.Caption style={{ top: '30%' }}>
          <h1 style={{ fontWeight: 500 }} className='display-1'>
            COVID-19 Tracker
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CovidCarousel
