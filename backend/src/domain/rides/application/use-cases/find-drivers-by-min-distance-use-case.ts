import { Driver } from '@prisma/client'
import { DriversRepository } from '../repositories/contracts/drivers-repository'

interface FindDriverByMinDistanceUseCaseRequest {
  distanceInMeters: number
}

interface FindDriverByMinDistanceUseCaseResponse {
  driverList: {
    id: number
    name: string
    description: string
    vehicle: string
    review: {
      rating: number
      comment: string
    }
    value: number
  }[]
}

interface DriverListMapProps {
  driverList: Driver[]
  distanceInMeters: number
}

export class FindDriverByMinDistanceUseCase {
  constructor(private driversRepository: DriversRepository) {}

  private calculateDriverEstimates({
    driverList,
    distanceInMeters,
  }: DriverListMapProps) {
    const driverListMapped = driverList.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating.toNumber(),
          comment: driver.comment,
        },
        value: driver.pricePerKilometer.toNumber() * (distanceInMeters / 1000),
      }
    })

    return driverListMapped
  }

  async execute({
    distanceInMeters,
  }: FindDriverByMinDistanceUseCaseRequest): Promise<FindDriverByMinDistanceUseCaseResponse> {
    const driverList =
      await this.driversRepository.findDriversByMinDistance(distanceInMeters)

    const driverListMapped = this.calculateDriverEstimates({
      driverList,
      distanceInMeters,
    })

    return {
      driverList: driverListMapped,
    }
  }
}
