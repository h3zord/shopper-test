import { Customer, Prisma } from '@prisma/client'
import { CustomersRepository } from '../contracts/customers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async register(data: Prisma.CustomerCreateInput) {
    const customer: Customer = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      createdAt: new Date(),
    }

    this.items.push(customer)

    return customer
  }

  async findCustomerById(id: string) {
    const customer = this.items.find((customer) => customer.id === id)

    if (!customer) {
      return null
    }

    return customer
  }
}
