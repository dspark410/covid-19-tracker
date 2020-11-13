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

function LineGraph({ casesType, ...props }) {
  const [data, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
      )
      const data = await response.json()
      const lineData = buildLineGraphData(data, casesType)
      setData(lineData)
    }
    getData()
  }, [casesType])

  return (
    <div className={props.className}>
      <div>
        {data && data.length > 0 && (
          <Line
            options={options}
            data={{
              datasets: [
                {
                  data: data,
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
        )}
      </div>
    </div>
  )
}

export default LineGraph
