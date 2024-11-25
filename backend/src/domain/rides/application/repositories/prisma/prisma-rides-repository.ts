import { Prisma } from '@prisma/client'
import { RidesRepository } from '../contracts/rides-repository'
import { prisma } from '../../../../../prisma/prisma'

interface GetRidesProps {
  customerId: string
  driverId?: number
}

export class PrismaRidesRepository implements RidesRepository {
  async getRides({ customerId, driverId }: GetRidesProps) {
    const rideList = await prisma.ride.findMany({
      where: {
        customerId,
        ...(driverId && { driverId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      omit: {
        customerId: true,
        driverId: true,
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return rideList
  }

  async registerRide(data: Prisma.RideUncheckedCreateInput) {
    const newRide = await prisma.ride.create({
      data,
    })

    return newRide
  }
}
