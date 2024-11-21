import { Prisma, Customer } from '@prisma/client'

export interface CustomersRepository {
  register(data: Prisma.CustomerCreateInput): Promise<Customer>
  findCustomerById(id: string): Promise<Customer | null>
}
