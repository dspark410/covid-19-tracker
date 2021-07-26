import React from 'react'
import { Line } from 'react-chartjs-2'
import { options } from '../utils'
import { Card } from 'react-bootstrap'

function VaccineGraph({
  view,
  countryCode,
  worldLineData,
  lineData,
  ...props
}) {
  return (
    <>
      <div>
        <Card className='w-100 mx-auto'>
          <Card.Title
            style={{ backgroundColor: '#dee0ec' }}
            className='p-3 text-center mb-0 line-header'>
            {lineData !== ''
              ? `${view} Vaccinations`
              : view !== 'Worldwide' && 'No Historical Data'}
          </Card.Title>
        </Card>
        <div style={{ backgroundColor: '#dee0ec' }} className={props.className}>
          <div>
            {view === 'Worldwide' &&
            worldLineData &&
            worldLineData.length > 0 ? (
              <Line
                options={options}
                data={{
                  datasets: [
                    {
                      data: worldLineData,
                      backgroundColor: '#6ca1da ',
                      borderColor: '#4190e4',
                    },
                  ],
                }}
              />
            ) : lineData.length !== '' ? (
              <Line
                options={options}
                data={{
                  datasets: [
                    {
                      data: lineData,
                      backgroundColor: '#6ca1da ',
                      borderColor: '#4190e4',
                    },
                  ],
                }}
              />
            ) : (
              lineData &&
              lineData.length > 0 && (
                <Line
                  options={options}
                  data={{
                    datasets: [
                      {
                        data: lineData,
                        backgroundColor: '#6ca1da ',
                        borderColor: '#4190e4',
                      },
                    ],
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VaccineGraph
