import { Driver } from '@prisma/client'

export interface DriversRepository {
  findDriverById(id: string): Promise<Driver | null>
}