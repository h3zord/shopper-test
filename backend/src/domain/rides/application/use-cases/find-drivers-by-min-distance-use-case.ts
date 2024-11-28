import { Driver } from '@prisma/client'
import { DriversRepository } from '../repositories/contracts/drivers-repository'

interface FindDriverByMinDistanceUseCaseRequest {
  distanceInMeters: number
}

interface Review {
  rating: number
  comment: string
}

interface FindDriverByMinDistanceUseCaseResponse {
  driverList: {
    id: number
    name: string
    description: string
    vehicle: string
    review: Review
    value: number
  }[]
}

interface DriverListMapProps {
  driverList: Driver[]
  distanceInMeters: number
}

export class FindDriverByMinDistanceUseCase {
  constructor(private driversRepository: DriversRepository) {}

  private generateDriverEstimateList({
    driverList,
    distanceInMeters,
  }: DriverListMapProps) {
    const driverListMapped = driverList?.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating.toNumber(),
          comment: driver.comment,
        },
        value: Number(
          (
            driver.pricePerKilometer.toNumber() *
            (distanceInMeters / 1000)
          ).toFixed(2),
        ),
      }
    })

    return driverListMapped
  }

  async execute({
    distanceInMeters,
  }: FindDriverByMinDistanceUseCaseRequest): Promise<FindDriverByMinDistanceUseCaseResponse> {
    const driverList =
      await this.driversRepository.findDriversByMinDistance(distanceInMeters)

    const driverListMapped = this.generateDriverEstimateList({
      driverList,
      distanceInMeters,
    })

    return {
      driverList: driverListMapped,
    }
  }
}
