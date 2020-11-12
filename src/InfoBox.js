import React from 'react'
import { Card } from 'react-bootstrap'
import numeral from 'numeral'
import './infoBox.css'
function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card className='infobox_container' onClick={props.onClick}>
      <Card.Title className='infobox'>{title}</Card.Title>
      <Card.Text className='infobox'>
        +{numeral(cases).format('0.0a')}
      </Card.Text>
      <Card.Text className='infobox'>
        {numeral(total).format('0.0a')} Total
      </Card.Text>
    </Card>
  )
}

export default InfoBox
