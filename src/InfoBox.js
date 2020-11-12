import React from 'react'
import { Card } from 'react-bootstrap'

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{cases}</Card.Text>
      <Card.Text>{total} Total</Card.Text>
    </Card>
  )
}

export default InfoBox
