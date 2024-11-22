import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { GetCoordinates } from '../services/contracts/get-coordinates'
import { GetRideDetails } from '../services/contracts/get-ride-details'
import { CustomerNotFound } from './errors/customer-not-found'
import { InvalidData } from './errors/invalid-data'

interface RideEstimateUseCaseRequest {
  id: string
  originAddress: string
  destinationAddress: string
}

export class RideEstimateUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private driversRepository: DriversRepository,
    private getCoordinatesService: GetCoordinates,
    private getRideDetailsService: GetRideDetails,
  ) {}

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
      await this.getCoordinatesService.execute({
        originAddress,
        destinationAddress,
      })

    const { distanceInMeters, durationInSeconds, fullRouteResponse } =
      await this.getRideDetailsService.execute({
        originCoordinates,
        destinationCoordinates,
      })

    return {
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance: distanceInMeters,
      duration: durationInSeconds,
      routeResponse: fullRouteResponse,
      options: null,
    }
  }
}
