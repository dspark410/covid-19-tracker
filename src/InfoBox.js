import React from 'react'
import { Card } from 'react-bootstrap'
import numeral from 'numeral'
import './infoBox.css'

function InfoBox({
  title,
  cases,
  total,
  active,
  red,
  green,
  orange,
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
      onClick={props.onClick}
    >
      <Card.Title className={`infobox ${active && 'infobox-title'}`}>
        {title}
      </Card.Title>
      <Card.Text
        className={`
        infobox infobox-text 
        ${active && red && 'red'} 
        ${active && green && 'green'} 
        ${active && orange && 'orange'}`}
      >
        +{numeral(cases).format('0.0a')}
      </Card.Text>
      <Card.Text className={`infobox `}>
        {numeral(total).format('0.0a')} Total
      </Card.Text>
    </Card>
  )
}

export default InfoBox
