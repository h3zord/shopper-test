import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { InMemoryCustomersRepository } from '../../use-cases/repositories/in-memory/in-memory-customers-repository'

export function createCustomerInMemory(
  customersRepository: InMemoryCustomersRepository,
  data: Partial<Prisma.CustomerCreateInput> = {},
) {
  const customer: Customer = {
    id: data.id ?? randomUUID(),
    name: data.name ?? faker.person.fullName(),
    email: data.email ?? faker.internet.email(),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  customersRepository.items.push(customer)

  return customer
}
