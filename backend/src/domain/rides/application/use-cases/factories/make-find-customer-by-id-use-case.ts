import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { FindCustomerByIdUseCase } from '../find-customer-by-id-use-case'

export function makeFindCustomerByIdUseCase() {
  const customersRepository = new PrismaCustomerRepository()

  const findCustomerByIdUseCase = new FindCustomerByIdUseCase(
    customersRepository,
  )

  return findCustomerByIdUseCase
}
