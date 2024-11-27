'use client'

import React, { useEffect, useState } from 'react'
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Libraries,
} from '@react-google-maps/api'

const libraries: Libraries = ['places']

export const MapWithRoute = ({
  origin,
  destination,
}: {
  origin: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null)

  useEffect(() => {
    if (origin && destination) {
      const loadDirectionsService = () => {
        const directionsService = new google.maps.DirectionsService()

        directionsService.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result)
            } else {
              console.error('Erro ao buscar rotas:', status)
            }
          },
        )
      }

      // Aguarde até que o google.maps esteja disponível
      if (window.google && window.google.maps) {
        loadDirectionsService()
      } else {
        const interval = setInterval(() => {
          if (window.google && window.google.maps) {
            loadDirectionsService()
            clearInterval(interval) // Pare o intervalo após carregar
          }
        }, 100) // Verifique a cada 100ms
      }
    }
  }, [origin, destination])

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBb43btE7llvofiBSvGJV9A6IzJYk70BtY"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{
          height: '500px',
          width: '100%',
        }}
        center={origin}
        zoom={12}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  )
}
