import { Driver } from '@prisma/client'
import { DriversRepository } from '../contracts/drivers-repository'
import { prisma } from '../../../../../infra/database/prisma'

export class PrismaDriversRepository implements DriversRepository {
  async findDriverById(id: number) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    })

    return driver
  }

  async findDriversByMinDistance(distanceInMeters: number): Promise<Driver[]> {
    const driverList = await prisma.driver.findMany({
      where: {
        minimumMeters: {
          lte: distanceInMeters,
        },
      },
      orderBy: {
        pricePerKilometer: 'asc',
      },
    })

    return driverList
  }

  async getAllDrivers() {
    const driverList = await prisma.driver.findMany()

    return driverList
  }
}
