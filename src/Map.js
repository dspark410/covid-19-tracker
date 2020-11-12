import React from 'react'
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import './Map.css'

const casesTypeColors = {
  cases: {
    multiplier: 500,
    option: { color: '#cc1034', fillColor: '#cc1034' },
  },
  recovered: {
    multiplier: 400,
    option: { color: '#7dd71d', fillColor: '#7dd71d' },
  },
  deaths: {
    multiplier: 1000,
    option: { color: '#ff6c47', fillColor: '#ff6c47' },
  },
}
const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={casesTypeColors[casesType].option}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='popup-container'>
          <div
            className='flag'
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className='country'>{country.country}</div>
          <div className='confirmed'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='recovered'>
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ))
function Map({ center, zoom, countries, casesType }) {
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  )
}

export default Map
