import React from 'react'
import { Carousel } from 'react-bootstrap'

function LastCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          style={{ maxHeight: '400px', objectFit: 'cover' }}
          className='d-block w-100 mh-50'
          src='https://images.unsplash.com/photo-1584931423298-c576fda54bd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          alt='covid-19 heat map'
        />
        <Carousel.Caption style={{ top: '30%' }}>
          <h1 className='statistic' style={{ fontSize: '4rem' }}>
            Don't become a statistic
          </h1>
          <h1 className='statistic'>Get vaccinated 🙂</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default LastCarousel
