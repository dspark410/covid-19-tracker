import React from 'react'

function Footer() {
  return (
    <div className='footer-container'>
      <a
        className='footer-a'
        href='https://www.netlify.com/'
        rel='noreferrer'
        target='_blank'>
        <img
          className='footer-image1'
          src='https://www.logo.wine/a/logo/Netlify/Netlify-Logo.wine.svg'
          alt='netlify logo'
        />
      </a>
      <div className='footer-text'>
        COVID-19 data sourced from,&nbsp;
        <a
          className='footer-a'
          href='https://disease.sh/docs/'
          rel='noreferrer'
          target='_blank'>
          disease.sh
        </a>
        &nbsp;an open API for disease-related statistics
      </div>

      <div className='footer-image2-container'>
        <a
          className='footer-a'
          href='https://github.com/dspark410/covid-19-tracker'
          rel='noreferrer'
          target='_blank'>
          <img
            className='footer-image2'
            src='https://hci.stanford.edu/courses/cs147/2017/au/projects/human/conejo/images/github.png'
            alt='github logo'
          />
          <span className='footer2-span'>Open Source Project</span>
        </a>
      </div>
    </div>
  )
}

export default Footer
