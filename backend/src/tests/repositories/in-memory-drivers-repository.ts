import { Driver } from '@prisma/client'
import { DriversRepository } from '../../domain/rides/application/repositories/contracts/drivers-repository'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async findDriverById(id: number) {
    const driver = this.items.find((driver) => driver.id === id)

    if (!driver) {
      return null
    }

    return driver
  }

  async findDriversByMinDistance(distanceInMeters: number) {
    const unsortedDriverList = this.items.filter((driver) => {
      return distanceInMeters >= driver.minimumMeters
    })

    const sortedDriverListByPrice = unsortedDriverList.sort(
      (a, b) => a.pricePerKilometer.toNumber() - b.pricePerKilometer.toNumber(),
    )

    return sortedDriverListByPrice
  }

  async getAllDrivers() {
    return this.items
  }
}
