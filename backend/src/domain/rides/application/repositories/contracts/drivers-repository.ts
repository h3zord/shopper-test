import { Driver } from '@prisma/client'

export interface DriversRepository {
  findDriverById(id: number): Promise<Driver | null>
  findDriversByMinDistance(distanceInMeters: number): Promise<Driver[]>
}
