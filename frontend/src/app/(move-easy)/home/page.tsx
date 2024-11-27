'use client'

import React, { useState } from 'react'
import { RideEstimateForm } from './components/ride-estimate-form'
import { HomeContainer } from './styles'
import { DriverCards } from './components/driver-cards'
import RideMetrics from './components/ride-metrics'

export interface Coordinates {
  latitude: number
  longitude: number
}

interface Review {
  rating: number
  comment: string
}

interface Option {
  id: number
  name: string
  description: string
  picture: string
  vehicle: string
  review: Review
  value: number
}

interface Route {
  distanceMeters: number
  duration: string
}

interface RouteResponse {
  routes: Route[]
}

export interface RideInformations {
  origin: Coordinates
  destination: Coordinates
  distance: number
  duration: string
  options: Option[]
  routeResponse: RouteResponse
}

export default function Home() {
  const [originAddress, setOriginAddress] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')

  const [rideInformations, setRideInformations] = useState(
    {} as RideInformations,
  )

  console.log(rideInformations)

  const hasRideInformations = Object.keys(rideInformations).length > 0

  return (
    <HomeContainer>
      <RideEstimateForm setRideInformations={setRideInformations} />

      {!hasRideInformations && (
        <>
          <RideMetrics
            distance={rideInformations.distance || 5151}
            duration={rideInformations.duration || '8145s'}
          />
          <DriverCards
            driverList={rideInformations.options}
            rideInformations={{
              origin: originAddress || 'Rua das Flores, 123, São Paulo, Brasil',
              destination:
                destinationAddress ||
                'Avenida Paulista, 1000, São Paulo, Brasil',
              distanceInMeters: rideInformations.distance || 5151,
              durationInSeconds: rideInformations.duration || '8145s',
            }}
          />
        </>
      )}
    </HomeContainer>
  )
}
