import { PrismaDriversRepository } from '../../repositories/prisma/prisma-drivers-repository'
import { FindDriverByIdUseCase } from '../find-driver-by-id-use-case'

export function makeFindDriverByIdUseCase() {
  const driversRepository = new PrismaDriversRepository()

  const findDriverByIdUseCase = new FindDriverByIdUseCase(driversRepository)

  return findDriverByIdUseCase
}
