import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { getCoordinatesService } from '../services/get-coordinates-service'
import { CustomerNotFound } from './errors/customer-not-found'
import { InvalidData } from './errors/invalid-data'

interface RideEstimateUseCaseRequest {
  id: string
  originAddress: string
  destinationAddress: string
}

export class RideEstimateUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    id,
    originAddress,
    destinationAddress,
  }: RideEstimateUseCaseRequest) {
    if (originAddress === destinationAddress) {
      throw new InvalidData()
    }

    const customer = await this.customersRepository.findCustomerById(id)

    if (!customer) {
      throw new CustomerNotFound()
    }

    const { originCoordinates, destinationCoordinates } =
      await getCoordinatesService({
        originAddress,
        destinationAddress,
      })
  }
}
