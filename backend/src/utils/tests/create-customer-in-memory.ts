import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { CustomersRepository } from '../../use-cases/repositories/contracts/customers-repository'

export function createCustomerInMemory(
  customersRepository: CustomersRepository,
  data: Partial<Prisma.CustomerCreateInput> = {},
) {
  const customer: Customer = {
    id: data.id ?? randomUUID(),
    name: data.name ?? faker.person.fullName(),
    email: data.email ?? faker.internet.email(),
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  }

  customersRepository.register(customer)

  return customer
}
