import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { RegisterCustomerUseCase } from '../register-customer-use-case'

export function makeRegisterCustomerUseCase() {
  const customersRepository = new PrismaCustomerRepository()

  const registerCustomerUseCase = new RegisterCustomerUseCase(
    customersRepository,
  )

  return registerCustomerUseCase
}
