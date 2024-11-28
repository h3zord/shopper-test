import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useGoogleMaps } from '@/context/google-maps'

interface CurrentLocation {
  lat: number
  lng: number
}

export function UserLocationMap() {
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null)

  const { isLoaded } = useGoogleMaps()

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const response = await fetch('https://ipinfo.io/json')

        const { loc } = await response.json()

        const [lat, lng] = loc.split(',')

        setCurrentLocation({
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        })
      } catch (error) {
        console.error(error)
      }
    }

    getCurrentLocation()
  }, [])

  if (!isLoaded) return <p>Carregando mapa...</p>
  if (!currentLocation) return <p>Obtendo localização...</p>

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '65vh' }}
      center={currentLocation}
      zoom={15}
    >
      <Marker position={currentLocation} />
    </GoogleMap>
  )
}
