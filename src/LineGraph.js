import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'

import { options, capitalize } from './utils'

function LineGraph({ casesType, countryCode, view, mapLoading, ...props }) {
  const [worldData, setWorldData] = useState({})
  const [countryData, setCountryData] = useState({})

  const buildLineGraphCountryData = (data, casesType) => {
    const lineGraphData = []
    let dataPoint
    for (let date in data.timeline.cases) {
      if (dataPoint) {
        const newDataPoint = {
          x: date,
          y: data.timeline[casesType][date] - dataPoint,
        }
        lineGraphData.push(newDataPoint)
      }
      dataPoint = data.timeline[casesType][date]
    }
    return lineGraphData
  }

  const buildLineGraphData = (data, casesType) => {
    const lineGraphData = []
    let dataPoint
    for (let date in data.cases) {
      if (dataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - dataPoint,
        }
        lineGraphData.push(newDataPoint)
      }
      dataPoint = data[casesType][date]
    }
    return lineGraphData
  }

  useEffect(() => {
    const getWorldData = async () => {
      const response = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=365'
      )
      const data = await response.json()
      const lineData = buildLineGraphData(data, casesType)
      setWorldData(lineData)
    }
    getWorldData()
  }, [casesType])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const getCountryData = () => {
      fetch(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`,
        { signal }
      )
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message ===
            "Country not found or doesn't have any historical data"
          ) {
            setCountryData('')
          } else {
            const lineData = buildLineGraphCountryData(data, casesType)
            setCountryData(lineData)
          }
        })
        .catch((err) => console.log(err))
    }

    if (countryCode && view !== 'Worldwide') {
      getCountryData()
    }

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, casesType])

  return (
    <>
      <div>
        <Card className='w-100 mx-auto'>
          <Card.Title
            style={{ backgroundColor: '#dee0ec' }}
            className='p-3 text-center mb-0 '>
            {view} New {capitalize(casesType)}
          </Card.Title>
        </Card>
        <div style={{ backgroundColor: '#dee0ec' }} className={props.className}>
          <div>
            {view === 'Worldwide' && worldData && worldData.length > 0 ? (
              <Line
                options={options}
                data={{
                  datasets: [
                    {
                      data: worldData,
                      backgroundColor: `${
                        casesType === 'cases'
                          ? 'rgb(227,149,161)'
                          : casesType === 'recovered'
                          ? 'rgb(195,229,152)'
                          : 'rgb(247,186,168)'
                      }`,
                      borderColor: `${
                        casesType === 'cases'
                          ? '#cc1034'
                          : casesType === 'recovered'
                          ? '#7dd71d'
                          : '#ff6c47'
                      }`,
                    },
                  ],
                }}
              />
            ) : countryData === '' ? (
              <Line
                options={options}
                data={{
                  datasets: [
                    {
                      data: countryData,
                      backgroundColor: `${
                        casesType === 'cases'
                          ? 'rgb(227,149,161)'
                          : casesType === 'recovered'
                          ? 'rgb(195,229,152)'
                          : 'rgb(247,186,168)'
                      }`,
                      borderColor: `${
                        casesType === 'cases'
                          ? '#cc1034'
                          : casesType === 'recovered'
                          ? '#7dd71d'
                          : '#ff6c47'
                      }`,
                    },
                  ],
                }}
              />
            ) : (
              countryData &&
              countryData.length > 0 && (
                <Line
                  options={options}
                  data={{
                    datasets: [
                      {
                        data: countryData,
                        backgroundColor: `${
                          casesType === 'cases'
                            ? 'rgb(227,149,161)'
                            : casesType === 'recovered'
                            ? 'rgb(195,229,152)'
                            : 'rgb(247,186,168)'
                        }`,
                        borderColor: `${
                          casesType === 'cases'
                            ? '#cc1034'
                            : casesType === 'recovered'
                            ? '#7dd71d'
                            : '#ff6c47'
                        }`,
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

export default LineGraph
