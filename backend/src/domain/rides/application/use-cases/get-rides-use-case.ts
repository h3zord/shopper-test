import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { GetAddressService } from '../services/get-address-service'
import { CustomerNotFound } from './errors/customer-not-found'
import { DriverNotFound } from './errors/driver-not-found'
import {
  GetRidesResponse,
  RidesRepository,
} from '../repositories/contracts/rides-repository'

interface GetRideUseCaseResponse {
  customerId: string
  driverId?: number
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
          date: ride.date,
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

  async execute({ customerId, driverId }: GetRideUseCaseResponse) {
    const customer = await this.customersRepository.findCustomerById(customerId)

    if (!customer) {
      throw new CustomerNotFound()
    }

    if (driverId) {
      const driver = await this.driversRepository.findDriverById(driverId)

      if (!driver) {
        throw new DriverNotFound()
      }
    }

    const rideList = await this.ridesRepository.getRides({
      customerId,
      driverId,
    })

    const rideListMapped = await this.mapRidesWithAddressDetails(rideList)

    return {
      customer_id: customerId,
      rides: rideListMapped,
    }
  }
}
