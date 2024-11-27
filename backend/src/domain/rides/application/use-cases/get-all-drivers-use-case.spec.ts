import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDriversRepository } from '../../../../tests/repositories/in-memory-drivers-repository'
import { DriverNotFound } from './errors/driver-not-found'
import { createDriverInMemory } from '../../../../tests/factories/create-driver-in-memory'
import { GetAllDriversUseCase } from './get-all-drivers-use-case'

describe('Get all drivers unit test', () => {
  let driversRepository: InMemoryDriversRepository
  let sut: GetAllDriversUseCase

  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    sut = new GetAllDriversUseCase(driversRepository)
  })

  it('should be able to return a driver list', async () => {
    createDriverInMemory(driversRepository)
    createDriverInMemory(driversRepository)

    const { driverList } = await sut.execute()

    expect(driverList).toHaveLength(2)
  })

  it('should not be able to return a driver list when there are no drivers registered in the database', async () => {
    await expect(() => sut.execute()).rejects.toBeInstanceOf(DriverNotFound)
  })
})
