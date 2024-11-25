import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { PrismaDriversRepository } from '../../repositories/prisma/prisma-drivers-repository'
import { PrismaRidesRepository } from '../../repositories/prisma/prisma-rides-repository'
import { GetAddressService } from '../../services/get-address-service'
import { GetRidesUseCase } from '../get-rides-use-case'

export function makeGetRidesUseCase() {
  const getAddressService = new GetAddressService()
  const customersRepository = new PrismaCustomerRepository()
  const driversRepository = new PrismaDriversRepository()
  const ridesRepository = new PrismaRidesRepository()

  const getRidesUseCase = new GetRidesUseCase(
    getAddressService,
    customersRepository,
    driversRepository,
    ridesRepository,
  )

  return getRidesUseCase
}
