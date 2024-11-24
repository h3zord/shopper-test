import { Prisma, Ride } from '@prisma/client'
import { RidesRepository } from '../contracts/rides-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryRidesRepository implements RidesRepository {
  public items: Ride[] = []
  private autoIncrementId = 0

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
