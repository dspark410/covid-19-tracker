import React from 'react'
import { Card } from 'react-bootstrap'
import numeral from 'numeral'

function CardBox({
  active,
  name,
  cases,
  title,
  total,
  red,
  green,
  orange,
  ...props
}) {
  return (
    <div
      className={`
    infobox_container 
    ${active && red && 'border-red'}
    ${active && green && 'border-green'}
    ${active && orange && 'border-orange'}
    `}>
      <Card onClick={props.onClick}>
        <Card.Text
          style={{ marginBottom: '0' }}
          className={`infobox ${active && 'infobox-title'}`}>
          {title} +{numeral(cases).format('0.0a')}{' '}
        </Card.Text>
        <Card.Text className='text-center pb-2'>
          {numeral(total).format('0.0a')} Total
        </Card.Text>
      </Card>
    </div>
  )
}

export default CardBox
