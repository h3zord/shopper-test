import React, { useState, useCallback } from 'react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import { useGoogleMaps } from '@/context/google-maps'

interface MapProps {
  origin: { lat: number; lng: number }
  destination: { lat: number; lng: number }
}

export function DirectionsMap({ origin, destination }: MapProps) {
  const { isLoaded } = useGoogleMaps()

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null)

  const fetchDirections = useCallback(() => {
    if (!origin || !destination || !window.google?.maps) return

    const directionsService = new google.maps.DirectionsService()

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result)
        } else {
          console.error('Erro ao buscar rota:', status)
        }
      },
    )
  }, [origin, destination])

  if (!isLoaded) return <p>Carregando mapa...</p>

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '65vh' }}
      center={origin}
      zoom={10}
      onLoad={fetchDirections}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  )
}
