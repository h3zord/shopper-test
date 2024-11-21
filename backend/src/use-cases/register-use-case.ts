import { Customer } from '@prisma/client'
import { CustomersRepository } from './repositories/contracts/customers-repository'
import { CustomerAlreadyExists } from './errors/customer-already-exsists'

interface RegisterUseCaseRequest {
  name: string
  email: string
}

interface RegisterUseCaseResponse {
  customer: Customer
}

export class RegisterUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    name,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const customerAlreadyExists =
      await this.customersRepository.findCustomerByEmail(email)

    if (customerAlreadyExists) {
      throw new CustomerAlreadyExists()
    }

    const customer = await this.customersRepository.register({
      name,
      email,
    })

    return { customer }
  }
}
