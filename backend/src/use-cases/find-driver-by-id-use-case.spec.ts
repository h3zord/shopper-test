import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDriversRepository } from './repositories/in-memory/in-memory-drivers-repository'
import { DriverNotFound } from './errors/driver-not-found'
import { FindDriverByIdUseCase } from './find-driver-by-id-use-case'
import { createDriverInMemory } from '../utils/tests/create-driver-in-memory'

describe('Find driver by id unit test', () => {
  let driversRepository: InMemoryDriversRepository
  let sut: FindDriverByIdUseCase

  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    sut = new FindDriverByIdUseCase(driversRepository)
  })

  it('should be able to return a driver', async () => {
    const { id } = createDriverInMemory(driversRepository)

    const { driver } = await sut.execute({ id })

    expect(driver.id).toEqual(id)
  })

  it('should not be able to return a driver with invalid id', async () => {
    createDriverInMemory(driversRepository, { id: '1' })

    await expect(() => sut.execute({ id: '2' })).rejects.toBeInstanceOf(
      DriverNotFound,
    )
  })
})
