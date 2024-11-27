import { Driver } from '@prisma/client'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { DriverNotFound } from './errors/driver-not-found'

interface GetAllDriversUseCaseResponse {
  driverList: Driver[]
}

export class GetAllDriversUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute(): Promise<GetAllDriversUseCaseResponse> {
    const driverList = await this.driversRepository.getAllDrivers()

    if (!driverList.length) {
      throw new DriverNotFound()
    }

    return {
      driverList,
    }
  }
}
