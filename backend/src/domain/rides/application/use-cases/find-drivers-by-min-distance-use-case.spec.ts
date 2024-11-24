import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { createDriverInMemory } from '../../../../utils/tests/create-driver-in-memory'
import { FindDriverByMinDistanceUseCase } from './find-drivers-by-min-distance-use-case'

describe('Find driver by minimum distance unit test', () => {
  let driversRepository: InMemoryDriversRepository
  let sut: FindDriverByMinDistanceUseCase

  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    sut = new FindDriverByMinDistanceUseCase(driversRepository)

    createDriverInMemory(driversRepository, {
      pricePerKilometer: 10,
      minimumMeters: 10000,
    })

    createDriverInMemory(driversRepository, {
      pricePerKilometer: 1,
      minimumMeters: 1000,
    })

    createDriverInMemory(driversRepository, {
      pricePerKilometer: 5,
      minimumMeters: 5000,
    })
  })

  it('should be able to return the correct driver list according to the minimum distance', async () => {
    const { driverList: firstResponse } = await sut.execute({
      distanceInMeters: 1000,
    })

    const { driverList: secondResponse } = await sut.execute({
      distanceInMeters: 5000,
    })

    const { driverList: thirdResponse } = await sut.execute({
      distanceInMeters: 10000,
    })

    expect(firstResponse).toHaveLength(1)
    expect(secondResponse).toHaveLength(2)
    expect(thirdResponse).toHaveLength(3)
  })

  it('should be able to return the correct driver list sorted by value in ascending order', async () => {
    const { driverList: sortedDriverList } = await sut.execute({
      distanceInMeters: 10000,
    })

    for (let i = 0; i < sortedDriverList.length - 1; i++) {
      expect(sortedDriverList[i].value).toBeLessThanOrEqual(
        sortedDriverList[i + 1].value,
      )
    }
  })
})
