import { Driver } from '@prisma/client'
import { DriversRepository } from '../contracts/drivers-repository'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async findDriverById(id: string) {
    const driver = this.items.find((driver) => driver.id === id)

    if (!driver) {
      return null
    }

    return driver
  }

  async findDriversByMinDistance(distanceInMeters: number) {
    const unsortedDriverList = this.items.filter((driver) => {
      const distanceInKilometers = distanceInMeters / 1000

      return distanceInKilometers >= driver.minimumKilometers
    })

    const sortedDriverListByPrice = unsortedDriverList.sort(
      (a, b) => a.pricePerKilometer.toNumber() - b.pricePerKilometer.toNumber(),
    )

    return sortedDriverListByPrice
  }
}
