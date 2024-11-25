import { Prisma, Ride } from '@prisma/client'
import { RidesRepository } from '../contracts/rides-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryDriversRepository } from './in-memory-drivers-repository'

interface GetRidesProps {
  customerId: string
  driverId: number
}

export class InMemoryRidesRepository implements RidesRepository {
  public items: Ride[] = []
  private autoIncrementId = 0

  constructor(private driversRepository: InMemoryDriversRepository) {}

  async getRides({ customerId, driverId }: GetRidesProps) {
    const rideList = this.items.filter((ride) => {
      if (driverId) {
        return ride.customerId === customerId && ride.driverId === driverId
      } else {
        return ride.customerId === customerId
      }
    })

    const sortedRideList = rideList.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const rideListWithDriverName = sortedRideList.map((ride) => {
      const driverData = this.driversRepository.items.find(
        (driver) => driver.id === ride.driverId,
      )

      return {
        id: ride.id,
        date: ride.createdAt,
        originLatitude: ride.originLatitude,
        originLongitude: ride.originLongitude,
        destinationLatitude: ride.destinationLatitude,
        destinationLongitude: ride.destinationLongitude,
        distanceInMeters: ride.distanceInMeters,
        durationInSeconds: ride.durationInSeconds,
        driver: {
          id: driverData!.id,
          name: driverData!.name,
        },
        value: ride.value,
      }
    })

    return rideListWithDriverName
  }

  async registerRide(data: Prisma.RideUncheckedCreateInput) {
    const ride: Ride = {
      id: data.id ?? this.autoIncrementId++,
      originLatitude: new Decimal(Number(data.originLatitude)),
      originLongitude: new Decimal(Number(data.originLongitude)),
      destinationLatitude: new Decimal(Number(data.destinationLatitude)),
      destinationLongitude: new Decimal(Number(data.destinationLongitude)),
      distanceInMeters: data.distanceInMeters,
      durationInSeconds: data.durationInSeconds,
      value: new Decimal(Number(data.value)),
      customerId: data.customerId,
      driverId: data.driverId,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    }

    this.items.push(ride)

    return ride
  }
}
