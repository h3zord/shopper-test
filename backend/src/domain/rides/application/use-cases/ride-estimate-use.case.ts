import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { GetCoordinates } from '../services/contracts/get-coordinates'
import { GetRideDetails } from '../services/contracts/get-ride-details'
import { CustomerNotFound } from './errors/customer-not-found'
import { InvalidData } from './errors/invalid-data'
import { FindDriverByMinDistanceUseCase } from './find-drivers-by-min-distance-use-case'

interface RideEstimateUseCaseRequest {
  customerId: string
  originAddress: string
  destinationAddress: string
}

export class RideEstimateUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private getCoordinatesService: GetCoordinates,
    private getRideDetailsService: GetRideDetails,
    private findDriversByMinDistanceUseCase: FindDriverByMinDistanceUseCase,
  ) {}

  async execute({
    customerId,
    originAddress,
    destinationAddress,
  }: RideEstimateUseCaseRequest) {
    if (originAddress === destinationAddress) {
      throw new InvalidData()
    }

    const customer = await this.customersRepository.findCustomerById(customerId)

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

    const { driverList } = await this.findDriversByMinDistanceUseCase.execute({
      distanceInMeters,
    })

    return {
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance: distanceInMeters,
      duration: durationInSeconds,
      routeResponse: fullRouteResponse,
      options: driverList,
    }
  }
}
