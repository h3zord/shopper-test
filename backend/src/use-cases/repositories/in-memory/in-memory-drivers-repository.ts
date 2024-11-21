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
}
