import { PrismaDriversRepository } from '../../repositories/prisma/prisma-drivers-repository'
import { FindDriverByMinDistanceUseCase } from '../find-drivers-by-min-distance-use-case'

export function makeFindDriverByMinDistanceUseCase() {
  const driversRepository = new PrismaDriversRepository()

  const findDriverByMinDistanceUseCase = new FindDriverByMinDistanceUseCase(
    driversRepository,
  )

  return findDriverByMinDistanceUseCase
}
