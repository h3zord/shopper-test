import { Prisma, Customer } from '@prisma/client'

export interface CustomersRepository {
  registerCustomer(data: Prisma.CustomerCreateInput): Promise<Customer>
  findCustomerById(id: string): Promise<Customer | null>
  findCustomerByEmail(email: string): Promise<Customer | null>
}
