import React from 'react'
import { Card } from 'react-bootstrap'
import numeral from 'numeral'
import './infoBox.css'

function InfoBox({
  image,
  name,
  title,
  cases,
  total,
  active,
  red,
  green,
  orange,
  loading,
  ...props
}) {
  return (
    <Card
      className={`
        infobox_container 
        ${active && red && 'border-red'}
        ${active && green && 'border-green'}
        ${active && orange && 'border-orange'}
        `}
      onClick={props.onClick}>
      <Card.Title className={`infobox ${active && 'infobox-title'}`}>
        {title}
      </Card.Title>
      <Card.Title className='imagebox infobox mb-2'>
        <div className='imagebox'>
          <img className='image image-fluid' src={image} alt={image} />
        </div>
      </Card.Title>
      <Card.Text className='m-0 text-center'>
        {name ? name : 'Worldwide'}
      </Card.Text>

      <Card.Text
        className={`m-0
        infobox infobox-text 
        ${active && red && 'red'} 
        ${active && green && 'green'} 
        ${active && orange && 'orange'}`}>
        +{numeral(cases).format('0.0a')}
      </Card.Text>

      <Card.Text className={`infobox m-0 p-0 pb-2`}>
        {numeral(total).format('0.0a')} Total
      </Card.Text>
    </Card>
  )
}

export default InfoBox
