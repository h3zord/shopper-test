import { PrismaCustomerRepository } from '../../repositories/prisma/prisma-customers-repository'
import { GetCoordinatesService } from '../../services/get-coordinates-service'
import { GetRideDetailsService } from '../../services/get-ride-details-service'
import { RideEstimateUseCase } from '../ride-estimate-use.case'
import { makeFindDriverByMinDistanceUseCase } from './make-find-drivers-by-min-distance-use-case'

export function makeRideEstimateUseCase() {
  const getCoordinatesService = new GetCoordinatesService()
  const getRideDetailsService = new GetRideDetailsService()
  const findDriversByMinDistanceUseCase = makeFindDriverByMinDistanceUseCase()
  const customersRepository = new PrismaCustomerRepository()

  const rideEstimateUseCase = new RideEstimateUseCase(
    getCoordinatesService,
    getRideDetailsService,
    findDriversByMinDistanceUseCase,
    customersRepository,
  )

  return rideEstimateUseCase
}
