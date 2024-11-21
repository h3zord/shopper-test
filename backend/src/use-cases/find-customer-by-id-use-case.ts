import { Customer } from '@prisma/client'
import { CustomersRepository } from './repositories/contracts/customers-repository'
import { CustomerNotFound } from './errors/customer-not-found'

interface FindCustomerByIdUseCaseRequest {
  id: string
}

interface FindCustomerByIdUseCaseResponse {
  customer: Customer
}

export class FindCustomerByIdUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    id,
  }: FindCustomerByIdUseCaseRequest): Promise<FindCustomerByIdUseCaseResponse> {
    const customer = await this.customersRepository.findCustomerById(id)

    if (!customer) {
      throw new CustomerNotFound()
    }

    return {
      customer,
    }
  }
}
