"use client"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { useState, useEffect } from "react"
import "leaflet/dist/leaflet.css"

function Map({ setValue }) {
  const [position, setPosition] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null 

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        setValue("lat", lat)
        setValue("lng", lng)
      },
    })

    return position ? <Marker position={position} /> : null
  }

  return (
    <MapContainer
      center={[-0.18, -78.47]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  )
}

export default Map
