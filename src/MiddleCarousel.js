import React from 'react'
import { Carousel } from 'react-bootstrap'

function MiddleCarousel() {
  return (
    <Carousel className='mt-5'>
      <Carousel.Item>
        <img
          style={{ maxHeight: '400px', objectFit: 'cover' }}
          className='d-block w-100 mh-50'
          src='https://images.unsplash.com/photo-1583423230902-b653abc541eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
          alt='covid-19 virus'
        />
        <Carousel.Caption style={{ top: '30%' }}>
          <h1 style={{ fontWeight: 500 }} className='display-2'>
            DISEASE.SH
          </h1>
          <p style={{ fontSize: '1rem' }}>
            COVID-19 data tracked from open source API:
            <a style={{ color: '#fff' }} href={'https://disease.sh/'}>
              &nbsp;disease.sh
            </a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ maxHeight: '400px', objectFit: 'cover' }}
          className='d-block w-100 mh-50'
          src='https://images.unsplash.com/photo-1584291527908-033f4d6542c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80'
          alt='covid statistic'
        />
        <Carousel.Caption style={{ top: '30%' }}>
          <h1 style={{ fontSize: '4rem' }}>Don't become a statistic</h1>
          <h1>Get vaccinated 🙂</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default MiddleCarousel
