import React, { useState, useEffect } from 'react'
import './App.css'
import { sort } from './utils'
import Loader from './Loader'
import CovidCarousel from './CovidCarousel'
import MiddleCarousel from './MiddleCarousel'
import LastCarousel from './LastCarousel'
import CovidCards from './CovidCards'
import CovidVisuals from './CovidVisuals'
import VaccineVisuals from './VaccineVisuals'
import Footer from './Footer'

function App() {
  const [sortedCountries, setSortedCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [worldInfo, setWorldInfo] = useState({})
  const [countryInfo, setCountryInfo] = useState({})
  const [center, setCenter] = useState([32.80746, -40.4796])
  const [zoom, setZoom] = useState(3)
  const [casesType, setCasesType] = useState('cases')
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('Worldwide')
  const [countryCode, setCountryCode] = useState('')
  const [countriesVaccine, setCountriesVaccine] = useState([])
  const [worldLineData, setWorldLineData] = useState([])
  const [lineData, setLineData] = useState([])
  const [vaccineCount, setVaccineCount] = useState(0)
  const [countryVaccineCount, setCountryVaccineCount] = useState(0)

  const buildWorldVaccineLineGraphData = (data) => {
    const lineGraphData = []
    let dataPoint
    for (let date in data) {
      if (dataPoint) {
        const newDataPoint = {
          x: date,
          y: data[date] - dataPoint,
        }
        lineGraphData.push(newDataPoint)
      }
      dataPoint = data[date]
    }
    return lineGraphData
  }

  const buildVaccineLineGraphData = (data) => {
    const lineGraphData = []
    let dataPoint
    for (let date in data.timeline) {
      if (dataPoint) {
        const newDataPoint = {
          x: date,
          y: data.timeline[date] - dataPoint,
        }
        lineGraphData.push(newDataPoint)
      }
      dataPoint = data.timeline[date]
    }
    return lineGraphData
  }

  // Display info on cards with select menu
  const handleOnChange = async (e) => {
    setCountryCode(e.target.value)

    const url =
      e.target.value === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${e.target.value}`

    const response = await fetch(url)
    const data = await response.json()
    setCountryInfo(data)
    if (e.target.value === 'worldwide') {
      setView('Worldwide')
    } else {
      setView(data.country)
    }

    if (e.target.value === 'worldwide') {
      setCenter([34.80746, -40.4796])
      setZoom(3)
      setImage(process.env.PUBLIC_URL + '/images/world.jpg')
    } else {
      setCenter([data.countryInfo.lat, data.countryInfo.long])
      setZoom(8)
      setImage(data.countryInfo.flag)
    }
  }

  // Load country list on table
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries')
      const data = await response.json()

      setSortedCountries(data)

      const sortedData = sort(data)
      setCountries(sortedData)

      setLoading(false)
    }
    getCountries()
  }, [])

  // Load Worldwide stats on cards
  useEffect(() => {
    const getWorldWideInfo = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/all')
      const data = await response.json()
      setWorldInfo(data)
      setImage(process.env.PUBLIC_URL + '/images/world.jpg')
      setLoading(false)
    }
    getWorldWideInfo()
  }, [])

  useEffect(() => {
    //All Country Vaccine Data
    fetch(
      `https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all&fullData=false`
    )
      .then((res) => res.json())
      .then((data) => {
        const storeArr = []
        const vaccineCountriesArr = [...data]
        vaccineCountriesArr.forEach((country) => {
          const arr = Object.values(country.timeline)
          const vaccineObj = {
            country: country.country,
            vaccineCount: arr[arr.length - 1],
          }
          storeArr.push(vaccineObj)
        })
        setCountriesVaccine(storeArr)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    //World Vaccine Data
    fetch(
      ` https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=false`
    )
      .then((res) => res.json())
      .then((data) => {
        const arr = Object.values(data)
        const worldVaccineCount = arr[arr.length - 1]
        setVaccineCount(worldVaccineCount)
        const vaccineLineData = buildWorldVaccineLineGraphData(data)
        setWorldLineData(vaccineLineData)
      })
      .catch((err) => console.log(err))
  }, [view])

  useEffect(() => {
    //Sepcific Country Vaccine Data
    if (
      countryCode !== '' &&
      view !== 'Worldwide' &&
      countryCode !== 'worldwide'
    ) {
      fetch(
        ` https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=all&fullData=false`
      )
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message ===
            'No vaccine data for requested country or country does not exist'
          ) {
            setLineData('')
            setCountryVaccineCount('No Data')
          } else {
            const vaccineLineData = buildVaccineLineGraphData(data)
            setLineData(vaccineLineData)

            const arr = Object.values(data.timeline)
            const vaccineCountValue = arr[arr.length - 1]

            setCountryVaccineCount(vaccineCountValue)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [countryCode, view])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CovidCarousel />

          <CovidCards
            handleOnChange={handleOnChange}
            countries={countries}
            countryCode={countryCode}
            sortedCountries={sortedCountries}
            countryInfo={countryInfo}
            worldInfo={worldInfo}
            casesType={casesType}
            setCasesType={setCasesType}
            image={image}
          />

          <MiddleCarousel />

          <CovidVisuals
            handleOnChange={handleOnChange}
            countries={countries}
            countryCode={countryCode}
            sortedCountries={sortedCountries}
            countryInfo={countryInfo}
            worldInfo={worldInfo}
            casesType={casesType}
            setCasesType={setCasesType}
            view={view}
            zoom={zoom}
            center={center}
          />

          <LastCarousel />

          <VaccineVisuals
            handleOnChange={handleOnChange}
            countries={countries}
            countryCode={countryCode}
            sortedCountries={sortedCountries}
            countriesVaccine={countriesVaccine}
            worldLineData={worldLineData}
            lineData={lineData}
            view={view}
            countryVaccineCount={countryVaccineCount}
            vaccineCount={vaccineCount}
          />

          <Footer />
        </>
      )}
    </>
  )
}

export default App
