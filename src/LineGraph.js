import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { options } from './utils'

function LineGraph({ casesType, countryCode, view, ...props }) {
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
    let abortData

    const getCountryData = async () => {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`,
        { signal }
      )
      const data = await response.json()
      abortData = data
      if (
        data.message === "Country not found or doesn't have any historical data"
      ) {
        setCountryData('')
      } else {
        const lineData = buildLineGraphCountryData(data, casesType)
        setCountryData(lineData)
      }
    }
    if (countryCode && view !== 'Worldwide') {
      getCountryData()
    }

    return () => {
      // if (abortData === "Country not found or doesn't have any historical data")
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, casesType])

  return (
    <div className={props.className}>
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
  )
}

export default LineGraph
