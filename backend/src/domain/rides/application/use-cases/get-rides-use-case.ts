import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { GetAddressService } from '../services/get-address-service'
import { CustomerNotFound } from './errors/customer-not-found'
import { InvalidDriver } from './errors/invalid-driver'
import { RidesNotFound } from './errors/rides-not-found'
import {
  GetRidesResponse,
  RidesRepository,
} from '../repositories/contracts/rides-repository'

interface GetRideUseCaseRequest {
  customerId: string
  driverId?: number
}

interface Driver {
  id: number
  name: string
}

interface Ride {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driver: Driver
  value: number
}

interface GetRideUseCaseResponse {
  customer_id: string
  rides: Ride[]
}

export class GetRidesUseCase {
  constructor(
    private getAddressService: GetAddressService,
    private customersRepository: CustomersRepository,
    private driversRepository: DriversRepository,
    private ridesRepository: RidesRepository,
  ) {}

  private async mapRidesWithAddressDetails(rideList: GetRidesResponse[]) {
    const rideListMapped = await Promise.all(
      rideList.map(async (ride) => {
        const { originAddress, destinationAddress } =
          await this.getAddressService.execute({
            originCoordinates: {
              latitude: Number(ride.originLatitude),
              longitude: Number(ride.originLongitude),
            },
            destinationCoordinates: {
              latitude: Number(ride.destinationLatitude),
              longitude: Number(ride.destinationLongitude),
            },
          })

        return {
          id: ride.id,
          date: ride.createdAt,
          origin: originAddress,
          destination: destinationAddress,
          distance: ride.distanceInMeters,
          duration: `${ride.durationInSeconds}s`,
          driver: {
            id: ride.driver.id,
            name: ride.driver.name,
          },
          value: Number(ride.value),
        }
      }),
    )

    return rideListMapped
  }

  async execute({
    customerId,
    driverId,
  }: GetRideUseCaseRequest): Promise<GetRideUseCaseResponse> {
    const customer = await this.customersRepository.findCustomerById(customerId)

    if (!customer) {
      throw new CustomerNotFound()
    }

    if (driverId) {
      const driver = await this.driversRepository.findDriverById(driverId)

      if (!driver) {
        throw new InvalidDriver()
      }
    }

    const rideList = await this.ridesRepository.getRides({
      customerId,
      driverId,
    })

    if (!rideList.length) {
      throw new RidesNotFound()
    }

    const rideListMapped = await this.mapRidesWithAddressDetails(rideList)

    return {
      customer_id: customerId,
      rides: rideListMapped,
    }
  }
}
