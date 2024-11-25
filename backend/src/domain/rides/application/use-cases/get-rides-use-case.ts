import { CustomersRepository } from '../repositories/contracts/customers-repository'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { RidesRepository } from '../repositories/contracts/rides-repository'
import { CustomerNotFound } from './errors/customer-not-found'
import { DriverNotFound } from './errors/driver-not-found'

interface GetRideUseCaseResponse {
  customerId: string
  driverId?: number
}

export class GetRidesUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private driversRepository: DriversRepository,
    private ridesRepository: RidesRepository,
  ) {}

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
  }
}
