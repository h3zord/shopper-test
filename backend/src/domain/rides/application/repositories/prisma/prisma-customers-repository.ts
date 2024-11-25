import { Prisma } from '@prisma/client'
import { CustomersRepository } from '../contracts/customers-repository'
import { prisma } from '../../../../../lib/prisma'

export class PrismaCustomerRepository implements CustomersRepository {
  async registerCustomer(data: Prisma.CustomerCreateInput) {
    const newCustomer = await prisma.customer.create({
      data,
    })

    return newCustomer
  }

  async findCustomerById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    return customer
  }

  async findCustomerByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    return customer
  }
}
