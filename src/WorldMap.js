import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import './Map.css'

function WorldMap({ center, zoom }) {
  return (
    <div className='map'>
      <Map center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </Map>
    </div>
  )
}

export default WorldMap
