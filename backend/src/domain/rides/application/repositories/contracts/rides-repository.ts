import { Prisma, Ride } from '@prisma/client'

interface GetRidesProps {
  customerId: string
  driverId?: number
}

export interface GetRidesResponse {
  id: number
  date: Date
  originLatitude: Prisma.Decimal
  originLongitude: Prisma.Decimal
  destinationLatitude: Prisma.Decimal
  destinationLongitude: Prisma.Decimal
  distanceInMeters: number
  durationInSeconds: number
  driver: {
    id: number
    name: string
  }
  value: Prisma.Decimal
}

export interface RidesRepository {
  getRides(props: GetRidesProps): Promise<GetRidesResponse[]>
  registerRide(data: Prisma.RideUncheckedCreateInput): Promise<Ride>
}
