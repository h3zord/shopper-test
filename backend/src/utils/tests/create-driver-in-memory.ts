import { Driver, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { InMemoryDriversRepository } from '../../domain/rides/application/repositories/in-memory/in-memory-drivers-repository'
import { Decimal } from '@prisma/client/runtime/library'

export function createDriverInMemory(
  driversRepository: InMemoryDriversRepository,
  data: Partial<Prisma.DriverCreateInput> = {},
) {
  const driver: Driver = {
    id: data.id ?? randomUUID(),
    name: data.name ?? faker.person.fullName(),
    description: data.description ?? faker.lorem.words(10),
    vehicle: data.vehicle ?? faker.vehicle.vehicle(),
    rating: data.rating
      ? new Decimal(Number(data.rating))
      : new Decimal(faker.number.float({ min: 0.5, max: 5, multipleOf: 0.5 })),
    comment: data.description ?? faker.lorem.words(10),
    pricePerKilometer: data.pricePerKilometer
      ? new Decimal(Number(data.pricePerKilometer))
      : new Decimal(faker.number.float({ multipleOf: 0.5, min: 1, max: 10 })),
    minimumKilometers:
      data.minimumKilometers ?? faker.number.int({ min: 1, max: 10 }),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  driversRepository.items.push(driver)

  return driver
}
