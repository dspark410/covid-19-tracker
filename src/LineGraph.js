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
      label: function (tooltipItem, data) {
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
const buildLineGraphData = (data, type) => {
  const lineGraphData = []
  let dataPoint
  for (let date in data.cases) {
    if (dataPoint) {
      const newDataPoint = {
        x: date,
        y: data[type][date] - dataPoint,
      }
      lineGraphData.push(newDataPoint)
    }
    dataPoint = data[type][date]
  }
  return lineGraphData
}

function LineGraph({ cases = 'cases' }) {
  const [data, setData] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
      )
      const data = await response.json()
      const lineData = buildLineGraphData(data, 'cases')
      setData(lineData)
    }
    getData()
  }, [cases])

  return (
    <div>
      {data && data.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default LineGraph
