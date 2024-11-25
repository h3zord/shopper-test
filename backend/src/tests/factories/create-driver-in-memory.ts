import { Driver, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryDriversRepository } from '../repositories/in-memory-drivers-repository'

export function createDriverInMemory(
  driversRepository: InMemoryDriversRepository,
  data: Partial<Prisma.DriverUncheckedCreateInput> = {},
) {
  const autoIncrementId =
    driversRepository.items.length > 0
      ? Math.max(...driversRepository.items.map((item) => item.id)) + 1
      : 1

  const driver: Driver = {
    id: data.id ?? autoIncrementId,
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
    minimumMeters:
      data.minimumMeters ?? faker.number.int({ min: 1000, max: 10000 }),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  driversRepository.items.push(driver)

  return driver
}
