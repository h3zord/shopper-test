import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { RidesRepository } from '../repositories/contracts/rides-repository'
import { GetCoordinates } from '../services/contracts/get-coordinates'
import { CustomerNotFound } from './errors/customer-not-found'
import { DriverNotFound } from './errors/driver-not-found'
import { InvalidData } from './errors/invalid-data'
import { InvalidDistance } from './errors/invalid-distance'

interface RideConfirmUseCaseRequest {
  customerId: string
  driverId: number
  originAddress: string
  destinationAddress: string
  distanceInMeters: number
  durationInSeconds: number
  value: number
}

interface RideConfirmUseCaseResponse {}

export class RideConfirmUseCase {
  constructor(
    private getCoordinatesService: GetCoordinates,
    private customersRepository: CustomersRepository,
    private driversRepository: DriversRepository,
    private ridesRepository: RidesRepository,
  ) {}

  async execute({
    customerId,
    driverId,
    originAddress,
    destinationAddress,
    distanceInMeters,
    durationInSeconds,
    value,
  }: RideConfirmUseCaseRequest): Promise<RideConfirmUseCaseResponse> {
    if (originAddress === destinationAddress) {
      throw new InvalidData()
    }

    const customer = await this.customersRepository.findCustomerById(customerId)

    if (!customer) {
      throw new CustomerNotFound()
    }

    const driver = await this.driversRepository.findDriverById(driverId)

    if (!driver) {
      throw new DriverNotFound()
    }

    if (distanceInMeters < driver.minimumMeters) {
      throw new InvalidDistance()
    }

    const { originCoordinates, destinationCoordinates } =
      await this.getCoordinatesService.execute({
        originAddress,
        destinationAddress,
      })

    await this.ridesRepository.registerRide({
      customerId,
      driverId,
      originLatitude: originCoordinates.latitude,
      originLongitude: originCoordinates.longitude,
      destinationLatitude: destinationCoordinates.latitude,
      destinationLongitude: destinationCoordinates.longitude,
      distanceInMeters,
      durationInSeconds,
      value,
    })

    return {}
  }
}
