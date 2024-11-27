'use client'

import React, { useState } from 'react'
import { RideEstimateForm } from './components/ride-estimate-form'
import { HomeContainer } from './styles'
import { DriverCards } from './components/driver-cards'
import RideMetrics from './components/ride-metrics'

export interface RideInformations {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  distance: number
  duration: string
  options: {
    id: number
    name: string
    description: string
    picture: string
    vehicle: string
    review: {
      rating: number
      comment: string
    }
    value: number
  }[]
  routeResponse: {
    routes: {
      distanceMeters: number
      duration: string
    }[]
  }
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
