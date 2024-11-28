'use client'

import React, { useState } from 'react'
import { RideEstimateForm } from './components/ride-estimate-form'
import { HomeContainer } from './styles'
import { DriverCards } from './components/driver-cards'
import { RideMetrics } from './components/ride-metrics'
import { DirectionsMap } from './components/directions-map'
import { UserLocationMap } from './components/user-location-map'

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

  const hasRideInformations = Object.keys(rideInformations).length > 0

  return (
    <HomeContainer>
      <RideEstimateForm
        setRideInformations={setRideInformations}
        setOriginAddress={setOriginAddress}
        setDestinationAddress={setDestinationAddress}
      />

      {hasRideInformations ? (
        <>
          <RideMetrics
            distance={rideInformations.distance}
            duration={rideInformations.duration}
          />
          <DriverCards
            driverList={rideInformations.options}
            rideInformations={{
              origin: originAddress,
              destination: destinationAddress,
              distanceInMeters: rideInformations.distance,
              durationInSeconds: rideInformations.duration,
            }}
          />

          <DirectionsMap
            origin={{
              lat: rideInformations.origin.latitude,
              lng: rideInformations.origin.longitude,
            }}
            destination={{
              lat: rideInformations.destination.latitude,
              lng: rideInformations.destination.longitude,
            }}
          />
        </>
      ) : (
        <UserLocationMap />
      )}
    </HomeContainer>
  )
}
