import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return numeral(value).format('0a')
          },
        },
      },
    ],
  },
}

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

function LineGraph({ casesType, countryCode, view, ...props }) {
  const [worldData, setWorldData] = useState({})
  const [countryData, setCountryData] = useState({})

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
    const getCountryData = async () => {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`
      )
      const data = await response.json()

      if (data.message) {
        setCountryData('')
      } else {
        const lineData = buildLineGraphCountryData(data, casesType)
        setCountryData(lineData)
      }
    }
    if (countryCode && view !== 'Worldwide') {
      getCountryData()
    }
  }, [view, countryCode, casesType])

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
