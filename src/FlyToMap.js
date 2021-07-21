import { useEffect } from 'react'

function FlyToMap({ center, zoom, map }) {
  useEffect(() => {
    if (center && zoom && map) map.flyTo(center, zoom)
  }, [center, zoom, map])
  return null
}

export default FlyToMap
