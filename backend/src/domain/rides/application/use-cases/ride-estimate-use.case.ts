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
    private getCoordinatesService: GetCoordinates,
    private getRideDetailsService: GetRideDetails,
    private findDriversByMinDistanceUseCase: FindDriverByMinDistanceUseCase,
    private customersRepository: CustomersRepository,
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

    const { distanceInMeters, durationInSeconds, fullRouteApiResponse } =
      await this.getRideDetailsService.execute({
        originCoordinates,
        destinationCoordinates,
      })

    const { driverList } = await this.findDriversByMinDistanceUseCase.execute({
      distanceInMeters,
    })

    return {
      origin: {
        latitude: originCoordinates.latitude,
        longitude: originCoordinates.longitude,
      },
      destination: {
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
      },
      distance: distanceInMeters,
      duration: durationInSeconds,
      options: driverList,
      routeResponse: fullRouteApiResponse,
    }
  }
}
