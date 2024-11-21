import { Customer } from '@prisma/client'
import { CustomerRepository } from './repositories/contracts/customer-repository'
import { CustomerNotFound } from './errors/customer-not-found'

interface FindCustomerByIdUseCaseRequest {
  id: string
}

interface FindCustomerByIdUseCaseResponse {
  customer: Customer
}

export class FindCustomerByIdUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    id,
  }: FindCustomerByIdUseCaseRequest): Promise<FindCustomerByIdUseCaseResponse> {
    const customer = await this.customerRepository.findCustomerById(id)

    if (!customer) {
      throw new CustomerNotFound()
    }

    return {
      customer,
    }
  }
}
