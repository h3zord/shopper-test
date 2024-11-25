import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCustomersRepository } from '../../../../tests/repositories/in-memory-customers-repository'
import { GetCoordinatesService } from '../services/get-coordinates-service'
import { InMemoryDriversRepository } from '../../../../tests/repositories/in-memory-drivers-repository'
import { InvalidData } from './errors/invalid-data'
import { CustomerNotFound } from './errors/customer-not-found'
import { RideConfirmUseCase } from './ride-confirm-use-case'
import { InMemoryRidesRepository } from '../../../../tests/repositories/in-memory-rides-repository'
import { DriverNotFound } from './errors/driver-not-found'
import { InvalidDistance } from './errors/invalid-distance'
import { createCustomerInMemory } from '../../../../tests/factories/create-customer-in-memory'
import { createDriverInMemory } from '../../../../tests/factories/create-driver-in-memory'

describe('Ride confirm unit test', () => {
  let customersRepository: InMemoryCustomersRepository
  let driversRepository: InMemoryDriversRepository
  let ridesRepository: InMemoryRidesRepository
  let getCoordinatesService: GetCoordinatesService
  let customerId: string
  let driverId: number

  let sut: RideConfirmUseCase

  const originAddress = 'Rua das Flores, 123, São Paulo, Brasil'
  const destinationAddress = 'Avenida Paulista, 1000, São Paulo, Brasil'

  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    driversRepository = new InMemoryDriversRepository()
    ridesRepository = new InMemoryRidesRepository(driversRepository)
    getCoordinatesService = new GetCoordinatesService()

    vi.spyOn(getCoordinatesService, 'execute').mockResolvedValue({
      originCoordinates: { latitude: 37.7749, longitude: -122.4194 },
      destinationCoordinates: { latitude: 34.0522, longitude: -118.2437 },
    })

    sut = new RideConfirmUseCase(
      getCoordinatesService,
      customersRepository,
      driversRepository,
      ridesRepository,
    )

    const customer = createCustomerInMemory(customersRepository, {
      id: '1',
    })

    customerId = customer.id

    const driver = createDriverInMemory(driversRepository, {
      id: 1,
      minimumMeters: 10000,
    })

    driverId = driver.id
  })

  it('should not be able to confirm ride when origin adress is equal destination adress', async () => {
    await expect(() =>
      sut.execute({
        customerId,
        driverId,
        originAddress,
        destinationAddress: originAddress,
        distanceInMeters: 10000,
        durationInSeconds: 5000,
        value: 200,
      }),
    ).rejects.toBeInstanceOf(InvalidData)
  })

  it('should not be able to confirm ride when customer id is invalid', async () => {
    await expect(() =>
      sut.execute({
        customerId: '2',
        driverId,
        originAddress,
        destinationAddress,
        distanceInMeters: 10000,
        durationInSeconds: 5000,
        value: 200,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFound)
  })

  it('should not be able to confirm ride when driver id is invalid', async () => {
    await expect(() =>
      sut.execute({
        customerId,
        driverId: 2,
        originAddress,
        destinationAddress,
        distanceInMeters: 10000,
        durationInSeconds: 5000,
        value: 200,
      }),
    ).rejects.toBeInstanceOf(DriverNotFound)
  })

  it('Should not be able to confirm a ride when the distance is less than the drivers minimum distance', async () => {
    await expect(() =>
      sut.execute({
        customerId,
        driverId,
        originAddress,
        destinationAddress,
        distanceInMeters: 9999,
        durationInSeconds: 5000,
        value: 200,
      }),
    ).rejects.toBeInstanceOf(InvalidDistance)
  })
})
