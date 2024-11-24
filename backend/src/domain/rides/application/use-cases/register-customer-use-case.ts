import { Customer } from '@prisma/client'
import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { CustomerAlreadyExists } from './errors/customer-already-exsists'

interface RegisterCustomerUseCaseRequest {
  name: string
  email: string
}

interface RegisterCustomerUseCaseResponse {
  customer: Customer
}

export class RegisterCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    email,
  }: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {
    const customerAlreadyExists =
      await this.customersRepository.findCustomerByEmail(email)

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExists()
    }

    const customer = await this.customersRepository.registerCustomer({
      name,
      email,
    })

    return { customer }
  }
}
