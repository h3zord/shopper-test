import { Driver } from '@prisma/client'
import { DriversRepository } from '../repositories/contracts/drivers-repository'
import { DriverNotFound } from './errors/driver-not-found'

interface FindDriverByIdUseCaseRequest {
  id: number
}

interface FindDriverByIdUseCaseResponse {
  driver: Driver
}

export class FindDriverByIdUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    id,
  }: FindDriverByIdUseCaseRequest): Promise<FindDriverByIdUseCaseResponse> {
    const driver = await this.driversRepository.findDriverById(id)

    if (!driver) {
      throw new DriverNotFound()
    }

    return {
      driver,
    }
  }
}
