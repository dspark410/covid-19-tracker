import React from 'react'
import { Card } from 'react-bootstrap'
import numeral from 'numeral'

function VaccineCardbox({ title, cases, total, totalWorld, view }) {
  return (
    <div
      style={{
        backgroundColor: '#dee0ec',
        width: '100%',
        margin: '10px auto',
      }}>
      <Card style={{ boxShadow: ' 0 0 10px #4178ce' }}>
        <Card.Text
          style={{ marginBottom: '0' }}
          className={'infobox infobox-title'}>
          {title} +{numeral(cases).format('0.0a')}
        </Card.Text>
        <Card.Text className='text-center pb-2'>
          {total === 'No Data' && view !== 'Worldwide'
            ? 'Unavailable Total'
            : view === 'Worldwide'
            ? `${numeral(totalWorld).format('0.0a')} Total`
            : `${numeral(total).format('0.0a')} Total`}
        </Card.Text>
      </Card>
    </div>
  )
}

export default VaccineCardbox
