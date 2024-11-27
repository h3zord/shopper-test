import { PrismaDriversRepository } from '../../repositories/prisma/prisma-drivers-repository'
import { GetAllDriversUseCase } from '../get-all-drivers-use-case'

export function makeGetAllDriversUseCase() {
  const driversRepository = new PrismaDriversRepository()

  const getAllDriversUseCase = new GetAllDriversUseCase(driversRepository)

  return getAllDriversUseCase
}
