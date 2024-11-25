import { Prisma, Ride } from '@prisma/client'
import { InMemoryRidesRepository } from '../../domain/rides/application/repositories/in-memory/in-memory-rides-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'

export function createRideInMemory(
  ridesRepository: InMemoryRidesRepository,
  data: Partial<Prisma.RideUncheckedCreateInput> = {},
) {
  const autoIncrementId =
    ridesRepository.items.length > 0
      ? Math.max(...ridesRepository.items.map((item) => item.id)) + 1
      : 1

  const ride: Ride = {
    id: data.id ?? autoIncrementId,
    originLatitude: data.originLatitude
      ? new Decimal(Number(data.originLatitude))
      : new Decimal(-23.4419306),
    originLongitude: data.originLongitude
      ? new Decimal(Number(data.originLongitude))
      : new Decimal(-46.8068621),
    destinationLatitude: data.destinationLatitude
      ? new Decimal(Number(data.destinationLatitude))
      : new Decimal(-23.5649224),
    destinationLongitude: data.destinationLongitude
      ? new Decimal(Number(data.destinationLongitude))
      : new Decimal(-46.6519376),
    distanceInMeters: data.distanceInMeters ?? 32694,
    durationInSeconds: data.durationInSeconds ?? 4676,
    value: data.value ? new Decimal(Number(data.value)) : new Decimal(32.69),
    customerId: data.customerId ?? randomUUID(),
    driverId: data.driverId ?? faker.number.int({ min: 1, multipleOf: 1 }),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  ridesRepository.items.push(ride)

  return ride
}
