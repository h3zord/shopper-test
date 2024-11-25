import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { PrismaDriversRepository } from '../../repositories/prisma/prisma-drivers-repository'
import { PrismaRidesRepository } from '../../repositories/prisma/prisma-rides-repository'
import { GetCoordinatesService } from '../../services/get-coordinates-service'
import { RideConfirmUseCase } from '../ride-confirm-use-case'

export function makeRideConfirmUseCase() {
  const getCoordinatesService = new GetCoordinatesService()
  const customersRepository = new PrismaCustomerRepository()
  const driversRepository = new PrismaDriversRepository()
  const ridesRepository = new PrismaRidesRepository()

  const rideConfirmUseCase = new RideConfirmUseCase(
    getCoordinatesService,
    customersRepository,
    driversRepository,
    ridesRepository,
  )

  return rideConfirmUseCase
}
