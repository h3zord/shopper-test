import { Driver, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { InMemoryDriversRepository } from '../../use-cases/repositories/in-memory/in-memory-drivers-repository'
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
    rating: new Decimal(5),
    comment: data.description ?? faker.lorem.words(10),
    value: new Decimal(5),
    minimumKilometers: data.minimumKilometers ?? faker.number.int({ max: 10 }),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  driversRepository.items.push(driver)

  return driver
}
