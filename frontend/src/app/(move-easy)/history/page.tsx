'use client'

import { useState } from 'react'
import { SearchHistoryForm } from './search-history-form'
import { HistoryContainer } from './styles'
import { RidesTable } from './rides-table'

interface Driver {
  id: number
  name: string
}

export interface Ride {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driver: Driver
  value: number
}

export interface RideList {
  customer_id: string
  rides: Ride[]
}

export default function History() {
  const [rideList, setRideList] = useState({} as RideList)

  return (
    <HistoryContainer>
      <h2>Histórico de viagens</h2>

      <SearchHistoryForm
        setRideList={setRideList}
        customerId={rideList.customer_id}
      />

      <RidesTable rideList={rideList.rides} />
    </HistoryContainer>
  )
}
