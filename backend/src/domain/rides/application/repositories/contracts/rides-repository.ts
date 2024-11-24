import { Prisma, Ride } from '@prisma/client'

export interface RidesRepository {
  registerRide(data: Prisma.RideUncheckedCreateInput): Promise<Ride>
}
