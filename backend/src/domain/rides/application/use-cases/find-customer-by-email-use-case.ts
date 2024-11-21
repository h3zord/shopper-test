import { Customer } from '@prisma/client'
import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { CustomerNotFound } from './errors/customer-not-found'

interface FindCustomerByEmailUseCaseRequest {
  email: string
}

interface FindCustomerByEmailUseCaseResponse {
  customer: Customer
}

export class FindCustomerByEmailUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    email,
  }: FindCustomerByEmailUseCaseRequest): Promise<FindCustomerByEmailUseCaseResponse> {
    const customer = await this.customersRepository.findCustomerByEmail(email)

    if (!customer) {
      throw new CustomerNotFound()
    }

    return {
      customer,
    }
  }
}
