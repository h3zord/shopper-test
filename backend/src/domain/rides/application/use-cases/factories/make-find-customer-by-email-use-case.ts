import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { FindCustomerByEmailUseCase } from '../find-customer-by-email-use-case'

export function makeFindCustomerByEmailUseCase() {
  const customersRepository = new PrismaCustomerRepository()

  const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(
    customersRepository,
  )

  return findCustomerByEmailUseCase
}
